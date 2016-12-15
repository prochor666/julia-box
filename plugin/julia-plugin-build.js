/* *****************************************
* Julia HTML5 lightbox
*
* Base objects
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
        version: '0.5.1',
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

/* *****************************************
* Julia HTML5 lightbox
* User interface
* complete DOM model
****************************************** */
JuliaBoxItem.prototype._Ui = function(origin)
{
    var self = this;




    self.create = function()
    {
        if( origin.env.instance.lemgth > 0 )
        {
            origin.env.instance.remove();
        }

        // Main container
        origin.env.instance = $('<div class="julia-box julia-fullscreen-off" id="julia-box-'+origin.env.ID+'">'
                    +'</div>');

        // Containers
        origin.env.model.wrapper = $('<div class="julia-wrapper" id="julia-wrapper-'+origin.env.ID+'"></div>');

        origin.env.model.content = $('<div class="julia-content" id="julia-content-'+origin.env.ID+'"></div>');

        origin.env.model.toolbar = $('<div class="julia-toolbar" id="julia-toolbar-'+origin.env.ID+'"></div>');

        origin.env.model.preloader = $('<div class="julia-preloader on"></div>');

        // Buttons
        origin.env.model.buttons.play = $('<button class="julia-btn julia-playback play">'
        +'    <i class="julia-icon julia-play"></i>'
        +'</button>');

        origin.env.model.buttons.next = $('<button class="julia-btn julia-next" title="'+origin.env.i18n.next+'">'
        +'    <i class="julia-icon julia-chevron-right"></i>'
        +'</button>');

        origin.env.model.buttons.previous = $('<button class="julia-btn julia-previous" title="'+origin.env.i18n.previous+'">'
        +'    <i class="julia-icon julia-chevron-left"></i>'
        +'</button>');

        origin.env.model.buttons.close = $('<button class="julia-btn julia-close" title="'+origin.env.i18n.close+'">'
        +'    <i class="julia-icon julia-close"></i>'
        +'</button>');

        origin.env.model.buttons.fullscreen = $('<button class="julia-btn julia-fullscreen-toggle">'
        +'    <i class="julia-icon julia-fullscreen-on"></i>'
        +'</button>');

        // Passive info panels
        origin.env.model.panels.fileName = $('<div class="julia-panel julia-file-name">'
        +'    <span>{{file-name}}</span>'
        +'</div>');

        origin.env.model.panels.fileDescription = $('<div class="julia-panel julia-file-description">'
        +'    <span>{{file-description}}</span>'
        +'</div>');

        origin.env.model.panels.summary = $('<div class="julia-panel julia-summary">'
        +'    <span>{{summary}}</span>'
        +'</div>');

        // Compose content DOM object
        origin.env.model.content
        .append([
            origin.env.model.preloader,
        ]);

        // Compose toolbar DOM object

        if( origin.env.last > 0 )
        {
            origin.env.model.toolbar
            .append([
                origin.env.model.buttons.previous,
                origin.env.model.buttons.next,
            ]);
        }

        origin.env.model.toolbar
        .append([
            origin.env.model.buttons.close
        ]);

        // Compose wrapper DOM object
        origin.env.model.wrapper
        .append([
            origin.env.model.toolbar,
            origin.env.model.content
        ]);

        // Compose final DOM object
        origin.env.instance
        .append([
            origin.env.model.wrapper
        ]);

        self.zIndexize();

        origin.env.root.append( origin.env.instance );

        origin.env.fullscreenFrame = document.querySelector('#julia-box-'+origin.env.ID);

        origin.Ui.state(origin.env.instance, '', 'on');

        self.raiseEvent('julia.ui-ready');

        origin.Base.debug({
            'boxInstance': origin.env.instance,
        });
    };




    self.raiseEvent = function(eventName)
    {
        setTimeout( function()
        {
            if( $('#julia-box-'+origin.env.ID).length == 1 )
            {
                $('#julia-box-'+origin.env.ID).trigger({
                    type: eventName,
                });
            }else{
                self.raiseEvent(eventName);
            }
        }, 10);
    };




    self.icon = function(element, remove, add)
    {
        element.find('i')
        .removeClass(remove)
        .addClass(add);
    };




    self.state = function(element, remove, add)
    {
        element.removeClass(remove)
        .addClass(add);
    };




    self.panel = function(element, value)
    {
        element.find('span').text(value);
    };




    self.zIndexize = function()
    {
        var indexHighest = 0;

        $("*").each(function()
        {
            // always use a radix when using parseInt
            var _current = parseInt( $(this).css("z-index"), 10 );

            if( _current > indexHighest )
            {
                indexHighest = _current;
            }
        });

        origin.Base.debug({
            'Highest z-index': indexHighest
        });

        origin.env.instance.css({
            'z-index': indexHighest + 1
        });

        origin.env.model.content.css({
            'z-index': indexHighest + 2
        });

        origin.env.model.toolbar.css({
            'z-index': indexHighest + 3
        });

        origin.env.model.preloader.css({
            'z-index': indexHighest + 4
        });

    };

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

        if( $.inArray(typeof f, ['string', 'function']) > -1 )
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

                origin.env.instance.hide( 75, function()
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
* Suppport utilities
****************************************** */
JuliaBoxItem.prototype._Support = function(origin)
{
    var self = this;




    self.aspect = function(w,h)
    {
        return w>0 && h>0 ? h/w: 0;
    };




    self.isMobile = function()
    {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent) )
        {
            return true;
        }

        return false;
    };




    self.iOS = function()
    {
        if( /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream )
        {
            return true;
        }

        return false;
    };




    self.extension = function()
    {
        e = (/[.]/.exec( origin.env.item.attr( origin.env.attr ) ) ) ? /[^.]+$/.exec( origin.env.item.attr( origin.env.attr ) ) : ['', 'undefined', ''];
        return e[0];
    };




    self.iframe = function( iframeSrc, serviceClass )
    {
        return $('<div class="julia-iframe-container julia-box-'+serviceClass+'"><iframe frameborder="0" width="100%" height="100%" allowfullscreen src="' + iframeSrc + '"/></div>');
    };




    self.initiator = function()
    {
        l = origin.env.root.find('[data-julia-box-initiator]').length;
        return !l ? 0: l;
    };




    self.isUrlValid = function(url)
    {
        return url.match("^\/");
    }




    self.isDOMElement = function( obj )
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
};

