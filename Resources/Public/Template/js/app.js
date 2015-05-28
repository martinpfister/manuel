/************************************************************
 *     Initializing
************************************************************/
$(function() {

    // Init foundation
    $(document).foundation();

    // Init lightbox (fancybox)
    $('.fancybox, .lightbox').fancybox();
    $('.fancybox-media, .lightbox-media').fancybox({
        helpers : {media : {}}
    });

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