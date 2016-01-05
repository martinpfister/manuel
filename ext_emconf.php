<?php

$EM_CONF[$_EXTKEY] = array(
    'title' => 'Manuel Etter',
    'description' => '',
    'category' => 'fe',
    'shy' => 0,
    'priority' => '',
    'loadOrder' => '',
    'module' => '',
    'state' => 'stable',
    'internal' => 0,
    'uploadfolder' => 0,
    'createDirs' => '',
    'modify_tables' => '',
    'clearCacheOnLoad' => 1,
    'lockType' => '',
    'author' => 'Martin Pfister',
    'author_email' => 'mail@martinpfister.info',
    'author_company' => '',
    'CGLcompliance' => '',
    'CGLcompliance_note' => '',
    'version' => '2.2',
    '_md5_values_when_last_written' => '',
    'constraints' => array(
        'depends' => array(
            'php' => '5.4.0-0.0.0',
            'typo3' => '7.6.0-7.99.99',
            'fluid_styled_content' => '7.6.0-7.99.99',
            'fluid' => '7.6.0-7.99.99',
        ),
        'conflicts' => array(),
        'suggests' => array(
            'realurl' => '1.12.1-',
            'gridelements' => '3.0.0-',
        ),
    ),
    'autoload' =>
        array(
            'psr-4' => array(
                'Staempfli\\TemplateBootstrap\\' => 'Classes',
            ),
            'classmap' => array(
                'Classes'
            )
        )
);