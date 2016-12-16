/* *****************************************
* JuliaBox HTML5 lightbox
* Media collection processing
****************************************** */
JuliaBox.prototype._Media = function(origin)
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
