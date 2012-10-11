(function ($) {
    $.fn.extend({
        bobsled: function (extend) {
            var options = $.extend({
                minFrameTime: 10, // seconds
                minShowTime: 40, // seconds
                stopTimerOnClick: false,  // when set to false, a click will reset the timer.  when set to true, a click will stop the timer
                timer: undefined,

                offset : 'data-bobsled-offset',
                
                select : {
                    owner  : '.slider',
                    frame  : '.slider-frame',
                    dots   : '.slider-selector-item'
                },
                
                c : {
                    direction : ['before', 'after'],
                    numbers   : ['one', 'two', 'three'],
                    active    : 'active'
                },
                
                defaultFrame : 0,
                activeFrame  : 0
            }, extend),
            
            
            setOffset = function() {
                var position = -1 * options.activeFrame;
                
                $(options.select.frame, that).each(function() {
                    $(this).attr(options.offset, position++);
                });
                
                $(that).bobsledRender( options );
            },
            
            
            setupTimer = function() {
                var time  = options.minShowTime / count,
                    time  = (time < options.minFrameTime) ? options.minFrameTime : time;
                    
                if (options.timer !== undefined)
                    clearTimeout(options.timer);
                                
                options.timer = setTimeout(function () {
                    options.activeFrame = (options.activeFrame >= count - 1) ? 0 : options.activeFrame + 1;
                    
                    setOffset();
                    setupTimer();
                    
                }, time * 1000);
            },
            
            that = this,
            
            count = $(options.select.dots, this).length;
            options.activeFrame = options.defaultFrame;
            setOffset();
            setupTimer();
            
            
            // Non mobile, mouse interactions
            
            var clickAction = function (e) { 
                options.activeFrame = $(this).index();
                setOffset();
                
                if (!options.stopTimerOnClick) 
                    setupTimer();  
            }
            
            $(options.select.frame, this).bind('click', clickAction);
            $(options.select.dots,  this).bind('click', clickAction); 
            
            // Mobile, touch interactions
            if (jQuery.jGestures) {
                var changeFrame = function (e) {
                    options.activeFrame += e.data.direction;    
                    
                    if (options.activeFrame < 0)      options.activeFrame = count - 1;
                    if (options.activeFrame >= count) options.activeFrame = 0;
                    
                    setOffset();
                    setupTimer();
                }

                $(options.select.frame, this).bind('swipeleft',  { direction:  1 }, changeFrame, false);
                $(options.select.frame, this).bind('swiperight', { direction: -1 }, changeFrame, false);
            }
            return this;
        },
        
        bobsledRender: function (options) {
            return this.each(function() {                
                var offset = $($(options.select.frame, this).get(0)).attr(options.offset);
                
                $(options.select.frame, this).each(function(index) {
                    var position = $(this).attr(options.offset);
                    
                    $(this).removeClass(options.c.direction.join(' ') + ' ' + options.c.numbers.join(' ') + ' ' + options.c.active);
                
                    if (position ==  0) $(this).addClass(options.c.active); 
                    
                    
                    if (position == -1) $(this).addClass(options.c.direction[0] + ' ' + options.c.numbers[0]); 
                    if (position ==  1) $(this).addClass(options.c.direction[1] + ' ' + options.c.numbers[0]); 
                    
                    if (position == -2) $(this).addClass(options.c.direction[0] + ' ' + options.c.numbers[1]); 
                    if (position ==  2) $(this).addClass(options.c.direction[1] + ' ' + options.c.numbers[1]); 
                    
                    if (position <= -3) $(this).addClass(options.c.direction[0] + ' ' + options.c.numbers[2]);
                    if (position >=  3) $(this).addClass(options.c.direction[1] + ' ' + options.c.numbers[2]);
                });
                
                
                $(options.select.dots, this).removeClass(options.c.active);
                $($(options.select.dots, this)[Math.abs(offset)]).addClass(options.c.active);
            });
        }    
    })
})(jQuery);