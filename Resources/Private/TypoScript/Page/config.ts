config {
    doctype = html5
    xmlprologue = none
    disablePrefixComment = 1

    index_enable = 1
    index_externals = 1

    # remove inline CSS/JS to external
    removeDefaultJS = external
    inlineStyle2TempFile = 1
    compressJs = {$site.compressAndMergeAssets}
    compressCss = {$site.compressAndMergeAssets}
    concatenateJs = {$site.compressAndMergeAssets}
    concatenateCss = {$site.compressAndMergeAssets}

    # RealURL
    simulateStaticDocuments = 0
    absRefPrefix = /
    tx_realurl_enable = {$site.enableRealURL}
    prefixLocalAnchors >

    # Spam
    spamProtectEmailAddresses = -2
    spamProtectEmailAddresses_atSubst = <script type="text/javascript">document.write('@');</script>
    spamProtectEmailAddresses_lastDotSubst = <script type="text/javascript">document.write('.');</script>

    # check for valid L-params
    linkVars = L(0-10)

    # Links & content sharing across domains
    typolinkEnableLinksAcrossDomains = 1
    typolinkCheckRootline = 1
    content_from_pid_allowOutsideDomain = 1

    # Cache
    cache_clearAtMidnight = 1
    cache_period = 1200
    sendCacheHeaders = 1

    # Title
    pageTitle.cObject = COA
    pageTitle.cObject {
        10 = TEXT
        10.value = {$site.pageTitlePrefix}
        # Insert space character between prefix and page title, if prefix is set
        10.stdWrap.noTrimWrap = || |
        10.stdWrap.if.isTrue = {$site.pageTitlePrefix}

        20 = TEXT
        20.field = subtitle // title

        30 = TEXT
        30.value = {$site.pageTitleSuffix}
        # Insert space character between page title and suffix, if suffix is set
        30.stdWrap.noTrimWrap = | ||
        30.stdWrap.if.isTrue = {$site.pageTitleSuffix}
    }


    # Version & creator notes in a header comment
    headerComment (
        Stämpfli AG // www.staempfli.com

Package version: {$plugin.templatebootstrap.packageVersion}
Bootstrap package version: {$plugin.templatebootstrap.bootstrapPackageVersion}
    )


    #HTML tag
    htmlTag_stdWrap {
        setContentToCurrent = 1
        cObject = COA
        cObject {
            10 = LOAD_REGISTER
            10.htmlTag_langKey < config.htmlTag_langKey

            20 = TEXT
            20.value (
                <!--[if IE 8]><html class="no-js lt-ie9" lang="{REGISTER:htmlTag_langKey}"> <![endif]-->
                <!--[if gt IE 8]><!--> <html class="no-js" lang="{REGISTER:htmlTag_langKey}"> <!--<![endif]-->
            )
            20.value.insertData = 1

            30 = RESTORE_REGISTER
        }
    }
}