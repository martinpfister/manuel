/************************************************************
 *     doubleTapMenu
 *     @author Stämpfli Webteam / 18.11.2014
 *     Requires: jQuery, Modernizr
 *
 *     Usage:
 *     $('#yourelement').doubleTapMenu();
 *                  or
 *     $('#yourelement').doubleTapMenu({
 *          tapClassName:'yourOwnTouchedClass'
 *      });
 *
 *     What it does:
 *     1.   Appends class "touched" (or user defined class in
 *          options) to parent menu item on first click, if
 *          it is a touch device. Prevents default behavior
 *          of link at the same time.
 *     2.   Respects default behavior of link on second touch
 *          or removes "touched" class if any other
 *          item has been clicked/touched.
 *
 *      Visibility etc. needs to be handled via CSS!
 ************************************************************/
(function($) {
    $.fn.doubleTapMenu = function(options) {

        var menu = this;
        var defaultOptions = {tapClassName:'touched'}
        var settings = $.extend( {}, defaultOptions, options );

        var lastTouchStartStamp = 0;
        var tapMinimumMilliseconds = 500;

        // Handle touch events
        // (triggers 'menutap' event, if necessary)
        $(this).find('a').bind('touchstart touchend', {menu:menu, settings:settings}, function(event){
            if (event.type == 'touchstart') {
                lastTouchStartStamp = event.timeStamp;
            } else if (event.type == 'touchend' && lastTouchStartStamp+tapMinimumMilliseconds >= event.timeStamp) {
                $(event.currentTarget).trigger('menutap');
            }
        });


        // Handle tap event
        $(this).find('a').bind('menutap', {menu:menu, settings:settings}, function(event){
            var menuElement = $(event.currentTarget).closest('li');
            var hasSubmenu = $(menuElement).children('ul').length;

            // Only adding 'tap' css class, if the menu element has submenus and
            // does not have the class yet.
            if (hasSubmenu > 0 && !$(menuElement).hasClass(settings.tapClassName)) {
                $(menu).find('.'+ settings.tapClassName).removeClass(settings.tapClassName);
                $(menuElement).parents('li').addClass(settings.tapClassName);
                $(menuElement).addClass(settings.tapClassName);
                return false;

            // Triggering regular click, if there are no submenus or the submenu
            // is already open (has the 'tap' css class assigned).
            } else {
                lastTouchStartStamp = 0;
                $(event.currentTarget).trigger('click');
                return true;
            }
        });


        // Catch click events - prevent, if the touch start event
        // has been triggered lately. Otherwise tap & click would both
        // fire.
        $(this).find('a').bind('click', {menu:menu, settings:settings}, function(event){
            if (lastTouchStartStamp+tapMinimumMilliseconds >= event.timeStamp) {
                return false;
            } else {
                return true;
            }
        });


        // Return this same object for chained actions / processing
        return this;
    };
}(jQuery));