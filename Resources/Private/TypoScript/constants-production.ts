# **********************************************************
#    Extension constants
# **********************************************************
#<INCLUDE_TYPOSCRIPT: source="FILE:./../Extensions/news/constants.ts">
#<INCLUDE_TYPOSCRIPT: source="FILE:./../Extensions/indexed_search/constants.ts">


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
    languageSwitcher = &L=0 || &L=1 || &L=2

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


# **********************************************************
#    Image rendering settings
# **********************************************************
# Set this the the max width ANY rendered image should have. Will
# be downsized by browser when needed. Usually, this is the
# main content column width.
imageRenderingMaxWidth = 1200
