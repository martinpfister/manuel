<INCLUDE_TYPOSCRIPT: source="EXT:indexed_search/Configuration/TypoScript/setup.txt">
<INCLUDE_TYPOSCRIPT: source="FILE:./locallangoverrides.ts">


# Plugin configuration
# Mostly copied from the original system extension.
plugin.tx_indexedsearch {


    # Error message, if wrong plugin
    #(non-fluid-based) has been chosen
    stdWrap.override {
        cObject = TEXT
        cObject.value (
            <p class="error">ERROR (indexed_search). You've chosen the 'wrong' frontend plugin.
            Right now, the setup is ready for plugin 2 called 'Indexed search (Extbase & Fluid based)'
            and would most likely not work with the current plugin.<br /><br />
            You can remove this message and/or edit the configuration in
            EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/indexed_search/setup.ts</p>
        )
        cObject.insertData = 1

        if.value = indexedsearch_pi2
        if.equals.field = list_type
        if.negate = 1
    }

    # Remove any default styles
    _CSS_DEFAULT_STYLE >


    search {
        rootPidList = {$site.pageUids.home}
        targetPid = {$plugin.tx_indexedsearch.targetPid}
        targetPid.data >
        rootPidList = 1
    }

    // Result list settings.
    // (i.e. Title & summary cropping, search word highlighting settings)
    results {
        titleCropAfter = 50
        titleCropSignifier = ...
        summaryCropAfter = 100
        summaryCropSignifier =
        hrefInSummaryCropAfter = 60
        hrefInSummaryCropSignifier = ...

        // Maximum length of a summary to highlight searchwords
        markupSW_summaryMax = 300
        // Number of characters kept on both sides of the highlighted searchword
        markupSW_postPreLgd = 60
        // Offset of characters from the right side of a highlighted searchword
        markupSW_postPreLgd_offset = 5
        markupSW_divider = ...
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

    # Set template/partial/layout paths.
    # Use original paths as fallback.
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