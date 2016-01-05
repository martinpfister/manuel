<INCLUDE_TYPOSCRIPT: source="FILE:EXT:news/Configuration/TypoScript/setup.txt">


# **********************************************************
# Changes to EXT:news
# **********************************************************
plugin.tx_news {
    view {
        templateRootPaths {
            0 = EXT:manueletter/Resources/Private/Extensions/news/Templates/
            1 = {$plugin.tx_news.view.templateRootPath}
        }

        partialRootPaths {
            0 = EXT:manueletter/Resources/Private/Extensions/news/Partials/
            1 = {$plugin.tx_news.view.partialRootPath}
        }

        layoutRootPaths {
            0 = EXT:manueletter/Resources/Private/Extensions/news/Layouts/
            1 = {$plugin.tx_news.view.layoutRootPath}
        }

    }

    settings {
        cssFile >
        defaultDetailPid = {$site.newsDetail}
        listPid = {$site.newsList}
        list {
            paginate {
                insertAbove = 0
                insertBelow = 1
                itemsPerPage = 10
            }

            media {
                image {
                    maxWidth = 260
                    #maxHeight = 350
                }
            }

            rss.channel {
                title = Manuel Etter
                description =
                link = http://manueletter.com
                language = de_CH
                copyright = Trafag
                category =
            }
        }
        detail {
            showSocialShareButtons = 0
            media {
                image {
                    maxWidth = 900
                    maxHeight = 600
                }
            }
        }

    }
}

[globalVar = TSFE:id = {$site.startseitePid}]
    plugin.tx_news {
        view {
            templateRootPath = EXT:trafag/Resources/Private/Extensions/news/home/Templates/
            partialRootPath = EXT:trafag/Resources/Private/Extensions/news/home/Partials/
        }
        settings {
            cropMaxCharacters = 100
            list {
                media.image {
                    maxWidth = 160
                    maxHeight = 90
                }
            }
        }
    }
[global]
[globalVar = GP:tx_news_pi1|news > 0]
    config.defaultGetVars {
        tx_news_pi1 {
            controller=News
            action=detail
        }
    }
[global]
#-------------------------------------------------------------------------------
#    EXT:news Latest news
#-------------------------------------------------------------------------------

lib.extensions.news_latest = USER
lib.extensions.news_latest {
    userFunc = tx_extbase_core_bootstrap->run
    extensionName = News
    pluginName = Pi1

    switchableControllerActions {
        News {
            1 = list
        }
    }
    settings < plugin.tx_news.settings
    settings {
        topNewsRestriction = 1
        hidePagination = 1
        cropMaxCharacters = {$plugin.theme_configuration.extensions.news.latest.cropMaxCharacters}
        detailPid = {$plugin.theme_configuration.extensions.news.latest.detailPid}
        limit = {$plugin.theme_configuration.extensions.news.latest.limit}
        startingpoint = {$plugin.theme_configuration.extensions.news.latest.startingpoint}
        isLatest = 1
    }
}