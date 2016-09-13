/************************************************************
 *     Web - Functions
 ************************************************************/
var web = (function(document, $) {
    var
    _mootimage = function() {
        var imgPath = $('#wrapper').attr('data-background');
        if(imgPath) {
            var absolutePath = 'http://' + window.location.hostname + imgPath;
            $.ajax({
                url: absolutePath,
                type:'HEAD',
                error:
                    function(){
                        //console.log("nope :( " + absolutePath);
                    },
                success:
                    function(){
                        $('body').css('background-image', 'url(' + imgPath + ')');
                    }
            });
        }
    },
    _menumaker = function() {
        $("#cssmenu").menumaker({
            title: "Menu",
            format: "multitoggle"
        });
    },
    _positionLogo = function() {
        var logo = $('#logo').parent(),
            middle = Math.ceil( ($("#cssmenu ul > li").length) / 2);
        $("#cssmenu li:nth-child(" + middle + ")").before(logo);
    },
    _init = function() {
        _mootimage();
        _positionLogo();
        _menumaker();
    };

    return {
        init: _init
    };

})(document, jQuery);

/************************************************************
 *     Initializing Dudes Menu
 ************************************************************/

(function($) {

    $.fn.menumaker = function(options) {

        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function() {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function(){
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                }
                else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function() {
                if ($( window ).width() > 768) {
                    cssmenu.find('ul').show();
                }

                if ($(window).width() <= 768) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);


/************************************************************
 *     Initializing
************************************************************/
$(function() {

    web.init();

    jQuery("#gallery").unitegallery({
        tiles_type:"justified",
        tile_enable_textpanel: true,
        lightbox_textpanel_enable_description: true,
        tile_textpanel_title_text_align: "center"
    });

    $('.news-list-view').equalize('innerHeight');


});