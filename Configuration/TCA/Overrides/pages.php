<?php
defined('TYPO3_MODE') or die();

/******************************
 * Custom pages fields
 ******************************/
$packageKey = Staempfli\TemplateBootstrap\Utility\TemplateBootstrapUtility::getPackageKey();

$tmp_pages_columns = array(
    'tx_'. $packageKey .'_moodimage' => array(
        'label' => 'LLL:EXT:'. $packageKey .'/Resources/Private/Language/Backend.xlf:pageproperties.imagery.moodimage',
        // Load default "image" field TCA config & add some overrides
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig(
            'tx_'. $packageKey .'_moodimage',
            Array(
                'maxitems' => 1,
                'minitems' => 0,
                'appearance' => array(
                    'createNewRelationLinkTitle' => 'LLL:EXT:cms/locallang_ttc.xlf:images.addFileReference'
                ),
            ),
            // Only allow images
            $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext']
        ),
        'exclude' => 0,
    ),
    'tx_'. $packageKey .'_backgroundimage' => array(
        'label' => 'LLL:EXT:'. $packageKey .'/Resources/Private/Language/Backend.xlf:pageproperties.imagery.backgroundimage',
        // Load default "image" field TCA config & add some overrides
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig(
            'tx_'. $packageKey .'_backgroundimage',
            Array(
                'maxitems' => 1,
                'minitems' => 0,
                'appearance' => array(
                    'createNewRelationLinkTitle' => 'LLL:EXT:cms/locallang_ttc.xlf:images.addFileReference'
                ),
            ),
            // Only allow images
            $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext']
        ),
        'exclude' => 0,
    ),
);

// Define backend field and palette sequence.
$backendFieldStructure = 'tx_'. $packageKey .'_backgroundimage,--linebreak--,tx_'. $packageKey .'_moodimage';
$backendPaletteStructure = '--palette--;LLL:EXT:'. $packageKey .'/Resources/Private/Language/Backend.xlf:pageproperties.imagery;'. $packageKey .'_imagery';

// Add fields to pages
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', $tmp_pages_columns);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette('pages', $packageKey. '_imagery', $backendFieldStructure);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('pages', $backendPaletteStructure, 1, 'after:subtitle');

// Add fields to pages language overlay
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages_language_overlay', $tmp_pages_columns);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette('pages_language_overlay', $packageKey. '_imagery', $backendFieldStructure);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('pages_language_overlay', $backendPaletteStructure, 1, 'after:subtitle');
