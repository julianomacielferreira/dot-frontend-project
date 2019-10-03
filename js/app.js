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


$(document).ready(() => {
    $('.slider').each(function () {
        var slideSwitcherIntervalID = null;

        // Add a new bullet for each slide. Notice how we do this before cloning the first and last sides. If we were to do otherwise, we'd end up with 2 extra bullets.
        $(this).find('.slide').each((index) => {
            const bullet = $('<li class="bullet" />');
            if (index == 0) bullet.addClass('active')

            $(this).find('.bullet-set').append(bullet);
        })

        const slideSet = $(this).find('.slide-set'),
            first = slideSet.children(':first-child').clone(),
            last = slideSet.children(':last-child').clone();

        //We add this class so that, in the future, we may know which slides are actually clones and which are the originals
        first.addClass('clone');
        last.addClass('clone');

        //Add the clones to the rest of the slides
        slideSet.append(first); //The clone of the first slide is added to the end
        slideSet.prepend(last);// The clone of the last slide is added to the beggining

        $(this).find('.slide').css('left', '-=' + $(this).width() + 'px'); //Since we have added the clone of the last slide to the front, we must offset them to the left so that the first slide that is shown isn't the said clone, but the proper first slide that is technimally the second one now.

        const sliderPosition = (position, animate, callback) => {
            if (position == undefined)
                return Math.round(Math.abs($(this).find('.slide').position().left) / $(this).width() - 1);
            if (animate == undefined) animate = true

            $(this)
                .find('.slide')
                .animate(
                    { left: -(1 + position) * $(this).width() + 'px' },
                    animate ? 1000 : 0
                )
                .promise().then(
                    () => { // This gets executed right after the animation is done
                        updateBullets()
                        if (callback) callback()
                    }
                );
        },
            startSlider = function () {
                //starting the loop and saving its ID into a variable We need the loop's ID so we can stop it when we will needed to
                slideSwitcherIntervalID = setInterval(
                    switchSlides,
                    3000 //switch slides every 3 seconds
                );
            },
            switchSlides = function () {
                sliderPosition(
                    sliderPosition() + 1, // Replace + with - if you want it to automatically slide left instead,
                    true,
                    wrap
                );
            },
            stopSlider = function () {
                clearInterval(slideSwitcherIntervalID);
                slideSwitcherIntervalID = null;
            },
            wrap = () => {
                if (sliderPosition() >= $(this).find('.slide:not(.clone)').length)
                    sliderPosition(0, false);
                else if (sliderPosition() < 0)
                    sliderPosition($(this).find('.slide:not(.clone)').eq(-1).index() - 1, false);
            },
            updateBullets = () => {
                const bullets = $(this).find('.bullet');

                bullets.removeClass('active');
                bullets.eq(sliderPosition()).addClass('active');
            }

        startSlider();
    })
})

