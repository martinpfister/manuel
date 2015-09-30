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
use TYPO3\CMS\Backend\Toolbar\Enumeration\InformationStatus;
use TYPO3\CMS\Backend\Utility\BackendUtility;


class PostInstallInfoLogger {


    // Message 'error' types according to the sys_log table definition
    const MESSAGE_TYPE_INFO = 0;
    const MESSAGE_TYPE_USER_ERROR = 1;
    const MESSAGE_TYPE_SYSTEM_ERROR = 2;
    const MESSAGE_TYPE_SECURITY_NOTICE = 3;
    const MESSAGE_TYPE_OK = 42; // this is not a valid value for the sys_log table, we'll write a '0',
                                // but keep the original type in the 'data' field for later use (i.e. styling)!


    // This array maps the 'error' types (above) to the T3 core information statuses.
    static $MESSAGE_TYPE_TO_INFOSTATUS_MAP = Array(
        self::MESSAGE_TYPE_INFO => InformationStatus::STATUS_INFO,
        self::MESSAGE_TYPE_USER_ERROR => InformationStatus::STATUS_ERROR,
        self::MESSAGE_TYPE_SYSTEM_ERROR => InformationStatus::STATUS_ERROR,
        self::MESSAGE_TYPE_SECURITY_NOTICE => InformationStatus::STATUS_WARNING,
        self::MESSAGE_TYPE_OK => InformationStatus::STATUS_OK
    );


    // This prefix is added to the beginning of every
    // log entry in order to be able to filter 'em out
    // for displaying them to the BE user.
    const MESSAGE_PREFIX = '[templatebootstrap (###packageKey###) install]: ';


    /**
     * Gets package key of this 'templatebootstrap' package
     * @return mixed
     */
    static function getPackageKey() {
        return $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'];
    }


    /**
     * Generates prefix for any logged messages. Contains package key.
     * @return mixed
     */
    public static function getMessagePrefix() {
        $prefix = str_replace('###packageKey###', self::getPackageKey(), self::MESSAGE_PREFIX);
        return $prefix;
    }


    /**
     * Creates a sys_log entry as the writing API is not yet completely finished.
     * See https://docs.typo3.org/typo3cms/CoreApiReference/ApiOverview/SystemLog/Index.html
     * Also bypasses any settings in install tool.
     *
     * @param $message Log message
     * @param $messageType According to constants in this class (MESSAGE_TYPE_*)
     * @param $actionNumber Optional action number. Used to disinguish message 'origins' later on.
     */
    public static function log($message, $messageType=0, $actionNumber=0) {
        global $BE_USER;

        $data = Array('displayMessageType' => $messageType);
        $errorNumber = $messageType;

        if ($errorNumber > 10) { $errorNumber = 0;}

        $BE_USER->writelog(
            4,      // type
            $actionNumber,      // action
            $errorNumber,
            0,      // details no
            self::getMessagePrefix() . $message,
            $data // data array
        );

    } // log



    /**
     * Gets messages for the 'SystemInformationToolbarItem' signal slot specifically.
     * @param $packageKey
     * @param $configuration
     * @return array|null
     */
    public function getMessages($packageKey, $configuration) {
        global $BE_USER;

        // Get last backend log access timestamp as this lets us
        // filter out any old(er) messages.
        if (isset($BE_USER->uc['systeminformation'])) {
            $systemInformationUc = json_decode($BE_USER->uc['systeminformation'], TRUE);
            if (isset($systemInformationUc['system_BelogLog']['lastAccess'])) {
                $lastSystemLogAccessTimestamp = $systemInformationUc['system_BelogLog']['lastAccess'];
            }
        }
        // Fall back to the last 24 hours.
        if (!isset($lastSystemLogAccessTimestamp)) {
            $lastSystemLogAccessTimestamp = time()-(3600)*24;
        }

        // We can't use the extbase repository here as the required TypoScript may not be parsed yet
        $messagesResult = $GLOBALS['TYPO3_DB']->exec_SELECTquery(
            '*',
            'sys_log',
            'tstamp >= ' . $lastSystemLogAccessTimestamp . ' AND userid='. $BE_USER->user['uid'] .' AND details LIKE "'. self::getMessagePrefix() .'%"',
            '',
            'tstamp DESC');

        // Error getting messages
        if($GLOBALS['TYPO3_DB']->sql_error()){
            return NULL;

        // No messages found
        } elseif ($GLOBALS['TYPO3_DB']->sql_num_rows($messagesResult) === 0) {
            return NULL;

        // Render messages
        } else {

            $alreadyCoveredMessageTypes = Array();
            $highestFoundSeverety = self::MESSAGE_TYPE_INFO;
            $finalMessages = Array();

            while($message = $GLOBALS['TYPO3_DB']->sql_fetch_assoc($messagesResult)) {
                // Skip this message, if the 'message type' a.k.a. 'action' has already been
                // covered. P.e. only show latest entry about re-writing robots.txt
                if (in_array($message['action'], $alreadyCoveredMessageTypes)) { continue; }
                $alreadyCoveredMessageTypes[] = $message['action'];

                // Track down highest severety over all found messages
                if ($highestFoundSeverety < $message['error']) {
                    $highestFoundSeverety = $message['error'];
                }

                // Get 'error' number as message type,
                // but override with registered message type in 'log_data' field.
                $displayMessageType = $message['error'];
                if ($message['log_data'] !== NULL) {
                    $logData = @unserialize($message['log_data']);
                    if (is_array($logData) && isset($logData['displayMessageType'])) {
                        $displayMessageType = $logData['displayMessageType'];
                    }
                }

                // Get message text & render HTML
                $messageDetails = str_replace(self::getMessagePrefix(), '', $message['details']);
                $finalMessages[] = '<li class="text-'. self::$MESSAGE_TYPE_TO_INFOSTATUS_MAP[$displayMessageType] .' templatebootstrap-installlog-entry">'. $messageDetails .'</li>';
            }


            // Render whole message block
            $allMessagesString =
                '<span class="templatebootstrap-installlog-title">Extension manager messages for '. self::getPackageKey() .':</span>'
                . '<ul class="templatebootstrap-installlog">' . implode('', $finalMessages) . '</ul>'
                . '<a href="'. BackendUtility::getModuleUrl('system_BelogLog') .'"><span class="text-muted">(Dismiss this by visiting the backend log - click this message.)</span></a>';


            // Return messages as one.
            // Note: This return structure may not be changed! This is the format as requested
            // by the API. Also, adding any subarrays will not work!
            return array(
                array(
                    'module' => 'system_BelogLog', // Tells the message where to go on click
                    'count' => count($finalMessages),
                    'status' => self::$MESSAGE_TYPE_TO_INFOSTATUS_MAP[$highestFoundSeverety],
                    'text' => $allMessagesString
                )
            );

        } // if db query successfully executed with > 0 results

    } //getMessages

} // class PostInstallFileHandler

?>