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
    'version' => '1.2.0-DEV',
    '_md5_values_when_last_written' => '',
    'constraints' => array(
        'depends' => array(
            'php' => '5.1.0-0.0.0',
            'typo3' => '6.2.6-0.0.0',
            'fluid' => '',
        ),
        'conflicts' => array(),
        'suggests' => array(
            'news' => '1.3.0-',
            'realurl' => '1.12.1-',
            'gridelements' => '3.0.0-',
        ),
    ),
    'suggests' => array(),  // DEPRECATED! Use 'constraints' instead!
);

?>