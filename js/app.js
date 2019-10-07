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

        sliderTopItem.animate(animationProperties, isToAnimate ? animationTimeout : 0).promise().then(function () {

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

            topSliderBullet.on('click', function () {

                set_slider_at(currentIndex, true);

            }).on('mouseenter', function () {

                stop();

            }).on('mouseleave', function () {

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

const Accordion = (() => {

    const removeActiveClass = () => {

        $('.accordion-item-content').removeClass('active').hide('slow');
        $('.fa-arrow-up').attr('style', 'display: none;');
        $('.fa-arrow-down').attr('style', 'display: block;');
    };

    const changeArrowsTo = (accordionLink, arrow_down_display, arrow_up_display) => {

        accordionLink.children('.fa-arrow-down').attr('style', `display: ${arrow_down_display};`);
        accordionLink.children('.fa-arrow-up').attr('style', `display: ${arrow_up_display};`);
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

            floatField.on('focus', function () {
                floatFormGroup.addClass('active');
            });

            floatField.on('blur', function () {

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

const FlexSliderMiddle = (() => {

    const init = () => {

        const totalSliderItems = $(".flex-slider-item").length - 1;
        let firstSliderVisible = 0;
        let lastSliderVisible = 2;

        $(".flex-next-arrow").on('click', function () {

            let isToWrap = (lastSliderVisible == totalSliderItems);
            let threshold = lastSliderVisible + 3;

            $(".flex-slider-item").removeClass("active").each(function (index, element) {

                const sliderItem = $(element);
                const conditionToAddClass = (isToWrap && index <= 2) || (index > lastSliderVisible && index <= threshold);

                if (conditionToAddClass) {
                    sliderItem.addClass("active");
                }
            });

            if (isToWrap) {

                firstSliderVisible = 0;
                lastSliderVisible = 2;

            } else {

                firstSliderVisible = lastSliderVisible + 1;
                lastSliderVisible = threshold;
            }

            console.log(`firstSliderVisible: ${firstSliderVisible}`);
            console.log(`lastSliderVisible: ${lastSliderVisible}`);
        });

        $(".flex-prev-arrow").on('click', function () {

            let isToWrap = (firstSliderVisible == 0);
            let startAt = isToWrap ? (totalSliderItems - 3) : firstSliderVisible - 3;
            let threshold = startAt + 3;

            console.log(`isToWrap: ${isToWrap}`);
            console.log(`startAt: ${startAt}`);
            console.log(`threshold: ${threshold}`);
            console.log(`firstSliderVisible: ${firstSliderVisible}`);
            console.log(`lastSliderVisible: ${lastSliderVisible}`);

            $(".flex-slider-item").removeClass("active").each(function (index, element) {

                const sliderItem = $(element);
                const conditionToAddClass = (isToWrap && index >= startAt && index < threshold);

                if (conditionToAddClass) {
                    sliderItem.addClass("active");
                }

                const conditionWhenNotToWrap = (!isToWrap && index >= startAt && index < threshold);

                if (conditionWhenNotToWrap) {
                    sliderItem.addClass("active");
                }
            });

            // if (!isToWrap) {

            //     firstSliderVisible = startAt + 1;
            //     lastSliderVisible = threshold;

            // } else {

            // }
        });
    };

    return {
        init: init
    };
})();

$(() => {

    // Anchor to the middle section
    $('.slide-down-to').on('click', function () {
        $('.flex')[0].scrollIntoView({ behavior: 'smooth' });
    });

    // Slider top
    TopSlider.init();

    // FlexSliderMiddle
    FlexSliderMiddle.init();

    // Accordion
    Accordion.init();

    // Floating labels
    FloatFormGroup.init();

});
