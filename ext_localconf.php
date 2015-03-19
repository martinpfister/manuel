<?php

if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
$settings = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$_EXTKEY]);

# Adding page and user tsconfig
# Parse files and replace ###PACKAGE_KEY### though!
$pageTSConfigAbsFileName = GeneralUtility::getFileAbsFileName('EXT:' . $_EXTKEY . '/Resources/Private/TsConfig/Page.ts');
$RTETSConfigAbsFileName = GeneralUtility::getFileAbsFileName('EXT:' . $_EXTKEY . '/Resources/Private/TsConfig/RTE.ts');
$pageTSConfig = GeneralUtility::getUrl($pageTSConfigAbsFileName);
$RTETSConfig = GeneralUtility::getUrl($RTETSConfigAbsFileName);
$pageTSConfig = str_replace('###PACKAGE_KEY###', $_EXTKEY, $pageTSConfig . $RTETSConfig);
ExtensionManagementUtility::addPageTSConfig($pageTSConfig);

$userTSConfigAbsFileName = GeneralUtility::getFileAbsFileName('EXT:' . $_EXTKEY . '/Resources/Private/TsConfig/User.ts');
$userTSConfig = GeneralUtility::getUrl($userTSConfigAbsFileName);
$userTSConfig = str_replace('###PACKAGE_KEY###', $_EXTKEY, $userTSConfig);
ExtensionManagementUtility::addUserTSConfig($userTSConfig);

# Register constants to use package key and version in TS later
if (TYPO3_MODE === 'FE') {
    $packageVersion = exec('git --git-dir="' . ExtensionManagementUtility::extPath($_EXTKEY) . '/.git" describe --tags --always --long');
    $packageVersion .= ' ('. exec('git --git-dir="' . ExtensionManagementUtility::extPath($_EXTKEY) . '/.git" rev-parse --abbrev-ref HEAD') .')';
} else {
    $packageVersion = '(only available in FE mode)';
}
ExtensionManagementUtility::addTypoScriptConstants('plugin.templatebootstrap.packageKey='. $_EXTKEY);
ExtensionManagementUtility::addTypoScriptConstants('plugin.templatebootstrap.packageVersion='. $packageVersion);

# Do not change this. It is used to identify which templatebootstrap version this package is originally derived from.
ExtensionManagementUtility::addTypoScriptConstants('plugin.templatebootstrap.bootstrapPackageVersion='. ExtensionManagementUtility::getExtensionVersion($_EXTKEY));

# Load constants & setup according to chosen environment
$environment = $settings['environment'];
if ($environment == 'local' || $environment == 'development' || $environment == 'production') {
    ExtensionManagementUtility::addTypoScript($_EXTKEY, 'constants', '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:'. $_EXTKEY .'/Resources/Private/TypoScript/constants-'. $environment .'.ts">', $_EXTKEY .'/Configuration/TypoScript/');
    ExtensionManagementUtility::addTypoScript($_EXTKEY, 'setup', '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:'. $_EXTKEY .'/Resources/Private/TypoScript/setup-'. $environment .'.ts">', $_EXTKEY .'/Configuration/TypoScript/');
}

# Register extconf variable to use in scripts
# (such as the layout provider hook)
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'] = $_EXTKEY;

# Use signal 'afterExtensionConfigurationWrite' to handle post installation tasks
if (TYPO3_MODE === 'BE') {
    GeneralUtility::requireOnce(ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Utility/PostInstallFileHandler.php');
    $signalSlotDispatcher = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\SignalSlot\\Dispatcher');

    // Handle/write robots.txt
    $signalSlotDispatcher->connect(
        'TYPO3\\CMS\\Extensionmanager\\Controller\\ConfigurationController',
        'afterExtensionConfigurationWrite',
        'Staempfli\\TemplateBootstrap\\Utility\\PostInstallFileHandler',
        'handleRobotsTxt'
    );

    // Handle/write AdditionalConfiguration.php
    $signalSlotDispatcher->connect(
        'TYPO3\\CMS\\Extensionmanager\\Controller\\ConfigurationController',
        'afterExtensionConfigurationWrite',
        'Staempfli\\TemplateBootstrap\\Utility\\PostInstallFileHandler',
        'writeAdditionalConfiguration'
    );

}

?>