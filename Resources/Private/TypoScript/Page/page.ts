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

        robots = NOINDEX.NOFOLLOW
        robots.override = INDEX,FOLLOW
        robots.override.if {
            isFalse.field = no_search
            value = development
            equals = {$plugin.templatebootstrap.environment}
        }


        # See page_socialmediametatags.ts for facebook open graph and
        # twitter cards tags (activated/deativated by constant "").
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
