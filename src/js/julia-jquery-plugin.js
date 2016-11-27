/* *****************************************
* Julia HTML5 lightbox
* UMD loader
* Uses CommonJS, AMD or browser globals
* to create a jQuery plugin.
****************************************** */
( function( factory )
{
    if( typeof define === 'function' && define.amd )
    {
        // AMD. Register as an anonymous module.
        define( ['jquery'], factory );
    }else if( typeof module === 'object' && module.exports )
    {
        // Node/CommonJS
        module.exports = function( root, jQuery )
        {
            if ( jQuery === undefined )
            {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if( typeof window !== 'undefined' )
                {
                    jQuery = require( 'jquery' );
                }
                else {
                    jQuery = require( 'jquery' )( root );
                }
            }

            factory( jQuery );
            return jQuery;
        };
    } else {
        // Browser globals
        factory( jQuery );
    }

}(function( $ )
{
    // Build jQuery plugin
    jQuery.fn.juliaBox = function( options )
    {
        var _collection = this;
        var result = [];

        this.each( function( index )
        {
            // Return if this element already has a plugin instance
            if( $(this).data('juliabox') )
            {
                return;
            }

            options = typeof options === 'undefined' ? {}: options;
            options.collection = _collection;
            options.item = $(this);
            options.itemIndex = index;

            // Pass options to constructor
            var juliaBoxInstance = new JuliaBoxItem( options, true );

            // Store plugin object in element's data
            $(this).data('juliabox', juliaBoxInstance);

            result.push( juliaBoxInstance );
        });

        return result;
    };
}));
