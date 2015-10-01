<?php

    $extensionClassesPath = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/';

    $default = array(
        'Staempfli\TemplateBoostrap\Utility\TemplateBootstrapUtility' => $extensionClassesPath . 'Utility/TemplateBootstrapUtility.php',
        'Staempfli\TemplateBoostrap\Utility\PostInstall\PostInstallInfoLogger' => $extensionClassesPath . 'Utility/PostInstall/PostInstallInfoLogger.php',
        'Staempfli\TemplateBoostrap\Utility\PostInstall\PostInstallFileHandler' => $extensionClassesPath . 'Utility/PostInstall/PostInstallFileHandler.php',
        'Staempfli\TemplateBoostrap\Utility\PostInstall\PostInstallDatabaseHandler' => $extensionClassesPath . 'Utility/PostInstall/PostInstallDatabaseHandler.php',
    );
    return $default;

?>