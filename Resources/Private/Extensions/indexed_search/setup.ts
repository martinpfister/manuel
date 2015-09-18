<INCLUDE_TYPOSCRIPT: source="FILE:EXT:indexed_search/Configuration/TypoScript/setup.txt">
<INCLUDE_TYPOSCRIPT: source="FILE:./locallangoverrides.ts">

# Plugin configuration
# Mostly copied from the original system extension.
plugin.tx_indexedsearch {

    search {
        rootPidList = {$site.pageUids.home}
        targetPid = {$plugin.tx_indexedsearch.targetPid}
        targetPid.data >
        rootPidList = 1
    }

    settings {

        displayRules = 0
        showAdditionalKeywordSearch = 0
        displayAdvancedSearchLink = 0
        displayResultNumber = 1

        # show the parse times
        displayParsetimes = 0
        displayLevel1Sections = 0
        displayLevel2Sections = 0
        displayLevelxAllTypes = 0
        clearSearchBox = 0
        clearSearchBox.enableSubSearchCheckBox = 1
        displayForbiddenRecords = 0
        alwaysShowPageLinks = 1
        mediaList =


        page_links = 10
        detectDomainRcords = 0
        defaultFreeIndexUidList =
        searchSkipExtendToSubpagesChecking = 0
        exactCount = 0
        forwardSearchWordsInResultLink = 0

        # Blinding of option-selectors / values in these (advanced search)
        blind {
            searchType = 0
            defaultOperand = 0
            sections = 0
            freeIndexUid = 1
            mediaType = 0
            sortOrder = 0
            group = 0
            languageUid = 0
            desc = 0
            numberOfResults = 0
            # defaultOperand.1 = 1
            # extResume=1
        }


        defaultOptions {
            defaultOperand = 0
            sections = 0
            freeIndexUid = -1
            mediaType = -1
            sortOrder = rank_flag
            languageUid = -1
            sortDesc = 1
            searchType = 1
        }

    }


    view {
        templateRootPath >
        partialRootPath >
        layoutRootPath >

        templateRootPaths {
            10 = {$plugin.tx_indexedsearch.view.templateRootPath}
            20 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/indexed_search/Templates/
        }
        partialRootPaths {
            10 = {$plugin.tx_indexedsearch.view.partialRootPath}
            20 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/indexed_search/Partials/
        }
        layoutRootPaths {
            10 = {$plugin.tx_indexedsearch.view.layoutRootPath}
            20 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/indexed_search/Layouts/
        }
    }

}