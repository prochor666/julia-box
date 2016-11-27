/* *****************************************
* Julia HTML5 lightbox
*
* @author prochor666@gmail.com
* @version: 0.4.0
* @build: 2016-11-27
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
        overlayClose: true,
        root: $('body'),
        sources: {},
        thumbs: false,
        timeout: 5,
        videoAutoplay: true,
    };


    // Extend default origin.options with external options
    $.extend(true, origin.options, options);


    // Environment
    origin.env = {
        collection: origin.options.collection,
        item: origin.options.item,
        itemIndex: origin.options.itemIndex,
        itemType: 'inline',
        last: origin.options.collection.length - 1,
        attr: origin.options.attr,
        root: origin.options.root,
        i18n: origin.options.i18n,
        overflow: origin.options.root.css('overflow'),
        iframeWidthLimit: origin.options.iframeWidthLimit,
        mediaObj: $([]),
        mediaObjSize: [0,0],
        instance: {},
        overlayClose: origin.options.overlayClose,
        videoAutoplay: origin.options.videoAutoplay,
        autoplay: origin.options.autoplay,
        autoplayControls: origin.options.autoplayControls,
        timeout: origin.options.timeout,
        opener: false,
        timer: false,
        initiator: false,
        ID: __JULIA_INSTANCE__ID__,
        api: {},
        model: {
            wrapper: {},
            content: {},
            toolbar: {},
            buttons: {},
            panels: {},
            preloader: {},
        },
        services: {
            image: /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
            youtube: /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
            vimeo:  /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
            googleMaps: /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
            facebookVideo: /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
            iframe: /(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/i,
        }
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


    // Autostart play, if possible
    if(origin.options.autoplay === true)
    {
    }


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

/* *****************************************
* Julia HTML5 lightbox
* Callback
* event callbacks
****************************************** */
JuliaBoxItem.prototype._Callback = function(origin)
{
    var self = this;

    self.fn = function(f, data)
    {
        data = data||{};

        if( $.inArray(typeof f, ['string', 'function', 'object']) > -1 )
        {
            // Callback defined as function name or function
            // !!! Remember !!!
            // If you are using typeof string, function must be callable globally (window context)
            if( typeof f === 'string' )
            {
                f = window[f];
            }

            f(origin.options, origin.env, data);

            origin.Base.debug({
                'Callback': typeof f+' raised'
            });

        }else{

            origin.Base.debug({
                'Callback': typeof f+' is not a function, but: '+(typeof f)
            });
        }
    };
};

/* *****************************************
* Julia HTML5 lightbox
* Virtual controls
****************************************** */
JuliaBoxItem.prototype._Controls = function(origin)
{
    var self = this;




    self.press = function(action, data)
    {
        data = data||{};

        origin.Base.debug({
            'action': action,
            'action-data': data,
        });

        switch(action)
        {
            case 'play':


            break; case 'pause':


            break; case 'next':

                clearTimeout(origin.env.timer);

                index = origin.env.itemIndex + 1;
                if( index == origin.env.collection.length )
                {
                    index = 0;
                }

                if(origin.options.onNext !== false)
                {
                    origin.Callback.fn(origin.options.onNext, origin.env);
                }

                origin.Events.keysOff();
                origin.env.instance.remove();
                origin.env.collection[index].click();

            break; case 'previous':

                clearTimeout(origin.env.timer);

                index = origin.env.itemIndex - 1;
                if( index == -1 )
                {
                    index = origin.env.collection.length - 1;
                }

                if(origin.options.onPrevious !== false)
                {
                    origin.Callback.fn(origin.options.onPrevious, origin.env);
                }

                origin.Events.keysOff();
                origin.env.instance.remove();
                origin.env.collection[index].click();

            break; case 'close':

                clearTimeout(origin.env.timer);

                if(origin.options.onClose !== false)
                {
                    origin.Callback.fn(origin.options.onClose, origin.env);
                }

                origin.env.instance.hide( 150, function()
                {
                    origin.Events.keysOff();
                    origin.env.instance.remove();
                    origin.env.root.css({
                        'overflow': origin.env.overflow
                    });

                    origin.env.root.find('[data-julia-box-initiator]').removeData('julia-box-initiator');
                });

            break; case 'fullscreen-on':


            break; case 'fullscreen-off':


            break; default:

        }

        return;
    };

};

