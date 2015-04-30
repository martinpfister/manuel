# **********************************************************
# General PAGE setup
# **********************************************************
page = PAGE
page {

    # FE layout rendering is done within FrontendLayoutRendering.ts

    # Meta tags
    meta {
        viewport = width=device-width, initial-scale=1.0
        keywords.field = keywords
        keywords.override.data = register:newsKeywords
        description.field = description
        abstract.field = abstract
        robots = INDEX,FOLLOW
        # See page_socialmediametatags.ts for facebook open graph and
        # twitter cards tags (activated/deativated by constant "").
    }

    # Page title
    headerData.15 = COA
    headerData.15 {
        wrap = <title>|</title>
        10 = TEXT
        10.value = {$site.pageTitlePrefix}
        # Insert space character between prefix and page title, if prefix is set
        10.stdWrap.noTrimWrap = || |
        10.stdWrap.if.isTrue = {$site.pageTitlePrefix}
        20 = TEXT
        20.field = subtitle // title
        30 = TEXT
        30.value = {$site.pageTitleSuffix}
    }

    # BODY tag classes
    bodyTagCObject = COA
    bodyTagCObject {
        stdWrap.wrap = <body class="|">

        # Add page UID
        10 = TEXT
        10 {
            value = page-{field:uid}
            insertData = 1
            noTrimWrap = || |
        }

        # Add uid of the backend-layout
        20 = TEXT
        20 {
            data = levelfield:-1, backend_layout_next_level, slide
            override.field = backend_layout
            # Backend layouts added by our hook will be formatted as "extensionkey__LayoutKey".
            # For our body class, we'll only need the suffix-part ("LayoutKey"), so we'll
            # split the value by "__" here.
            split.token = __
            split.returnKey = 1
        }

        # Add uid of optional FE-layout
        30 = TEXT
        30 {
            fieldRequired = layout
            value = layout-{field:layout}
            insertData = 1
            required = 1
            noTrimWrap = | ||
        }
    }
}
