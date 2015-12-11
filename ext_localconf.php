<?php
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

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

$environment = $settings['environment'];
ExtensionManagementUtility::addTypoScriptConstants('plugin.templatebootstrap.environment='. $environment);


# Do not change this. It is used to identify which templatebootstrap version this package is originally derived from.
ExtensionManagementUtility::addTypoScriptConstants('plugin.templatebootstrap.bootstrapPackageVersion='. ExtensionManagementUtility::getExtensionVersion($_EXTKEY));

# Load constants & setup
ExtensionManagementUtility::addTypoScript($_EXTKEY, 'constants', '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:'. $_EXTKEY .'/Resources/Private/TypoScript/constants.ts">', $_EXTKEY .'/Configuration/TypoScript/');
ExtensionManagementUtility::addTypoScript($_EXTKEY, 'setup', '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:'. $_EXTKEY .'/Resources/Private/TypoScript/setup.ts">', $_EXTKEY .'/Configuration/TypoScript/');


# Register extconf variable to use in scripts
# (such as the layout provider hook)
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'] = $_EXTKEY;


/******************************
 * Add mood image and background image
 * to the page overlay field list.
 * Inheritance (rootline
 * functionality) will be implemented by
 * the TSRootLineMedia class.
 ******************************/
$GLOBALS['TYPO3_CONF_VARS']['FE']['pageOverlayFields'] .= ',tx_'. $_EXTKEY .'_moodimage,tx_'. $_EXTKEY .'_backgroundimage';


/******************************
 * Register helper & renderer
 * for online media
 * 'SoundCloud'
 ******************************/
$GLOBALS['TYPO3_CONF_VARS']['SYS']['fal']['onlineMediaHelpers']['soundcloud'] = 'Staempfli\TemplateBootstrap\Helpers\SoundCloudHelper';
$rendererRegistry = \TYPO3\CMS\Core\Resource\Rendering\RendererRegistry::getInstance();
$rendererRegistry->registerRendererClass('Staempfli\TemplateBootstrap\Rendering\SoundCloudRenderer');
$GLOBALS['TYPO3_CONF_VARS']['SYS']['FileInfo']['fileExtensionToMimeType']['soundcloud'] = 'audio/soundcloud';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['mediafile_ext'] .= ',soundcloud';


# Use signal 'afterExtensionConfigurationWrite' to handle post installation tasks
if (TYPO3_MODE === 'BE') {

    // This class needs to be included manually as we need those down
    // below already - before any autoload mechanism has been executed.
    GeneralUtility::requireOnce(ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Utility/TemplateBootstrapUtility.php');


    # Register Gravatar avatar provider
    GeneralUtility::requireOnce(ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Utility/GravatarAvatarProvider.php');
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['backend']['avatarProviders']['GravatarProvider'] = [
        'provider' => 'Staempfli\\TemplateBootstrap\\Utility\\GravatarAvatarProvider',
        'after' => ['defaultAvatarProvider']
    ];


    # Instantiate signal slot dispatcher
    $signalSlotDispatcher = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Extbase\SignalSlot\Dispatcher::class);

    // Handle/write robots.txt
    $signalSlotDispatcher->connect(
        \TYPO3\CMS\Extensionmanager\Controller\ConfigurationController::class,
        'afterExtensionConfigurationWrite',
        'Staempfli\\TemplateBootstrap\\Utility\\PostInstall\\PostInstallFileHandler',
        'handleRobotsTxt'
    );

    // Handle/write AdditionalConfiguration.php
    $signalSlotDispatcher->connect(
        \TYPO3\CMS\Extensionmanager\Controller\ConfigurationController::class,
        'afterExtensionConfigurationWrite',
        'Staempfli\\TemplateBootstrap\\Utility\\PostInstall\\PostInstallFileHandler',
        'writeAdditionalConfiguration'
    );

    // Handle creating DB users (cli)
    $signalSlotDispatcher->connect(
        \TYPO3\CMS\Extensionmanager\Controller\ConfigurationController::class,
        'afterExtensionConfigurationWrite',
        'Staempfli\\TemplateBootstrap\\Utility\\PostInstall\\PostInstallDatabaseHandler',
        'createCLIUsers'
    );

    // Extend system information toolbar item (in the top bar in TYPO3 backend)
    $signalSlotDispatcher->connect(
        \TYPO3\CMS\Backend\Backend\ToolbarItems\SystemInformationToolbarItem::class,
        'loadMessages',
        'Staempfli\\TemplateBootstrap\\Utility\\PostInstall\\PostInstallInfoLogger',
        'getTemplateBootstrapLogMessages'
    );
}

?>