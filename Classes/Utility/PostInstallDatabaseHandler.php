<?php
namespace Staempfli\TemplateBootstrap\Utility;
/***************************************************************
 *  Copyright notice
 *
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Package\PackageManager;

class PostInstallDatabaseHandler {

    /**
     * Creates users based on given array.
     *
     * @param $packageKey
     * @param $configuration
     * @param $configurationController
     */
    public function createCLIUsers($packageKey, $configuration, $configurationController) {

        // Get cli user names that supposedly need to be created
        $userNames = GeneralUtility::trimExplode(',',$configuration['createCLIUsers']['value']);
        foreach($userNames as $userName) {

            $cliUserName = '_cli_'. $userName;
            $cliUserNameQuoted = $GLOBALS['TYPO3_DB']->fullQuoteStr($cliUserName, 'be_users');

            // Check, if user exists already
            $userExistsResult = $GLOBALS['TYPO3_DB']->exec_SELECTquery('*', 'be_users', 'username='. $cliUserNameQuoted);
            if ($GLOBALS['TYPO3_DB']->sql_error()) {

                PostInstallInfoLogger::log('Failed to check whether BE user "'
                    . $cliUserName .'" exists. Therefore cancelled. Error: '
                    . $GLOBALS['TYPO3_DB']->sql_error(),
                    PostInstallInfoLogger::MESSAGE_TYPE_SYSTEM_ERROR, 50);

                continue;
            }

            // User exists - (re-) activate, in case it has been deleted previously
            if ($GLOBALS['TYPO3_DB']->sql_num_rows($userExistsResult) > 0) {
                $existingUserRow = $GLOBALS['TYPO3_DB']->sql_fetch_assoc($userExistsResult);
                if ($existingUserRow['deleted']) {
                    $GLOBALS['TYPO3_DB']->exec_UPDATEquery('be_users', 'uid='. $existingUserRow['uid'], Array('deleted' => 0));
                    $updatedError = $GLOBALS['TYPO3_DB']->sql_error();
                    if ($updatedError) {
                        PostInstallInfoLogger::log('Failed to reactivate (un-delete) BE user "'.
                            $cliUserName .'". Error: '. $GLOBALS['TYPO3_DB']->sql_error(),
                            PostInstallInfoLogger::MESSAGE_TYPE_SYSTEM_ERROR, 50
                        );
                    } else {
                        PostInstallInfoLogger::log('Reactivated (un-deleted) BE user "'. $cliUserName .'"'
                            . $GLOBALS['TYPO3_DB']->sql_error(),
                            PostInstallInfoLogger::MESSAGE_TYPE_OK, 50);
                    }
                }

                // Skip to next user(name) as this one was handled by simply reactivating it.
                continue;
            }

            // Create user
            $saltedPassword = md5($this->getRandomPassword());
            if (PackageManager::isPackageActive('saltedpasswords')) {
                $saltingInstance = \TYPO3\CMS\Saltedpasswords\Salt\SaltFactory::getSaltingInstance();
                $saltedPassword = $saltingInstance->getHashedPassword($saltedPassword);
            }
            $createdSqlResult = $GLOBALS['TYPO3_DB']->exec_INSERTquery(
                'be_users',
                Array(
                    'crdate' => time(),
                    'tstamp' => time(),
                    'cruser_id' => $GLOBALS['BE_USER']->user['uid'],
                    'username' => $cliUserName, // do not use quoted version here
                    'password' => $saltedPassword,
                )
            );

            // Failed to create user
            if ($GLOBALS['TYPO3_DB']->sql_error()) {
                PostInstallInfoLogger::log('Failed to create BE user "'. $cliUserName .'". Error: '. $GLOBALS['TYPO3_DB']->sql_error(), PostInstallInfoLogger::MESSAGE_TYPE_SYSTEM_ERROR, 50);

            // User successfully created
            } else {
                PostInstallInfoLogger::log('Created BE user "'. $cliUserName .'"', PostInstallInfoLogger::MESSAGE_TYPE_OK, 50);

            }


        } // foreach user that needs to be created


    } // function createCLIUsers


    /**
     * Creates random password for cli users. Note that this password is not needed by anyone!
     * @return string
     */
    public function getRandomPassword() {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?=)(/&%ç*£àé[]}{-*/+.;:";
        $randomPassword = substr(str_shuffle($chars),0,5) . substr(str_shuffle($chars),0,5) . substr(str_shuffle($chars),0,5) . substr(str_shuffle($chars),0,5);
        $randomPassword .= microtime();
        return $randomPassword;
    }



} // class PostInstallFileHandler

?>