<?php
namespace Staempfli\Templatebootstrap\Utility;
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

use TYPO3\CMS\Core\Error\Http\PageNotFoundException;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\HttpUtility;
use TYPO3\CMS\Documentation\Slots\ExtensionManager;
use TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController;


class PageNotFoundHandler {

    /**
     * @param array $params
     * @param TypoScriptFrontendController $ref
     * @throws PageNotFoundException
     * @return void
     */
    public function pageNotFound(array $params, TypoScriptFrontendController $ref = NULL) {

        $packageKey = $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'];
        $extensionConfiguration = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$packageKey]);
        $host = GeneralUtility::getHostname();
        $currentURLParsed = parse_url(GeneralUtility::getIndpEnv('TYPO3_REQUEST_URL'));
        $maxNumberOfRedirects = 5;

        // Get language parameter
        $languageParameter = 'L';
        if (isset($extensionConfiguration['languageParameter'])) {
            $languageParameter = $extensionConfiguration['languageParameter'];
        }

        // Get 404 page uid
        $error404Uid = 0;
        if (isset($extensionConfiguration['error404Uid'])) {
            $error404Uids = GeneralUtility::trimExplode(',', $extensionConfiguration['error404Uid']);
            if (count($error404Uids) === 1 && substr_count($error404Uids[0], ':') === 0) {
                $error404Uid = $error404Uids[0];

                // Parse 404 uids on a per-host basis
            } else {
                // Iterate through all defined hosts/error page uids
                foreach($error404Uids as $errorPageHostAndUid) {
                    $errorPageHostAndUid = GeneralUtility::trimExplode(':', $errorPageHostAndUid);
                    // Check correct definition format ([host name or part thereof]:[errorpage uid],...)
                    if (count($errorPageHostAndUid) !== 2) {
                        continue;
                        // Host pattern found in current error page definition.
                    } elseif(substr_count($host, strtolower($errorPageHostAndUid[0])) > 0) {
                        $error404Uid = $errorPageHostAndUid[1];
                        break;
                    }
                }
            } // iterate through multiple 404 page definitions
        } // if 404 page(s) has been set.

        // Get 401 page uid
        $error401Uid = 0;
        if (isset($extensionConfiguration['error401Uid'])) {

            $error401Uids = GeneralUtility::trimExplode(',', $extensionConfiguration['error401Uid']);
            if (count($error401Uids) === 1 && substr_count($error401Uids[0], ':') === 0) {
                $error401Uid = $error401Uids[0];

                // Parse 401 uids on a per-host basis
            } else {
                // Iterate through all defined hosts/error page uids
                foreach($error401Uids as $errorPageHostAndUid) {
                    $errorPageHostAndUid = GeneralUtility::trimExplode(':', $errorPageHostAndUid);
                    // Check correct definition format ([host name or part thereof]:[errorpage uid],...)
                    if (count($errorPageHostAndUid) !== 2) {
                        continue;
                        // Host pattern found in current error page definition.
                    } elseif(substr_count($host, strtolower($errorPageHostAndUid[0])) > 0) {
                        $error401Uid = $errorPageHostAndUid[1];
                        break;
                    }
                }
            } // iterate through multiple 404 page definitions
        }  // if 401 page(s) has been set.


        // Get sys language uid
        $sysLanguageUid = 0;
        // ... via GET parameter
        if (GeneralUtility::_GET($languageParameter)) {
            $sysLanguageUid = GeneralUtility::_GET($languageParameter);

            // ... via realurl configuration
        } elseif (ExtensionManagementUtility::isLoaded('realurl')) {
            $realUrlConf = $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'];
            if (isset($realUrlConf[$host])) {
                $realUrlDomainConf = $realUrlConf[$host];
            } else {
                $realUrlDomainConf = $realUrlConf['_DEFAULT'];
            }

            // Iterate through preVars to find language preVar position in url and value
            foreach ($realUrlDomainConf['preVars'] as $preVarPosition => $preVarConf) {
                if ($preVarConf['GETvar'] == $languageParameter) {
                    // Get preVar value from URL
                    $uriParts = GeneralUtility::trimExplode('/', GeneralUtility::getIndpEnv('REQUEST_URI'), true);
                    $language = $uriParts[$preVarPosition];
                    if (isset($preVarConf['valueMap'][$language])) {
                        $sysLanguageUid = intval($preVarConf['valueMap'][$language]);
                    }
                    break;
                }
            }
        } // if realurl is installed


        // Check failure reason
        // Always use FIRST failure reason as it may have multiple reasons
        // combined (such as hidden and/or limited to fe_usergroups)
        $isAuthorizationAccessFailure = false;
        $firstFailureReason = array_keys($params['pageAccessFailureReasons'])[0];
        if ($firstFailureReason == 'fe_group') {
            if (is_array($params['pageAccessFailureReasons']['fe_group']) && count($params['pageAccessFailureReasons']['fe_group'])) {
                $isAuthorizationAccessFailure = true;
            }
        }


        // Generate redirect link and status
        $redirectLink = NULL;
        $isAuthorizationAccessFailure = false;
        // 401
        if ($isAuthorizationAccessFailure && $error401Uid) {
            $redirectLink = $currentURLParsed['scheme'] .'://'. $host . '/index.php?id=' . $error401Uid;
            $headerStatus = HttpUtility::HTTP_STATUS_401;
        // 404
        } elseif($error404Uid) {
            $redirectLink = $currentURLParsed['scheme'] .'://'. $host . '/index.php?id=' . $error404Uid;
            $headerStatus = HttpUtility::HTTP_STATUS_404;
        }


        // Perform redirect
        $redirectLoops = intval(GeneralUtility::_GET('redirectloops'));
        $redirectLoops++;
        if ($redirectLink && $redirectLoops <= $maxNumberOfRedirects) {
            if ($sysLanguageUid) {
                $redirectLink .= '&'. $languageParameter .'='. $sysLanguageUid;
            }
            $redirectLink .= '&redirectloops='. $redirectLoops;

            HttpUtility::setResponseCode($headerStatus);
            $urlContent = GeneralUtility::getUrl($redirectLink);
            $urlContent = trim($urlContent);
            print $urlContent;
        }

        if (!empty($urlContent)) {
            die;
        }

        // Not redirected so far? Maximum number of redirects reached? Throw raw 404 as fallback.
        HttpUtility::setResponseCode(HttpUtility::HTTP_STATUS_404);
        $title = 'Page Not Found';
        $message = $params['reasonText'] .'.<br /><br />PageNotFoundHandler could not handle the request. Either the maximum number of '.
            'redirects ('. $maxNumberOfRedirects .') have been reached or no target page has been configured. <br /><br />' .
            '<br />URL: "' . $params['currentUrl'] . '"';
        $messagePage = GeneralUtility::makeInstance('TYPO3\\CMS\\Core\\Messaging\\ErrorpageMessage', $message, $title);
        $messagePage->output();
        die;
    }

} // class PageNotFoundHandler
