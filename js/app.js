import $ from 'jquery';

$(function () {

    $('.gotoMiddleSection').on('click', () => {
        $('.content-slider-middle')[0].scrollIntoView({ behavior: 'smooth' });
    });

    $('.top-slider').each(function () {

        var topSliderIntervalID = null;

        const topSliderItem = $(this).find('.top-slider-item');

        topSliderItem.each((currentIndex) => {

            const topSliderBullet = $('<li class="top-slider-bullet" />');

            if (currentIndex == 0) {
                topSliderBullet.addClass('active');
            }

            $(this).find('.top-slider-bullet-set').append(topSliderBullet);

            topSliderBullet.on('click', () => {

                sliderPosition(currentIndex, true, wrap);

            }).on('mouseenter', () => {

                stopSlider();

            }).on('mouseleave', () => {

                startSlider();
            });
        });

        const slideSet = $(this).find('.top-slider-set');
        const first = slideSet.children(':first-child').clone();
        const last = slideSet.children(':last-child').clone();

        first.addClass('clone');
        last.addClass('clone');

        slideSet.append(first);
        slideSet.prepend(last);

        topSliderItem.css('left', '-=' + $(this).width() + 'px');

        const sliderPosition = (position, animate, callback) => {

            const topSliderItem = $(this).find('.top-slider-item');

            if (position == undefined) {
                var sliderItemPositionLeft = topSliderItem.position().left;
                return Math.round(Math.abs(sliderItemPositionLeft) / $(this).width() - 1);
            }

            if (animate == undefined) {
                animate = true;
            }

            topSliderItem.animate({ left: -(1 + position) * $(this).width() + 'px' }, animate ? 1000 : 0)
                .promise().then(
                    () => {
                        updateBullets();
                        if (callback) {
                            callback();
                        }
                    }
                );
        };

        const startSlider = () => {
            topSliderIntervalID = setInterval(
                switchSlides,
                2000
            );
        };

        const switchSlides = () => {
            sliderPosition(
                sliderPosition() + 1,
                true,
                wrap
            );
        };

        const stopSlider = () => {
            clearInterval(topSliderIntervalID);
            topSliderIntervalID = null;
        };

        const wrap = () => {

            const topSliderItemNotClone = $(this).find('.top-slider-item:not(.clone)');

            if (sliderPosition() >= topSliderItemNotClone.length) {

                sliderPosition(0, false);

            } else if (sliderPosition() < 0) {

                sliderPosition(topSliderItemNotClone.eq(-1).index() - 1, false);
            }
        };

        const updateBullets = () => {

            const topSliderBullets = $(this).find('.top-slider-bullet');
            topSliderBullets.removeClass('active');
            topSliderBullets.eq(sliderPosition()).addClass('active');
        };

        startSlider();
    });
});


$(function () {
    $('.next').on('click', function () {
        var currentImg = $('.active-slider');
        var nextImg = currentImg.next();

        if (nextImg.length > 0) {
            currentImg.removeClass('active-slider').css('z-index', -10);
            nextImg.addClass('active-slider').css('z-index', 10);
        }
    });

    $('.prev').on('click', function () {
        var currentImg = $('.active-slider');
        var prevImg = currentImg.prev();

        if (prevImg.length > 0) {
            currentImg.removeClass('active-slider').css('z-index', -10);
            prevImg.addClass('active-slider').css('z-index', 10);
        }
    });
});



