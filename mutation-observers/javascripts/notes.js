
// load content
(function ($) {
    $.get('_content.html', function (data) {
        $(document.body).append(data);
        var $steps = $('.step');

        // Add proper IDs to all steps tha don't have one
        $steps.each(function (i) {
            if ($(this).attr('id') == undefined) {
                $(this).attr('id', 'step-' + (i+1));
            }
        });

        // multipurpose
        function select($step) {
            $.address.value('/' + $step.attr('id'));
        }

        // next
        $(document.body).hammer({ swipe_velocity: 0.2 }).on('swipeleft', function (event) {
            event.gesture.preventDefault();
            event.gesture.stopDetect();
            var currentIndex = $steps.index($('.selected')[0]);
            if (currentIndex + 1 < $steps.length) {
                select($steps.eq(currentIndex+1));
            }
        });

        // previous
        $(document.body).hammer({ swipe_velocity: 0.2 }).on('swiperight', function (event) {
            event.gesture.preventDefault();
            event.gesture.stopDetect();
            var currentIndex = $steps.index($('.selected')[0]);
            if (currentIndex - 1 >= 0) {
                select($steps.eq(currentIndex-1));
            }
        });

        // Handle clicks
        $(document.body).on('click', '.step', function (event) {
            event.preventDefault();
            select($(this));
        });

        // Handle changes from remote
        $.address.change(function () {
            var stepId = $.address.value().replace(/^\//, '');
            $steps.filter('.selected').removeClass('selected');
            $('#'+stepId).addClass('selected');
            document.body.scrollTop = $('.selected').offset().top - 60;
        });
    });
})(jQuery);
