import $ from 'jquery';

$(function () {
    $('.next').on('click', function () {
        var currentImg = $('.active');
        var nextImg = currentImg.next();

        if (nextImg.length > 0) {
            currentImg.removeClass('active').css('z-index', -10);
            nextImg.addClass('active').css('z-index', 10);
        }
    });

    $('.prev').on('click', function () {
        var currentImg = $('.active');
        var prevImg = currentImg.prev();

        if (prevImg.length > 0) {
            currentImg.removeClass('active').css('z-index', -10);
            prevImg.addClass('active').css('z-index', 10);
        }
    });
});

