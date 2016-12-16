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
            return new JuliaBoxVirtual( options );
        }
    });
})($);


// Plugin for DOM collections
$.fn.juliaBox = function( options )
{
    var _collection = this;
    var api = {};

    var __JULIA_COLLECTION__ID__ = Math.floor((Math.random()*10000000)+1);
    var masterSelector = 'julia-box-' + __JULIA_COLLECTION__ID__;

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
        options.collectionID = __JULIA_COLLECTION__ID__;
        options.item = $(this);
        options.itemIndex = index;

        // Pass options to constructor
        var juliaBoxInstance = new JuliaBox( options );

        // Store plugin object in element's data
        $(this)
        .addClass('julia-box-collection-'+__JULIA_COLLECTION__ID__)
        .data({
            'juliabox': juliaBoxInstance,
            'juliabox-index': index,
            'juliabox-collection': __JULIA_COLLECTION__ID__
        });
    });

    api.next = function(){ $('.'+masterSelector).find('button.julia-next').click(); };
    api.prev = function(){ $('.'+masterSelector).find('button.julia-previous').click(); };
    api.close = function(){ $('.'+masterSelector).find('button.julia-close').click(); };
    api.open = function(){ _collection[0].click(); };

    return api;
};
