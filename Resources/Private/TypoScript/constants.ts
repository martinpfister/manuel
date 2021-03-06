# **********************************************************
#    Extension constants
# **********************************************************
<INCLUDE_TYPOSCRIPT: source="FILE:./../Extensions/fluid_styled_content/constants.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:./../Extensions/indexed_search/constants.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:./../Extensions/formhandler/contact/ts/constants.ts">

# **********************************************************
#    Company constants
# **********************************************************
company {
    name = Manuel Etter
    street =
    pobox =
    city =
    phone =
    email =
}


# **********************************************************
#    Site settings
# **********************************************************
site {

    url = http://www.manueletter.com

    enableRealURL = 1
    enableSocialMediaMetaTags = 1

    # Page title
    pageTitlePrefix < company.name
    pageTitlePrefix := appendString( -)
    pageTitleSuffix =

    # Languages
    languageUids = 0,1
    languageLabels = EN |*| DE

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
[Staempfli\TemplateBootstrap\Utility\Condition\EnvironmentCondition = local]
    site {
        url = http://{$plugin.templatebootstrap.packageKey}.local/
        enableRealURL = 0
        compressAndMergeAssets = 0
        googleAnalytics = 0
    }
[global]
[Staempfli\TemplateBootstrap\Utility\Condition\EnvironmentCondition = development]
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
# This is the same figure, but when the images appear side-by-side
# with the text. This should correspond with the max-width of the
# gallery column set in _common.scss (usually 70%).
imageRenderingMaxWidthInText = 840


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
