$(window).ready( function () { 
    LoadData('mustache/data.json');
    menuScrollSetup();
    
    $('[data-vectorectus]').vectorectus('assets/scripts/data/vectorectus.json');
});


var menuScrollSetup = function() {
    $('.heading-nav-work').click (function() { 
        $("html, body").animate({'scrollTop' : $('#work').offset().top }, 500);
    });
    
    $('.heading-nav-history').click (function() {        
        $("html, body").animate({'scrollTop' : $('#history').offset().top }, 500);
    });
    
    $('.heading-nav-contact').click (function() {        
        $("html, body").animate({'scrollTop' : $('#contact').offset().top }, 500);
    });
};



var LoadData = function (source) {
    $.getJSON(source, function(data) { 
        FillContent(data, '#work',     SetupWorkSlider);
        FillContent(data, '.partner',  function (){});
        FillContent(data, '#timeline', SetupTimeline);
    })
};

var FillContent = function (data, context, callback) {
    var template = $(context).data('template');
    
    $.get(template, function(temp){ 
        $(context).append($.mustache(temp, data));
        callback.apply(this, [template]);
    });
};

var SetupWorkSlider = function () {
    $('.slider').bobsled();
    
};

var SetupTimeline = function() {
    HighlightOnScroll();
};


var HighlightOnScroll = function () {  
    if (Modernizr.touch || $(window).height() < 580) {
        $('.timeline-item').removeClass('is-hidden').addClass('touch');
        
    } else {
        $($('.timeline-item')[0]).addClass('scroll'); 
         
        $(window).scroll(function(e) {
            var htmlOffset      = Math.abs( $("html").offset().top ),
                containerOffset = $("#history").position().top,
                windowHeight    = $(window).height(),
                offset          = htmlOffset + (windowHeight / 4);
                
            
            if ( offset > containerOffset) {
                var closest = null,
                    timelineOffsets = [],
                    itemIndex = 0;
                
                $('.timeline-item').each(function() {  
                    timelineOffsets.push($(this).position().top - ($(this).height() / 1.8) );  
                });
                
                $.each(timelineOffsets, function(e){
                    if (closest == null || Math.abs(this - offset) < Math.abs(closest - offset)) {
                        closest = this;
                        itemIndex = e;
                    }
                });
                   
                $('.timeline-item:lt(' + itemIndex + ')').removeClass('is-hidden')
                $($('.timeline-item').removeClass('scroll').get(itemIndex)).addClass('scroll');           
            } 
       }); 
    }
};