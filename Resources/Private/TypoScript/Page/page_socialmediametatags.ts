# **********************************************************
# Prepare contents to reuse in multiple meta tags
# **********************************************************
temp.socialmediametacontent = COA
temp.socialmediametacontent {

    site_name = {$company.name}
    title = TEXT
    title.field = title
    description.field = description

    url.typolink {
        parameter.field = uid
        addQueryString = 1
        useCacheHash = 0
        returnLast = url
        forceAbsoluteUrl = 1
    }

    image = TEXT
    image {
        cObject = FILES
        # Limit to first found image
        cObject.stdWrap.listNum = 0
        cObject {
            references.data = levelmedia:-1,slide
            renderObj = COA
            renderObj.10 = TEXT
            renderObj.10 {
                if.equals = 2
                if.value.data = file:current:type
                typolink {
                    parameter.data = file:current:publicUrl
                    returnLast = url
                    forceAbsoluteUrl = 1
                }
                wrap = |,
            }
        }
    }

    # Social network specific values
    openGraphType = website
    twitterCardType = summary
}



# **********************************************************
# Create tags - if this feature is enabled
# **********************************************************
[globalVar = LIT:1 = {$site.enableSocialMediaMetaTags}]
    page.meta {
        # Facebook Open Graph
        og:title < temp.socialmediametacontent.title
        og:site_name < temp.socialmediametacontent.site_name
        # Valid types are "article", "website" or "product"
        og:type < temp.socialmediametacontent.openGraphType
        og:locale < config.locale_all
        og:description < temp.socialmediametacontent.description
        og:url < temp.socialmediametacontent.url
        og:image < temp.socialmediametacontent.image

        # Twitter card
        # Valid types are "summary", "summary_large_image", "photo", "gallery", "app", "player", "product"
        # See https://dev.twitter.com/cards/types
        twitter:card < temp.socialmediametacontent.twitterCardType
        twitter:title < temp.socialmediametacontent.title
        twitter:description < temp.socialmediametacontent.description
        twitter:image < temp.socialmediametacontent.image
        twitter:url < temp.socialmediametacontent.url
    }
[global]