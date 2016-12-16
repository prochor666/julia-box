/* *****************************************
* JuliaBox HTML5 lightbox
* Callback
* event callbacks
****************************************** */
JuliaBox.prototype._Callback = function(origin)
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

            f( origin.env );

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
