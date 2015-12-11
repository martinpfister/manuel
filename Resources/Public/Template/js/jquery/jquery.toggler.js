/************************************************************
 *     toggler
 *     @author Stämpfli Webteam / 18.11.2014
 *     Requires: jQuery
 *
 *     Usage:
 *     $('#yourelement').toggler();
 *                  or
 *     $('#yourelement').toggler({
 *          activeClassName:'yourActiveClass',
 *          elementIdOverride:'alternativeIdName'
 *      });
 *
 *     What it does:
 *     1.   Adds/removes class "toggledActive" or user defined
 *          class to previously initalized item.
 *     2.   Adds/removes [elementID]-[activeClassName] to
 *          body in order to provide CSS styling possibilities.
 ************************************************************/
(function($) {
    $.fn.toggler = function(options) {

        var target = this;
        var defaultOptions = {
            activeClassName:'toggledActive',
            elementIdOverride:false
        }
        var settings = $.extend( {}, defaultOptions, options );

        // Catch click events on this element
        this.bind('click', {target:target, settings:settings}, function(event){

            var isActive = $(event.target).hasClass(settings.activeClassName);
            var toggleId = $(event.target).attr('id');
            if (settings.elementIdOverride) {
                toggleId = settings.elementIdOverride;
            }
            if (!isActive) {
                $(event.target).addClass(settings.activeClassName);
                if (toggleId !== undefined) {
                    $('body').addClass(toggleId + '-' + settings.activeClassName)
                }
            } else {
                $(event.target).removeClass(settings.activeClassName);
                if (toggleId !== undefined) {
                    $('body').removeClass(toggleId + '-' + settings.activeClassName)
                }
            }
        });

        // Return this same object for chained actions / processing
        return this;
    };
}(jQuery));