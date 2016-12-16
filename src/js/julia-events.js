/* *****************************************
* JuliaBox HTML5 lightbox
* DOM & api events
****************************************** */
JuliaBox.prototype._Events = function(origin)
{
    var self = this;




    self.init = function()
    {
        // Item handler
        origin.env.item.on('click', function(e)
        {
            e.preventDefault();

            origin.env.root.css({
                'overflow': 'hidden'
            });

            origin.Ui.create();

            origin.Events.ui();

            $('#julia-box-'+origin.env.ID).on( 'julia.ui-ready' , function()
            {
                origin.Media.getMedia();
                origin.env.item.addClass('julia-box-initiator');

                if(origin.options.onCreate !== false)
                {
                    origin.Callback.fn(origin.options.onCreate);
                }
            });

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
