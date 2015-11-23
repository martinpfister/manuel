#-------------------------------------------------------------------------------
#    Logo
#-------------------------------------------------------------------------------
lib.logo = COA
lib.logo {

    # Main logo
    10 = IMAGE
    10 {
        file = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/LogoSources/logo-default.ai
        file {
            maxW = 600
            ext = png
            # Add crop parameter to force re-rendering svg as png
            crop = 0,0
        }

        altText = {LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:logo} {$company.name}
        altText.insertData = 1
        stdWrap.typolink {
            title.data = LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:home
            parameter = {$site.pageUids.home}
            ATagParams = id="logo" class="show-for-medium-up"
        }
    }


    # Alternative logo on narrow/small screens
    20 < .10
    20.file = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/LogoSources/icon-default.ai
    20.file.maxW >
    20.file.maxH = 100
    20.stdWrap.typolink.ATagParams = id="logo-iconesque" class="show-for-small"

}