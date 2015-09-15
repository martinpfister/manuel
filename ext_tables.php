<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}
use \TYPO3\CMS\Core\Utility\GeneralUtility;
use \TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use \TYPO3\CMS\Backend\Sprite\SpriteManager;


/******************************
 * Backend skinning
 *****************************/

// Read extension 'backend' configuration
$backendExtConf = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['backend']);
// Set login logo, if it has not previously been set
if (empty($backendExtConf['loginLogo'])) {
	$backendExtConf['loginLogo'] = 'EXT:' . $_EXTKEY . '/Resources/Public/Backend/Skin/img/logo_login.png';
}
// Re-serialize 'backend' extension configuration
$GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['backend'] = serialize($backendExtConf);


// Set backend skin
$GLOBALS['TBE_STYLES']['skins'][$_EXTKEY .'_skin'] = array();
$GLOBALS['TBE_STYLES']['skins'][$_EXTKEY .'_skin']['name'] = $_EXTKEY .' skin';
$GLOBALS['TBE_STYLES']['skins'][$_EXTKEY .'_skin']['stylesheetDirectories'] = array(
    'structure' => 'EXT:'. $_EXTKEY .'/Resources/Public/Backend/Skin/',
    'visual' => 'EXT:'. $_EXTKEY .'/Resources/Public/Backend/Skin/',
);


/******************************
 * Embed static TS
 ******************************/
ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', $_EXTKEY );


/******************************
 * BackendLayoutDataProvider
 *****************************/
GeneralUtility::requireOnce(ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Hooks/Provider/BackendLayoutDataProvider.php');
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['BackendLayoutDataProvider'][$_EXTKEY] = 'Staempfli\TemplateBootstrap\Hooks\Provider\BackendLayoutDataProvider';


/******************************
 * Custom page tree icons
 ******************************/
$availableIcons = array('system', 'layouts', 'menufolder');
foreach($availableIcons as $icon) {
	SpriteManager::addTcaTypeIcon(
		'pages',
		'contains-' . $icon,
		ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Backend/Icons/PageTree/' . $icon . '.png');

    $GLOBALS['TCA']['pages']['columns']['module']['config']['items'][] = array(
		0 => 'LLL:EXT:' . $_EXTKEY . '/Resources/Private/Language/Backend.xml:pagetree.page_contains_' . $icon ,
		1 => $icon,
	);
}

?>
