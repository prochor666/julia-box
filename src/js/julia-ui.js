/* *****************************************
* JuliaBox HTML5 lightbox
* User interface
* complete DOM model
****************************************** */
JuliaBox.prototype._Ui = function(origin)
{
    var self = this;




    self.create = function()
    {
        if( origin.env.instance.lemgth > 0 )
        {
            origin.env.instance.remove();
        }

        // Main container
        origin.env.instance = $('<div class="julia-box julia-fullscreen-off julia-box-'+origin.env.collectionID+'" id="julia-box-'+origin.env.ID+'">'
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

        $(":visible").each(function()
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

        // Fix for highest 32bit integer
        if( indexHighest >= 2147483606 )
        {
            indexHighest = indexHighest - 5;
        }

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
