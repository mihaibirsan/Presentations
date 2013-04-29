
// load content
(function ($) {
    $.get('content.html', function (data) {
        $(document.body).append(data);
        impress().init();
        prettyPrint();
    });
})(jQuery);

// debugging
(function ($) {
    var $body = $('body');
    var $debug = $('<div id="debug">');
    $('body').append($debug);

    function handleResize() {
        var w = $body.width();
        var h = $body.height();
        var s = Math.min(w/1200, h/800);
        $debug.css('WebkitTransform', 'scale(' + s + ')');
    }

    $(window).resize(handleResize);

    handleResize();
})(jQuery);