/* *****************************************
* Julia HTML5 lightbox
* Media collection processing
****************************************** */
JuliaBoxItem.prototype._Media = function(origin)
{
    var self = this;




    self.mediaService = function( target )
    {
        for( i in origin.env.services )
        {
            if( !!origin.env.services[i].test( target ) )
            {
                return i;
            }
        }

        if( origin.Support.isUrlValid( target ) )
        {
            return 'iframe';
        }

        return 'inline';
    };




    self.getMedia = function()
    {
        var mediaService = 'inline';
        var mediaStr = '';

        if( typeof origin.env.item.attr( origin.env.attr ) !== undefined && origin.env.item.attr( origin.env.attr ) !== false )
        {
            mediaStr = origin.env.item.attr( origin.env.attr );
            mediaService = self.mediaService( mediaStr );
        }


        switch( mediaService )
        {
            case 'image':

                origin.env.itemType = 'image';
                origin.env.mediaObj = $('<img src="'+mediaStr+'?_c='+Math.floor((Math.random()*10000000)+1)+'" alt="'+mediaStr+'">');

            break; case 'youtube':

                var matches = origin.env.services[mediaService].exec( mediaStr );
                origin.env.itemType = 'iframe';

                if( !!matches )
                {
                    iframeSrc = 'https://www.youtube' + (matches[2] || '') + '.com/embed/' + matches[4];

                    if( origin.env.videoAutoplay === true )
                    {
                        iframeSrc += '?autoplay=1';
                    }

                    origin.env.mediaObj = origin.Support.iframe( iframeSrc, mediaService );
                }

            break; case 'vimeo':

                var matches = origin.env.services[mediaService].exec( mediaStr );
                origin.env.itemType = 'iframe';

                if( !!matches )
                {
                    iframeSrc = 'https://player.vimeo.com/video/' + matches[3];

                    if( origin.env.videoAutoplay === true )
                    {
                        iframeSrc += '?autoplay=1';
                    }

                    origin.env.mediaObj = origin.Support.iframe( iframeSrc, mediaService );
                }

                break; case 'googleMaps':

                    var matches = origin.env.services[mediaService].exec( mediaStr );
                    origin.env.itemType = 'iframe';

                    if( !!matches )
                    {
                        iframeSrc = 'https://www.google.' + matches[3] + '/maps?' + matches[6];
                        iframeSrc += matches[6].indexOf('layer=c') > 0 ? '&amp;output=svembed': '&amp;output=embed';

                        origin.env.mediaObj = origin.Support.iframe( iframeSrc, mediaService );
                    }

                break; case 'instagram':

                    var matches = origin.env.services[mediaService].exec( mediaStr );
                    origin.env.itemType = 'iframe';

                    if( !!matches )
                    {
                        iframeSrc = 'https://www.instagram.com/p/' + matches[2] + '/embed/';

                        origin.env.mediaObj = origin.Support.iframe( iframeSrc, mediaService );
                    }

            break; case 'facebookVideo':

                var matches = origin.env.services[mediaService].exec( mediaStr );
                origin.env.itemType = 'iframe';

                if( !!matches )
                {
                    iframeSrc = 'https://www.facebook.com/plugins/video.php?href=' + mediaStr;

                    if( origin.env.videoAutoplay === true )
                    {
                        iframeSrc += '&autoplay=1&show-captions=1';
                    }

                    origin.env.mediaObj = origin.Support.iframe( iframeSrc, mediaService );
                }

                break; case 'iframe':

                    var matches = origin.env.services[mediaService].exec( mediaStr );
                    origin.env.itemType = 'iframe';

                    if( !!matches || !!origin.Support.isUrlValid( mediaStr ) )
                    {
                        iframeSrc = mediaStr;
                        origin.env.mediaObj = origin.Support.iframe( iframeSrc, mediaService );
                    }


            break; default:

                origin.env.itemType = 'inline';

                if( origin.Support.isDOMElement( $(mediaStr) ) )
                {
                    origin.env.mediaObj = $('<div class="julia-inline-container">'+$(mediaStr).html()+'</div>');
                }else{
                    origin.env.mediaObj = $('<div class="julia-inline-container julia-error">'+origin.env.i18n.errorInline+'</div>');
                }
        }



        // Create media object
        origin.env.model.content.append( origin.env.mediaObj );

        if( origin.env.itemType === 'inline' )
        {

            self.resize();
            origin.Ui.state( origin.env.model.preloader, 'on', '' );
            origin.Ui.state( origin.env.mediaObj, '', 'on' );

        }else if( origin.env.itemType === 'image' )
        {
            origin.env.mediaObj.on('load error', function(e)
            {
                if( e.type == 'error' || ( $(this).width() === "undefined" || $(this).width() === 0 ) )
                {
                    origin.env.mediaObj = $('<div class="julia-inline-container julia-error">'+origin.env.i18n.errorImage+'</div>');
                    origin.env.model.content.html( origin.env.mediaObj );
                }

                self.resize();
                origin.Ui.state( origin.env.model.preloader, 'on', '' );
                origin.Ui.state( origin.env.mediaObj, '', 'on' );
            });

        }else{

            loaderEventHandler = origin.env.mediaObj.find('iframe');

            loaderEventHandler.on('load error', function(e)
            {
                if( e.type == 'error' )
                {
                    origin.env.mediaObj = $('<div class="julia-inline-container julia-error">'+origin.env.i18n.errorIframe+'</div>');
                    origin.env.model.content.html( origin.env.mediaObj );
                }

                self.resize();
                origin.Ui.state( origin.env.model.preloader, 'on', '' );
                origin.Ui.state( origin.env.mediaObj, '', 'on' );
            });
        }
    };




    self.resize = function()
    {
        mediaSize = self.setSize();

        origin.env.mediaObj.width( mediaSize[0] );
        origin.env.mediaObj.height( mediaSize[1] );
        origin.env.mediaObj.css({'margin-top': (mediaSize[3] - mediaSize[1])/2 + 'px' });

        origin.Base.debug({
            'extension': origin.Support.extension(),
            'item': origin.env.item,
            'itemType': typeof origin.env.item,
            'mediaObj': origin.env.mediaObj,
            'mediaSize': mediaSize
        });
    };




    self.setSize = function()
    {
        var ww = $(window).width();
        var wh = $(window).height();
        var tw = origin.env.mediaObjSize[0];
        var th = origin.env.mediaObjSize[1];

        if( ( tw == 0 || th == 0 ) && !origin.env.mediaObj.hasClass('julia-error') )
        {
            tw = origin.env.itemType === 'iframe' || origin.env.itemType === 'inline'  ? 1280: origin.env.mediaObj.width();
            th = origin.env.itemType === 'iframe' || origin.env.itemType === 'inline' ? 720: origin.env.mediaObj.height();
            origin.env.mediaObjSize = [tw,th];
        }

        ta =origin.Support.aspect( tw, th );

        if( tw >= ww )
        {
            tw = ww - 20;

            if( ( origin.env.itemType === 'iframe' || origin.env.itemType === 'inline' ) && tw > origin.env.iframeWidthLimit )
            {
                tw = origin.env.iframeWidthLimit;
            }

            th = tw * ta;
        }

        if( th >= (wh - 20) )
        {
            th = (wh - 10);
            tw = th / ta;
        }

        mediaService = self.mediaService( origin.env.item.attr( origin.env.attr ) );

        // BAD BAD FIX!!!
        if( mediaService === 'instagram' )
        {
            tw = th - 100;

            if( ww < 400 && ww < wh ) {
                tw = tw + 100;
                th = th + 100;
            }
        }

        // Normalize numbers
        tw = parseInt( tw, 10 );
        th = parseInt( th, 10 );

        origin.Base.debug({
            'window': [ ww, wh ],
            'mediaObj': [ tw, th ]
        });

        return [tw, th, ww, wh];
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
            if( $(e.target).is('.julia-content') &&  origin.options.overlayActive === true )
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
