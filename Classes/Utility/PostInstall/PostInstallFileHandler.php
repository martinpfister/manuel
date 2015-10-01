<?php
namespace Staempfli\Templatebootstrap\Utility\PostInstall;

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use Staempfli\TemplateBootstrap\Utility\PostInstall\PostInstallInfoLogger;
use Staempfli\TemplateBootstrap\Utility\TemplateBootstrapUtility;

class PostInstallFileHandler {


    /**
     * Creates or replaces robots.txt on save.
     *
     * @param $packageKey
     * @param $configuration
     */
    public function handleRobotsTxt($packageKey, $configuration, $test) {

        // Only (re-write) robots.txt on configuration save of template bootstrap package
        if (TemplateBootstrapUtility::getPackageKey() !== $packageKey) { return; }

        global $BE_USER;

        $robotsTemplateStartMarker  = '# Inserted by ext. '. $packageKey .' - start';
        $robotsHint                 = '# (may be overwritten by ext manager as long as the enclosing comments persist)';
        $robotsTemplateEndMarker    = '# Inserted by ext. '. $packageKey .' - end';
        $environment = trim($configuration['environment']['value']);

        // Quit, if this feature is not enabled at all
        if(!intval($configuration['writerobots']['value'])) { return; }

        // If no environment has been chosen, write log and exit.
        if (empty($environment) || $environment == 'none') {
            PostInstallInfoLogger::log('No environment has been chosen. No robots file written. That\'s ok. Just saying.', PostInstallInfoLogger::MESSAGE_TYPE_INFO, 10);
            return;
        }

        $robotsPath = GeneralUtility::getFileAbsFileName('robots.txt');
        $robotsTemplatePath = GeneralUtility::getFileAbsFileName('EXT:'. $packageKey .'/Initialisation/robots/robots-'. $environment .'.txt');

        // Load current robots.txt content
        $replaceRobots = false;
        $robotsExists = is_file($robotsPath);

        // Write robots, txt if it doesn't exist yet.
        if (!$robotsExists) {
            $replaceRobots = true;
            // Decide whether to write robots, if the whole content
        } else {
            $robotsContent = trim(file_get_contents($robotsPath));
            $markerBeginPos = strpos($robotsContent, $robotsTemplateStartMarker);
            $markerEndPos = strrpos($robotsContent, $robotsTemplateEndMarker);
            if (empty($robotsContent) || ($markerBeginPos === 0 && $markerEndPos !== false)) {
                // Only replace robots, if it is empty right now or markers are exactly at the beginning & the end of the robots.txt
                if (empty($robotsContent) || ($markerEndPos + strlen($robotsTemplateEndMarker) == strlen($robotsContent))) {
                    $replaceRobots = true;
                }
            }
        } // rewrite robots, if empty or whole content wrapped by markers

        // Replacing robots content
        if ($replaceRobots) {

            // Check existence of template file
            $robotsTemplateExists = is_file($robotsTemplatePath);
            if (!$robotsTemplateExists) {
                PostInstallInfoLogger::log('No environment has been chosen. No robots file written.', PostInstallInfoLogger::MESSAGE_TYPE_SYSTEM_ERROR, 10);
                return;
            }

            // Generate content
            $newRobotsContent = $robotsTemplateStartMarker . chr(10)
                . $robotsHint . chr(10)
                . file_get_contents($robotsTemplatePath) . chr(10)
                . $robotsTemplateEndMarker;

            // Only re-write robots.txt, if content has changed
            if ($newRobotsContent === $robotsContent) {
                return;
            }

            // Write file
            $written = GeneralUtility::writeFile($robotsPath, $newRobotsContent);

            // Write log
            if ($written) {
                PostInstallInfoLogger::log('Robots file has been successfully changed.', PostInstallInfoLogger::MESSAGE_TYPE_OK, 10);
            } else {
                PostInstallInfoLogger::log('Attempted to change robots file, but failed!', PostInstallInfoLogger::MESSAGE_TYPE_SYSTEM_ERROR, 10);
            }
        } // if replace robots.txt content

        return;

    } // function handleRobotsTxt




    /**
     * Renders and writes configuration that needs to go into AdditionalConfiguration.php
     *
     * @param $packageKey
     * @param $configuration
     */
    public function writeAdditionalConfiguration($packageKey, $configuration) {

        // Only write additional configuration on configuration save of template bootstrap package
        if (TemplateBootstrapUtility::getPackageKey() !== $packageKey) { return; }


        global $BE_USER;
        $fileContentLines = Array();

        $currentConfiguration = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$packageKey]);

        // pageNotFound handler
        // set default
        if (!isset($currentConfiguration['enableCustomErrorHandling'])) {
            $currentConfiguration['enableCustomErrorHandling'] = false;
        }
        // rewrite configuration, if necessary.
        $enableCustomErrorHandler = intval($configuration['enableCustomErrorHandling']['value']);
        if ($enableCustomErrorHandler) {
            $errorHandlerReference = 'USER_FUNCTION:typo3conf/ext/' . $packageKey . '/Classes/Utility/PageNotFoundHandler.php:Staempfli\\TemplateBootstrap\\Utility\\PageNotFoundHandler->pageNotFound';
            if ($errorHandlerReference !== $GLOBALS['TYPO3_CONF_VARS']['FE']['pageNotFound_handling']) {
                $fileContentLines[] = '$GLOBALS[\'TYPO3_CONF_VARS\'][\'FE\'][\'pageNotFound_handling\'] = \''. $errorHandlerReference .'\';';
            }
        }


        // trustedHostsPattern
        if (intval($configuration['generateTrustedHostsPattern']['value'])) {
            $finalPattern = 'SERVER_NAME';
            $domainsResult = $GLOBALS['TYPO3_DB']->exec_SELECTquery('*', 'sys_domain', NULL);
            if ($GLOBALS['TYPO3_DB']->sql_num_rows($domainsResult)) {
                $domainNames = Array();
                while($domainRecord = $GLOBALS['TYPO3_DB']->sql_fetch_assoc($domainsResult)) {
                    $domainNames[] = str_replace('.', '\.', $domainRecord['domainName']);
                }
                $finalPattern = '^('. implode('|', $domainNames) .')$';
            }
            if ($GLOBALS['TYPO3_CONF_VARS']['SYS']['trustedHostsPattern'] !== $finalPattern) {
                $fileContentLines[] = '$GLOBALS[\'TYPO3_CONF_VARS\'][\'SYS\'][\'trustedHostsPattern\'] = \''. $finalPattern .'\';';
            }
        }



        // Nothing to write?
        // abort.
        if (!count($fileContentLines)) {
            return;
        }

        // Enclose content with php tags & comment
        array_unshift($fileContentLines, '# Automatically (re-)written by extension "'. $packageKey. '". ('. date('d.m.Y H:i:s') .')');
        array_unshift($fileContentLines, '<?php');
        $fileContentLines[] = ' ?>';

        // Write file
        $file = @fopen(PATH_typo3conf .'/AdditionalConfiguration.php', 'a');
        $written = false;
        if ($file) {
            $written = @fwrite($file, implode(chr(10), $fileContentLines));
            @fclose($file);
        }

        // Write log
        if ($written) {
            PostInstallInfoLogger::log('AdditionalConfiguration.php updated.', PostInstallInfoLogger::MESSAGE_TYPE_OK, 20);
        } else {
            PostInstallInfoLogger::log('Attempted to extend AdditionalConfiguration.php, but failed!', PostInstallInfoLogger::MESSAGE_TYPE_SYSTEM_ERROR, 20);
        }

    } // writeAdditionalConfiguration

} // class PostInstallFileHandler

?>