import $ from 'jquery';

const TopSlider = (() => {

    const slider = $('.top-slider');
    const intervalTimeout = 3000;
    const animationTimeout = 1000;
    let intervalID = null;

    const stop = () => {
        clearInterval(intervalID);
        intervalID = null;
    };

    const start = () => {
        intervalID = setInterval(
            change_slide,
            intervalTimeout
        );
    };

    const wrap = () => {

        const topSliderItemNotClone = slider.find('.top-slider-item:not(.clone)');

        if (position() >= topSliderItemNotClone.length) {

            position(0);

        } else if (position() < 0) {

            position(topSliderItemNotClone.eq(-1).index() - 1);
        }
    };

    const change_slide = () => {
        position(
            position() + 1, // Se não tem position ele vai calcular automaticamente
            wrap
        );
    };

    const update_bullets = () => {

        const topSliderBullets = slider.find('.top-slider-bullet');
        topSliderBullets.removeClass('active');
        topSliderBullets.eq(position()).addClass('active');
    };

    const position = (position, callback) => {

        const slider = $('.top-slider');
        const topSliderItem = slider.find('.top-slider-item');

        if (position == undefined) {

            let sliderItemPositionLeft = topSliderItem.position().left;
            let newPosition = Math.round(Math.abs(sliderItemPositionLeft) / slider.width() - 1);

            return newPosition;
        }

        topSliderItem.animate({ left: -(1 + position) * slider.width() + 'px' }, true ? animationTimeout : 0)
            .promise().then(
                () => {
                    update_bullets();
                    if (callback !== undefined) {
                        callback();
                    }
                }
            );
    };

    const setup = () => {

        const topSliderItems = slider.find('.top-slider-item');

        topSliderItems.each((currentIndex) => {

            const topSliderBullet = $('<li class="top-slider-bullet" />');

            if (currentIndex == 0) {
                topSliderBullet.addClass('active');
            }

            slider.find('.top-slider-bullet-set').append(topSliderBullet);

            topSliderBullet.on('click', () => {

                position(currentIndex, wrap);

            }).on('mouseenter', () => {

                stop();

            }).on('mouseleave', () => {

                start();
            });
        });

        const slideSet = slider.find('.top-slider-set');
        const first = slideSet.children(':first-child').clone();
        const last = slideSet.children(':last-child').clone();

        first.addClass('clone');
        last.addClass('clone');

        slideSet.append(first);
        slideSet.prepend(last);

        topSliderItems.css('left', '-=' + slider.width() + 'px');

    };

    const init = () => {

        setup();

        start();
    };

    return {
        init: init
    };
})();

const MiddleSlider = (() => {

    const setup_next_arrow = () => {

        $('.next').on('click', function () {
            let currentImg = $('.active-slider');
            let nextImg = currentImg.next();

            if (nextImg.length > 0) {
                currentImg.removeClass('active-slider').css('z-index', -10);
                nextImg.addClass('active-slider').css('z-index', 10);
            }
        });
    };

    const setup_prev_arrow = () => {

        $('.prev').on('click', function () {
            let currentImg = $('.active-slider');
            let prevImg = currentImg.prev();

            if (prevImg.length > 0) {
                currentImg.removeClass('active-slider').css('z-index', -10);
                prevImg.addClass('active-slider').css('z-index', 10);
            }
        });
    };

    const init = () => {

        setup_next_arrow();

        setup_prev_arrow();
    };

    return {
        init: init
    };
})();

$(function () {

    // Anchor to the middle section
    $('.slide-down-to').on('click', () => {
        $('.container-slider-middle')[0].scrollIntoView({ behavior: 'smooth' });
    });

    // Slider top
    TopSlider.init();

    // Slider middle
    MiddleSlider.init();

    // Accordion
    $(".accordion-item").on('click', function () {

        const accordionItem = $(this);
        const accordionItemContent = accordionItem.children('.accordion-item-content');
        const accordionLink = accordionItem.children('.accordion-link');

        const removeActiveClass = () => {

            $('.accordion-item-content').removeClass('active').hide('slow');
            $('.fa-arrow-up').attr('style', 'display: none;');
            $('.fa-arrow-down').attr('style', 'display: block;');
        };

        const changeArrowsTo = (down, up) => {

            accordionLink.children('.fa-arrow-down').attr('style', `display: ${down};`);
            accordionLink.children('.fa-arrow-up').attr('style', `display: ${up};`);
        };

        if (accordionItemContent.hasClass('active')) {

            removeActiveClass();

            changeArrowsTo('block', 'none');

        } else {

            removeActiveClass();

            changeArrowsTo('none', 'block');

            accordionItemContent.addClass('active').show('slow');
        }
    });

    // Form
    $(".float-form-group").each(function () {

        const floatFormGroup = $(this);
        const floatField = floatFormGroup.children('.floatField');

        floatField.on('focus', () => {
            floatFormGroup.addClass('active');
        });

        floatField.on('blur', () => {

            if (!floatField.val()) {

                floatField.addClass("invalid");
                floatFormGroup.removeClass('active');

            } else {

                floatField.removeClass("invalid");
            }
        });
    });

});
