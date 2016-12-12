/* *****************************************
* Julia HTML5 lightbox
*
* @author prochor666@gmail.com
* @version: 0.4.1
* @build: 2016-11-29
* @license: MIT
*
* @requires:
* jquery
****************************************** */
var JuliaBoxItem = function(options)
{
    var origin = this;

    // Import options
    options = typeof options === 'undefined' ? {}: options;

    // Unique instance ID
    var __JULIA_INSTANCE__ID__ = Math.floor((Math.random()*10000000)+1);

    // Default origin.options
    origin.options = {
        autoplay: false,
        autoplayControls: false,
        attr: 'href',
        collection: $('a[data-julia-box] img'),
        debug: false,
        i18n: {
            close: 'Close',
            next: 'Next',
            previous: 'Previous',
            errorIframe: 'Error, content not loaded',
            errorImage: 'Error, image not loaded',
            errorInline: 'Error, element not found',
        },
        iframeWidthLimit: 1280,
        item: {},
        itemIndex: 0,
        onClose: false,
        onInit: false,
        onNext: false,
        onPrevious: false,
        overlayActive: true,
        root: $('body'),
        sources: {},
        thumbs: false,
        timeout: 7,
        videoAutoplay: true,
    };


    // Extend default origin.options with external options
    $.extend(true, origin.options, options);


    // Environment
    origin.env = {
        attr: origin.options.attr,
        autoplay: origin.options.autoplay,
        autoplayControls: origin.options.autoplayControls,
        collection: origin.options.collection,
        i18n: origin.options.i18n,
        ID: __JULIA_INSTANCE__ID__,
        iframeWidthLimit: origin.options.iframeWidthLimit,
        initiator: false,
        instance: {},
        item: origin.options.item,
        itemIndex: origin.options.itemIndex,
        itemType: 'inline',
        last: origin.options.collection.length - 1,
        mediaObj: $([]),
        mediaObjSize: [0,0],
        model: {
            wrapper: {},
            content: {},
            toolbar: {},
            buttons: {},
            panels: {},
            preloader: {},
        },
        overlayActive: origin.options.overlayActive,
        opener: false,
        overflow: origin.options.root.css('overflow'),
        root: origin.options.root,
        services: {
            image: /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
            youtube: /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
            vimeo:  /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
            googleMaps: /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
            facebookVideo: /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
            instagram: /(instagram\.com)\/p\/([^\/]+)\/(\?\S*)?$/i,
            iframe: /(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/i,
        },
        timeout: origin.options.timeout,
        timer: false,
        videoAutoplay: origin.options.videoAutoplay,
    };


    // Base functions
    origin.Base = {};


    // Console debug
    origin.Base.debug = function(data)
    {
        if(origin.options.debug === true)
        {
            if(window.console)
            {
                for(d in data)
                {
                    console.log(' - [Julia BOX instance: '+origin.env.ID+'] '+d+' ['+(typeof data[d])+']', data[d]);
                }
            }
        }
    };


    // Debug start
    if(origin.options.debug === true && window.console )
    {
        console.info('=== Julia BOX console debug start, instance '+origin.env.ID+' ===');
    }


    origin.Ui =             new origin._Ui(origin);
    origin.Events =         new origin._Events(origin);
    origin.Callback =       new origin._Callback(origin);
    origin.Support =        new origin._Support(origin);
    origin.Media =          new origin._Media(origin);
    origin.Controls =       new origin._Controls(origin);
    origin.Persist =        new origin._Persist(origin);
    origin.Fullscreen =     new origin._Fullscreen(origin);


    origin.Events.init();


    // Define publicApi
    publicApi = {
        ID: origin.env.ID,
        Controls: origin.Controls,
        env: origin.env
    };

    return publicApi;
};







var JuliaBox = function(options)
{
    options = typeof options === 'undefined' ? {}: options;

    // Default origin.options
    var _options = {
        sources: {},
        attr: 'href',
        root: $('body'),
    };

    var __VIRTUAL_ID__ = Math.floor((Math.random()*10000000)+1);

    // Extend default origin.options with external options
    $.extend(true, _options, options);





    var isDOMElement = function( obj )
    {
        var _checkInstance = function(elem)
        {
            if( ( elem instanceof jQuery && elem.length ) || elem instanceof HTMLElement )
            {
                return true;
            }

            return false;
        }

        if( obj instanceof HTMLCollection && obj.length )
        {
                for( var a = 0, len = obj.length; a < len; a++ )
                {

                if( !_checkInstance( obj[a] ) )
                {
                    return false;
                }
            }

            return true;

        } else {

            return _checkInstance( obj );
        }
    };




    var normalize = function( item )
    {
        var norm = $('<a />');

        if( typeof item === 'string' )
        {
            norm.attr( _options.attr, item );
        }

        if( ( typeof item === 'object' && !isDOMElement( item ) ) )
        {
            if( item.hasOwnProperty('href')  )
            {
                norm.attr( _options.attr, item.href );

            }else if( item.hasOwnProperty('src') )
            {
                norm.attr( _options.attr, item.src );
            }

            if( item.hasOwnProperty('title')  )
            {
                norm.attr( 'title', item.title );
            }else{
                norm.attr( 'title', '' );
            }
        }

        norm.css({
            'display': 'none'
        });

        return norm;
    };





    _collection = $('<div class="---julia-virtual-gallery-'+__VIRTUAL_ID__+'---" style="display: none;" />');


    for( index in _options.sources )
    {
        _item = normalize( _options.sources[index] );
        _collection.append( _item );
    }

    _options.root.append( _collection );
    result = _collection.find('a').juliaBox( _options );

    return result;
};
