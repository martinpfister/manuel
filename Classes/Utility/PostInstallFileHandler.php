<?php
namespace Staempfli\TemplateBootstrap\Utility;

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class PostInstallFileHandler {


    public function getPackageKey() {
        return $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'];
    }

    /**
     * Creates or replaces robots.txt on save.
     *
     * @param $newConfiguration
     * @param $configurationController
     */
    public function handleRobotsTxt($newConfiguration, $configurationController) {
        global $BE_USER;

        $packageKey                 = $this->getPackageKey();
        $robotsTemplateStartMarker  = '# Inserted by ext. '. $packageKey .' - start';
        $robotsHint                 = '# (may be overwritten by ext manager as long as the enclosing comments persist)';
        $robotsTemplateEndMarker    = '# Inserted by ext. '. $packageKey .' - end';
        $environment = trim($newConfiguration['environment']['value']);

        // Quit, if this feature is not enabled at all
        if(!intval($newConfiguration['writerobots']['value'])) { return; }

        // If no environment has been chosen, write log and exit.
        if (empty($environment) || $environment == 'none') {
            $BE_USER->simplelog('(extension configuration) No environment has been chosen. No robots file written.', $packageKey, 0);
            return;
        }

        $robotsPath = GeneralUtility::getFileAbsFileName('robots.txt');
        $robotsTemplatePath = GeneralUtility::getFileAbsFileName('EXT:'. $packageKey .'/Initialisation/robots/robots-'. $newConfiguration['environment']['value'] .'.txt');

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
                $BE_USER->simplelog('(extension configuration) Template for robots.txt does not exist ('. $robotsTemplatePath .')!.', $packageKey, 2);
                return;
            }

            // Generate content
            $newRobotsContent = $robotsTemplateStartMarker . chr(10)
                . $robotsHint . chr(10)
                . file_get_contents($robotsTemplatePath) . chr(10)
                . $robotsTemplateEndMarker;

            // Write file
            $written = GeneralUtility::writeFile($robotsPath, $newRobotsContent);

            // Write log
            if ($written) {
                $BE_USER->simplelog('(extension configuration) Robots file has been successfully changed.', $packageKey, 0);
            } else {
                $BE_USER->writeLog('(extension configuration) Attempted to change robots file, but failed!', $packageKey, 2);
            }
        } // if replace robots.txt content

        return;

    } // function handleRobotsTxt




    /**
     * Renders and writes configuration that needs to go into AdditionalConfiguration.php
     *
     * @param $newConfiguration
     * @param $configurationController
     */
    public function writeAdditionalConfiguration($newConfiguration, $configurationController) {
        global $BE_USER;
        $fileContentLines = Array();

        $packageKey = $this->getPackageKey();
        $currentConfiguration = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$packageKey]);

        // pageNotFound handler
        // set default
        if (!isset($currentConfiguration['enableCustomErrorHandling'])) {
            $currentConfiguration['enableCustomErrorHandling'] = false;
        }
        // rewrite configuration, if necessary.
        $enableCustomErrorHandler = intval($newConfiguration['enableCustomErrorHandling']['value']);
        if ($enableCustomErrorHandler) {
            $errorHandlerReference = 'USER_FUNCTION:typo3conf/ext/' . $packageKey . '/Classes/Utility/PageNotFoundHandler.php:Staempfli\\Templatebootstrap\\Utility\\PageNotFoundHandler->pageNotFound';
            if ($errorHandlerReference !== $GLOBALS['TYPO3_CONF_VARS']['FE']['pageNotFound_handling']) {
                $fileContentLines[] = '$GLOBALS[\'TYPO3_CONF_VARS\'][\'FE\'][\'pageNotFound_handling\'] = \''. $errorHandlerReference .'\';';
            }
        }


        // trustedHostsPattern
        if (intval($newConfiguration['generateTrustedHostsPattern']['value'])) {
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
            $BE_USER->simplelog('(extension configuration) AdditionalConfiguration.php not written. No content for writing configured in ext configuration.', $packageKey, 0);
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
            $BE_USER->simplelog('(extension configuration) AdditionalConfiguration.php written.', $packageKey, 0);
        } else {
            $BE_USER->writeLog('(extension configuration) Attempted to extend AdditionalConfiguration.php, but failed!', $packageKey, 2);
        }

    } // writeAdditionalConfiguration

} // class PostInstallFileHandler

?>