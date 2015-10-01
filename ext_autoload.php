<?php

    $extensionClassesPath = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/';

    $default = array(
        'Staempfli\TemplateBootstrap\Utility\TemplateBootstrapUtility' => $extensionClassesPath . 'Utility/TemplateBootstrapUtility.php',
        'Staempfli\TemplateBootstrap\Utility\PostInstall\PostInstallInfoLogger' => $extensionClassesPath . 'Utility/PostInstall/PostInstallInfoLogger.php',
        'Staempfli\TemplateBootstrap\Utility\PostInstall\PostInstallFileHandler' => $extensionClassesPath . 'Utility/PostInstall/PostInstallFileHandler.php',
        'Staempfli\TemplateBootstrap\Utility\PostInstall\PostInstallDatabaseHandler' => $extensionClassesPath . 'Utility/PostInstall/PostInstallDatabaseHandler.php',
    );
    return $default;