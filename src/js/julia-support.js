/* *****************************************
* JuliaBox HTML5 lightbox
* Suppport utilities
****************************************** */
JuliaBox.prototype._Support = function(origin)
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
