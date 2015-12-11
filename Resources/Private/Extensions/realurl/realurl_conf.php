<?php
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array(
    '_DEFAULT' =>
        array(
            'init' =>
                array(
                    'enableCHashCache' => true,
                    'appendMissingSlash' => 'ifNotFile,redirect',
                    'adminJumpToBackend' => true,
                    'enableUrlDecodeCache' => true,
                    'enableUrlEncodeCache' => true,
                    'emptyUrlReturnValue' => '/',
                ),
            'pagePath' =>
                array(
                    'type' => 'user',
                    'userFunc' => 'EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main',
                    'spaceCharacter' => '-',
                    'languageGetVar' => 'L',
                    'rootpage_id' => '1',
                ),
            'fileName' =>
                array(
                    'defaultToHTMLsuffixOnPrev' => 1,
                    'acceptHTMLsuffix' => 1,
                    'index' =>
                        array(
                            'print' =>
                                array(
                                    'keyValues' =>
                                        array(
                                            'type' => 98,
                                        ),
                                ),
                        ),
                ),
            'preVars' =>
                array(
                    array(
                        'GETvar' => 'L',
                        'valueMap' =>
                            array(
                                'de' => '0',
                                'fr' => '1',
                                'it' => '2',
                                'en' => '3'
                            ),
                        'noMatch' => 'de',
                        'valueDefault' => 'de',
                    ),
                ),
            'postVarSets' =>
                array(
                    '_DEFAULT' =>
                        array(
                            'news' =>
                                array(
                                    0 =>
                                        array(
                                            'GETvar' => 'tx_news_pi1[news]',
                                            'lookUpTable' =>
                                                array(
                                                    'table' => 'tx_news_domain_model_news',
                                                    'id_field' => 'uid',
                                                    'alias_field' => 'title',
                                                    'useUniqueCache' => 1,
                                                    'useUniqueCache_conf' =>
                                                        array(
                                                            'strtolower' => 1,
                                                            'spaceCharacter' => '-',
                                                        ),
                                                ),
                                        ),
                                ),
                        ),
                ),
        ),
);
