page {
    # CSS files to be included
    includeCSS {

        normalizer = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/css/lib/normalize.css
        normalizer.media = screen,print
        mainCSS = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/css/app.css
        mainCSS.media = screen,print
        fancybox = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox.css
        fancyboxThumbnailHelper = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox-thumbs.css
    }


    # JS libs header
    includeJSlibs {
        modernizr = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/modernizr/modernizr.js
    }


    # JS libs footer
    includeJSFooterlibs {
        jQuery = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery-1.11.1.min.js
        jQueryCookie = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.cookie.js
        # Move/swipe events (swipe depends on move!)
        jQueryMove = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.event.move.js
        jQuerySwipe = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.event.swipe.js
        jQueryPlaceholder = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/jquery.placeholder.js
        jQueryFancybox = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox.js
        jQueryFancyboxMediahelper = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox-media.js
        jQueryFancyboxThumbnailHelper = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/fancybox/jquery.fancybox-thumbs.js

        foundation = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.js
        foundationTopbar = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.topbar.js
        foundationClearing = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.clearing.js
        foundationAlert = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.alert.js
        foundationReveal = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.reveal.js
        foundationOffcanvas = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.offcanvas.js
        foundationTabs = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.tab.js
        foundationAccordion = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/foundation/foundation.accordion.js

        slickslider = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/jquery/slick/slick.js

        # Click delay removal for mobile browsers
        fastclick = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/js/fastclick/fastclick.js

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
        stdWrap.wrap = <script type="text/javascript">|</script>

        10 = TEXT
        10.insertData = 1
        10.value (
		  var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', '{$site.googleAnalytics.account}']);
		  _gaq.push (['_gat._anonymizeIp']);
		  _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
		  _gaq.push(['_trackPageview']);


		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
        )
    }
[global]