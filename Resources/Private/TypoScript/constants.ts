# **********************************************************
#    Extension constants
# **********************************************************
<INCLUDE_TYPOSCRIPT: source="FILE:./../Extensions/indexed_search/constants.ts">


# **********************************************************
#    Company constants
# **********************************************************
company {
    name = Muster AG
    street = Musterstrasse 44
    pobox =
    city = 9999 Musterhausen
    phone = 099 999 99 99
    email = muster@musterag.com
}


# **********************************************************
#    Site settings
# **********************************************************
site {

    url = http://www.site.com

    enableRealURL = 1
    enableSocialMediaMetaTags = 1

    # Page title
    pageTitlePrefix < company.name
    pageTitlePrefix := appendString( -)
    pageTitleSuffix =

    # Languages
    languageUids = 0,1,2
    languageLabels = Deutsch |*| Français |*| Italiano

    # Compress / merge CSS / JS
    compressAndMergeAssets = 1

    # Google analytics
    googleAnalytics = 0
    googleAnalytics.account = UA-XXXXXX

    # Pids that may be used in various places
    # such as skiplinks, meta menus or ext configurations
    # Used for skiplinks: home, navigation, content, contact, sitemap, search, optionalSkiplink[1-4]
    pageUids {
        home = 1
        navigation = #navigation
        content = #content
        contact =
        sitemap =
        search =
        optionalSkiplink1 =
        optionalSkiplink2 =
        optionalSkiplink3 =
        optionalSkiplink4 =
    }
}


# * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
#    Environment-based overrides
[globalVar = LIT:{$plugin.templatebootstrap.environment} = local]
    site {
        url = http://{$plugin.templatebootstrap.packageKey}.local/
        enableRealURL = 0
    }
[global]
[globalVar = LIT:{$plugin.templatebootstrap.environment} = development]
    site {
        url = http://{$plugin.templatebootstrap.packageKey}.dev.staempfli.com/
        enableRealURL = 0
    }
[global]
#    Environment-based overrides (end)
# * * * * * * * * * * * * * * * * * * * * * * * * * * * * *



# **********************************************************
#    Image rendering settings
# **********************************************************
# Set this the the max width ANY rendered image should have. Will
# be downsized by browser when needed. Usually, this is the
# main content column width.
imageRenderingMaxWidth = 1200


# **********************************************************
#    Icon rendering definitions
#
#    Notices:
#    - sizes are integer only. Icons will all be square.
#    - iconSourceVersion is "default" per default. Override
#      without (!) file extension and it will load
#      packagekey-[iconSourceVersion].ai You may - for example -
#      want to include the company claim for larger sizes.
# **********************************************************
site.icons {

    /*
    XXX {
        size = 111
        relAttribute = icon
        additionalAttributes = myattr="myvalue"
        iconSourceFileName = icon-larger
        colorOverlay = #cccccc
        backgroundColor = #ff0000
    }
    */
    1.size = 72
    1.relAttribute = apple-touch-icon

    2.size = 114
    2.relAttribute = apple-touch-icon

    3.size = 144
    3.relAttribute = apple-touch-icon

    4.size = 180
    4.relAttribute = apple-touch-icon

    5.size = 32
    5.additionalAttributes = type="image/png"

    6.size = 96
    6.additionalAttributes = type="image/png"

    7.size = 192
    7.iconSourceVersion = icon-larger
    7.additionalAttributes = type="image/png"

    8.size = 256
    8.iconSourceFileName = icon-larger
    8.additionalAttributes = type="image/png"

    # You may specify up to 15 icons here.
    # If you need more, extend Page/page_icons.ts

}
