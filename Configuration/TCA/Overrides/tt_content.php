<?php
defined('TYPO3_MODE') or die();
$GLOBALS['TCA']['tt_content']['columns']['assets']['config']['filter'][0]['parameters']['allowedFileExtensions'] .= ',soundcloud';
$GLOBALS['TCA']['tt_content']['columns']['assets']['config']['foreign_selector_fieldTcaOverride']['config']['appearance']['elementBrowserAllowed'] .= ',soundcloud';