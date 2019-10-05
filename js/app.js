import $ from 'jquery';

const TopSlider = (() => {

    const slider = $('.slider-top');
    const intervalTimeout = 3000;
    const animationTimeout = 1000;
    let intervalID = null;

    const stop = () => {

        clearInterval(intervalID);
        intervalID = null;
    };

    const start = () => {

        if (!intervalID) {

            intervalID = setInterval(
                change_slide,
                intervalTimeout
            );
        }
    };

    const wrap = () => {

        const sliderTopItemNotClone = slider.find('.slider-top-item:not(.clone)');

        if (set_slider_at() >= sliderTopItemNotClone.length) {

            set_slider_at(0, true, false);
        }
    };

    const change_slide = () => {

        set_slider_at(
            set_slider_at() + 1, // Se não tem position ele vai calcular automaticamente
            true
        );
    };

    const update_bullets = () => {

        const sliderTopBullets = slider.find('.slider-top-bullet');
        sliderTopBullets.removeClass('active');
        sliderTopBullets.eq(set_slider_at()).addClass('active');
    };

    const calculate_new_position = (sliderTopItem) => {

        let sliderItemPositionLeft = sliderTopItem.position().left;
        let newPosition = Math.round(Math.abs(sliderItemPositionLeft) / slider.width() - 1);

        return newPosition;
    }

    const set_slider_at = (position, isTopWrap, isToAnimate) => {

        const sliderTopItem = slider.find('.slider-top-item');

        if (position == undefined) {
            return calculate_new_position(sliderTopItem);
        }

        const animationProperties = { left: -(1 + position) * slider.width() + 'px' };

        if (isToAnimate == undefined) {
            isToAnimate = true;
        }

        sliderTopItem.animate(animationProperties, isToAnimate ? animationTimeout : 0).promise().then(() => {

            update_bullets();

            if (isTopWrap) {
                wrap();
            }
        });
    };

    const setup = () => {

        const sliderTopItems = slider.find('.slider-top-item');

        sliderTopItems.each((currentIndex) => {

            const topSliderBullet = $('<li class="slider-top-bullet" />');

            if (currentIndex == 0) {
                topSliderBullet.addClass('active');
            }

            slider.find('.slider-top-bullet-set').append(topSliderBullet);

            topSliderBullet.on('click', () => {

                set_slider_at(currentIndex, true);

            }).on('mouseenter', () => {

                stop();

            }).on('mouseleave', () => {

                start();
            });
        });

        const slideSet = slider.find('.slider-top-set');

        const first = slideSet.children(':first-child').clone();
        first.addClass('clone');
        slideSet.append(first);

        const last = slideSet.children(':last-child').clone();
        last.addClass('clone');
        slideSet.prepend(last);

        sliderTopItems.css('left', '-=' + slider.width() + 'px');
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

const Accordion = (() => {

    const removeActiveClass = () => {

        $('.accordion-item-content').removeClass('active').hide('slow');
        $('.fa-arrow-up').attr('style', 'display: none;');
        $('.fa-arrow-down').attr('style', 'display: block;');
    };

    const changeArrowsTo = (accordionLink, down, up) => {

        accordionLink.children('.fa-arrow-down').attr('style', `display: ${down};`);
        accordionLink.children('.fa-arrow-up').attr('style', `display: ${up};`);
    };

    const init = () => {

        $(".accordion-item").on('click', function () {

            const accordionItem = $(this);
            const accordionItemContent = accordionItem.children('.accordion-item-content');
            const accordionLink = accordionItem.children('.accordion-link');

            if (accordionItemContent.hasClass('active')) {

                removeActiveClass();

                changeArrowsTo(accordionLink, 'block', 'none');

            } else {

                removeActiveClass();

                changeArrowsTo(accordionLink, 'none', 'block');

                accordionItemContent.addClass('active').show('slow');
            }
        });
    };

    return {
        init: init
    };
})();

const FloatFormGroup = (() => {

    const init = () => {

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
    Accordion.init();

    // Floating labels
    FloatFormGroup.init();
});
