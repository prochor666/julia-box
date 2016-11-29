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