/* *****************************************
* Julia HTML5 lightbox
* DOM & api event handlers and emmiters
****************************************** */
JuliaBoxItem.prototype._Events = function(origin)
{
    var self = this;




    self.init = function()
    {
        // Item handler
        origin.env.item.on('click', function(e)
        {
            e.preventDefault();

            if( origin.Support.initiator() == 0 )
            {
                origin.env.item.data('julia-box-initiator', 'True');
            }

            origin.env.root.css({
                'overflow': 'hidden'
            });

            origin.Ui.create();

            origin.Events.ui();

            $('#julia-box-'+origin.env.ID).on( 'julia.ui-ready' , function()
            {
                origin.Media.getMedia();
            });

            if(origin.options.onInit !== false)
            {
                origin.Callback.fn( origin.options.onInit, origin.env );
            }

            origin.env.model.buttons.close.focus();

            if( origin.env.autoplay === true )
            {
                origin.env.timer = setTimeout( function()
                {
                    origin.Controls.press('next');
                }, origin.env.timeout*1000 );
            }
        });
    };




    self.keysOff = function()
    {
        origin.env.root.off( 'keydown' );
        origin.env.model.buttons.close.off( 'click' );
        origin.env.model.buttons.previous.off( 'click' );
        origin.env.model.buttons.next.off( 'click' );
    };




    // Bind user action & DOM events
    self.ui = function()
    {
        // Next item in collection
        origin.env.model.content.on( 'click',  function(e)
        {
            e.stopPropagation();
            if( $(e.target).is('.julia-content') &&  origin.options.overlayClose === true )
            {
                origin.Controls.press('close');
            }
        });




        // Close box
        origin.env.model.buttons.close.on( 'click',  function(e)
        {
            e.preventDefault();
            origin.Controls.press('close');
        });




        // Next item in collection
        origin.env.model.buttons.previous.on( 'click',  function(e)
        {
            e.preventDefault();
            origin.Controls.press('previous');
        });




        // Next item in collection
        origin.env.model.buttons.next.on( 'click',  function(e)
        {
            e.preventDefault();
            origin.Controls.press('next');
        });




        origin.env.root.on( 'keydown', function(e)
        {
            // ESC key
            if( e.keyCode === 27 )
            {
                origin.Controls.press('close');
            }

            // Previous
            if( e.keyCode === 37 )
            {
                origin.Controls.press('previous');
            }

            // Next
            if( e.keyCode === 39 )
            {
                origin.Controls.press('next');
            }
        });




        // Resize event load fix
        var rtime;
        var timeout = false;
        var delta = 10;

        var resizeEnd = function()
        {
            if( new Date() - rtime < delta )
            {
                setTimeout( resizeEnd, delta );
            } else {
                timeout = false;
                origin.Media.resize();
            }
        }


        $(window).on('resize', function()
        {
            rtime = new Date();

            if (timeout === false)
            {
                timeout = true;
                setTimeout( resizeEnd, delta );
            }
        });
    };

};

/* *****************************************
* Julia HTML5 lightbox
* Fullscreen behavior
****************************************** */
JuliaBoxItem.prototype._Fullscreen = function(origin)
{
    var self = this;




    self.on = function(fullscreenFrame)
    {
        if( fullscreenFrame.requestFullscreen )
        {
            fullscreenFrame.requestFullscreen();

        }else if( fullscreenFrame.msRequestFullscreen )
        {
            fullscreenFrame.msRequestFullscreen();

        }else if( fullscreenFrame.mozRequestFullScreen )
        {
            fullscreenFrame.mozRequestFullScreen();

        }else if( fullscreenFrame.webkitRequestFullscreen )
        {
            fullscreenFrame.webkitRequestFullscreen();

        }else{

            origin.Base.debug({
                'fullscreen': 'Fullscreen is not supported'
            });
        }
    };




    self.off = function()
    {
        if( document.exitFullscreen )
        {
            document.exitFullscreen();

        }else if( document.msExitFullscreen )
        {
            document.msExitFullscreen();

        }else if( document.mozCancelFullScreen )
        {
            document.mozCancelFullScreen();

        }else if( document.webkitExitFullscreen )
        {
            document.webkitExitFullscreen();
        }
    };




    self.reset = function(instance, model, api)
    {
        $(document).off('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange');

        // Fullscreen change event handler
        $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function(e)
        {
            if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
            {
                origin.Ui.state( instance, 'julia-fullscreen-on', 'julia-fullscreen-off' );
                origin.Ui.state( model.buttons.fullscreen, 'off', 'on' );
                origin.Ui.icon( model.buttons.fullscreen, 'julia-fullscreen-exit', 'julia-fullscreen' );

                origin.Base.debug({
                    'fullscreen off' : '#julia-player-'+origin.env.ID
                });

            }else{

                origin.Ui.state( instance, 'julia-fullscreen-off', 'julia-fullscreen-on' );
                origin.Ui.state( model.buttons.fullscreen, 'on', 'off' );
                origin.Ui.icon( model.buttons.fullscreen, 'julia-fullscreen', 'julia-fullscreen-exit' );

                origin.Base.debug({
                    'fullscreen on' : '#julia-player-'+origin.env.ID
                });
            }

            origin.Support.resize();

            setTimeout( function()
            {
                w = origin.env.api.getAttribute('width');

                origin.env.instance.find('.julia-progress').width(w);
                origin.env.instance.find('.julia-progress .julia-slider-track').width(w);

                model.sliders.progress.update( origin.Timecode.toPercents( api.currentTime ) );
            }, 5);

        });
    };
};

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
