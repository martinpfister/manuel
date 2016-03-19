page {
    # CSS files to be included
    includeCSS {
        normalizer = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/css/lib/normalize.css
        normalizer.media = screen,print
        mainCSS = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/css/app.css
        mainCSS.media = screen,print
        #fancybox = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox.css
        #fancyboxThumbnailHelper = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox-thumbs.css
    }

    # JS libs header
    includeJSLibs {
        modernizr = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/modernizr/modernizr.js
    }

    # JS libs footer
    includeJSFooterlibs {
        jQuery = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/bower_components/jquery/dist/jquery.min.js
        unitegallery-base = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/unitegallery/unitegallery.min.js
        #unitegallery = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/sass/unitegallery/themes/default/ug-theme-default.js
        unitegalleryt = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/sass/unitegallery/themes/tiles/ug-theme-tiles.js
        #jQueryCookie = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.cookie.js
        #jQueryDoubleTapMenu = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.doubleTapMenu.js
        #jQueryToggler = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.toggler.js

        # Move/swipe events (swipe depends on move!)
        #jQueryMove = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.event.move.js
        #jQuerySwipe = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.event.swipe.js
        #jQueryPlaceholder = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.placeholder.js
        #jQueryFancybox = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox_patched.js
        #jQueryFancyboxMediahelper = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox-media.js
        #jQueryFancyboxThumbnailHelper = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox-thumbs.js

        #foundation = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.js
        #foundationClearing = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.clearing.js
        #foundationOffcanvas = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.offcanvas.js

        #slickslider = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/slick/slick.js

        # Click delay removal for mobile browsers
        #fastclick = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/fastclick/fastclick.js

    } #includeJSFooterlibs


    # JS footer
    includeJSFooter {
        # Main application js
        mainJS = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/app.js
    }


    # Include polyfills for older browsers conditionally
    footerData.10 = COA
    footerData.10 {
        wrap (
            <!--[if lt IE 9]>
               |
            <![endif]-->
        )

        # Respond polyfill for IE<9
        10 = TEXT
        10.value = /typo3conf/ext/{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/respond/respond.js
        10.wrap = <script src="|"></script>
        10.insertData = 1

        # rem unit polyfill for IE<9
        20 = TEXT
        20.value = /typo3conf/ext/{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/rem/rem.min.js
        20.wrap = <script src="|"></script>
        20.insertData = 1
    }
} #page



# **********************************************************
# Google analytics (conditionally)
# **********************************************************
[globalVar = LIT:1 = {$site.googleAnalytics}]
    page.footerData.100 = COA
    page.footerData.100 {
        stdWrap.wrap = <script>|</script>

        10 = TEXT
        10.value (
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})
            (window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', '{$site.googleAnalytics.account}', 'auto');
            ga('send', 'pageview');
        )
    }
[global]
# Remove analytics, if user has set the 'Do Not Track' flag in the browser
[Staempfli\TemplateBootstrap\Utility\Condition\DoNotTrackCondition]
    page.footerData.100 >
[global]
