<?php

########################################################################
# Extension Manager/Repository config file
#
# Manual updates:
# Only the data in the array - everything else is removed by next
# writing. "version" and "dependencies" must not be touched!
########################################################################

$EM_CONF[$_EXTKEY] = array(
    'title' => 'Website template bootstrap',
    'description' => '',
    'category' => 'fe',
    'shy' => 0,
    'dependencies' => 'extbase,fluid',  // DEPRECATED! Use 'constraints' instead!
    'conflicts' => '',                  // DEPRECATED! Use 'constraints' instead!
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
    'author' => 'Stämpfli AG, Internet+Systeme',
    'author_email' => 'webteam@staempfli.com',
    'author_company' => '',
    'CGLcompliance' => '',
    'CGLcompliance_note' => '',
    'version' => '2.0.0',
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

?>