/* *****************************************
* Julia HTML5 lightbox
* jQuery plugin & extension
****************************************** */


// Extension for non DOM context
(function($)
{
    $.extend({
        juliaBox: function ( options )
        {
            return new JuliaBox( options );
        }
    });
})($);


// Plugin for DOM collections
$.fn.juliaBox = function( options )
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

        // Build some opts
        options = typeof options === 'undefined' ? {}: options;
        options.collection = _collection;
        options.item = $(this);
        options.itemIndex = index;

        // Pass options to constructor
        var juliaBoxInstance = new JuliaBoxItem( options, true );

        // Store plugin object in element's data
        $(this).data('juliabox', juliaBoxInstance);

        // Add item into collection
        result.push( juliaBoxInstance );
    });

    return result;
};
