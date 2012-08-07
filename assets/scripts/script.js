$(window).ready( function () { 
    LoadData('mustache/data.json');
    
    $('[data-vectorectus]').vectorectus('assets/scripts/data/vectorectus.json');
});

var LoadData = function (source) {
    $.getJSON(source, function(data) { 
        FillContent(data, '#work', SetupWorkSlider);
        FillContent(data, '#timeline', SetupTimeline);
    })
};

var FillContent = function (data, context, callback) {
    var template = $(context).data('template');
    $.get(template, function(temp){ 
        $(context).append($.mustache(temp, data));
        callback();
    });
};

var SetupWorkSlider = function () {
};

var SetupTimeline = function() {
};