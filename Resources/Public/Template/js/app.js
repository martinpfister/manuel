/************************************************************
 *     Initializing
************************************************************/
$(function() {

    // Init foundation
    $(document).foundation();

    // Init double tap menu
    $('.top-bar-section').doubleTapMenu();

    // Init toggle button(s)
    // Example implementation
    //$('.hamburger-icon').toggler({
    //   activeClassName:'activated',     // optional; default: 'active'
    //   elementIdOverride:'myNavigation' // optional; default: HTML-id of element
    //});

    // Init placeholder
    // (for browsers not supporting placeholder attribute)
    if (Modernizr.input.placeholder) {
        $('html').addClass('placeholder');
    } else {
        $('input, textarea').placeholder();
        $('html').addClass('no-placeholder');
    }


    // Init regular (image) lightboxes
    $('.lightbox').fancybox();

    // Init media lightboxes (videos, etc.)
    // Treat media lightboxes carefully! Do not
    // open lightbox on media elements that have an embedding
    // alternative, if the screen resolution is low.
    $('.lightbox-media').fancybox({
        helpers : {media : {}},
        beforeLoad: function() {
            var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            if($(this.element).data('embedcode').length > 0 && (windowWidth < 600 || windowHeight < 600)) {
                $(this.element).replaceWith($(this.element).data('embedcode'));
                return false;
            }
        }
    });
    // Initialize preview content replacement
    // (i.e. preview image with iFrame. Used for online media
    // services such as YouTube.
    $('.preview[data-embedcode]').not('[class*="lightbox"]').bind('click', function(clickEvent){
        clickEvent.preventDefault();
        $(clickEvent.currentTarget).replaceWith($(clickEvent.currentTarget).data('embedcode'));
    });



    // Init slider (slick slider)
    var slickSliderSettings = {
        dots: true,
        infinite: true,
        pauseOnHover: true,
        speed: 800,
        cssEase:'ease-in-out', // CSS easing
        easing:'swing', // jQuery easing
        autoplay: false,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    dots: false
                }
            }
        ]
    };
    $('.slider:not(.autoplay)').slick(slickSliderSettings);
    slickSliderSettings.autoplay = true;
    $('.slider.autoplay').slick(slickSliderSettings);

});