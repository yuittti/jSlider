;(function ($) {

    $.fn.jSlider = function(options){

        // Set default values of sliding speed and delay of slides changing
        // And set new values if it was specified on plugin call
        var settings = $.extend({
            slidingTime: 500,
            rotateDelay: 2000
        }, options);

        var slidingTime = settings.slidingTime,
            rotateDelay = settings.rotateDelay;

        // this = $(this) = Element for which plugin was called.
        // Add class to this element for next manipulations.
        this.addClass('slider');

        // Associate variables with elements of slider for next manipulations
        var $slider = this.find('slider'),
            $sliderItem = this.find('.slider-item'),
            $sliderBox = this.find('.slider-box'),
            $sliderPointers = this.find('.slider-pointers'),
            $sliderLeft = this.find('.slider-left'),
            $sliderRight = this.find('.slider-right');

        // Set variables needs for next usage
        var slideNumbers = $sliderItem.length,
            currentSlide = 0,
            prevSlide,
            slideTimer;

        var imgWidth,
            imgHeight;

        // Resize Elements
        // --------------------------------------------------------------------
        // Slider Box must be the same size as image inside.
        // By default it is 100% width and height of parent container.
        //---------------------------------------------------------------------
        //
        // Preload first image to find it size and set the size of slider box
        var img = [];
        img.push($sliderBox.find("img").eq(0)[0].src);

        //Resize sliderbox when first image was loaded
        $(new Image()).attr("src", img[0]).on("load", function(){

            imgWidth = $sliderBox.find("img").eq(0)[0].naturalWidth;
            $sliderBox.css({'max-width': imgWidth});

            var sliderWidth = $sliderBox[0].clientWidth;
            if (imgWidth > sliderWidth) {
                imgWidth = sliderWidth;
                $sliderBox.find("img").css({'width': imgWidth});
            } else {
                $sliderBox.css({'width': imgWidth});
            }

            imgHeight = $sliderBox.find("img").eq(0)[0].clientHeight;
            $sliderBox.css({'height': imgHeight});
        });
        // --------------------------------------------------------------------

        // Hide all slides, then show first one
        $sliderItem.hide().eq(0).show();

        // Add slide pointers to slide box
        for (var i=0;i<slideNumbers;i++){
            $sliderPointers
                .append("<li></li>")
                .find('li')
                .addClass('slider-point');
        };

        var $sliderPoint = $(this).find('.slider-point');

        // Set first pointer as active
        $sliderPoint.eq(0).addClass('active');

        // Start slides rotation with specific interval
        startRotation();

        // Rotate slides
        // Params: 'left', 'right' or slide index
        // --------------------------------------------------------------------
        var rotateSlider = function(rotateDirection) {

            var nextSlide;
            $sliderPoint.eq(currentSlide).removeClass('active');

            if (rotateDirection === 'left') {

                nextSlide = currentSlide+1;
                if (nextSlide === slideNumbers) {nextSlide = 0};
                moveToLeft(nextSlide);

            } else if (rotateDirection === 'right') {

                nextSlide = currentSlide-1;
                if (nextSlide<0) {nextSlide=slideNumbers-1};
                moveToRight(nextSlide);

            } else {

                nextSlide = rotateDirection;
                if (nextSlide - currentSlide > 0) {
                    moveToLeft(nextSlide);
                } else if (nextSlide - currentSlide < 0) {
                    moveToRight(nextSlide);
                }
            }
            prevSlide = currentSlide;
            currentSlide = nextSlide;

            $sliderPoint.eq(currentSlide).addClass('active');
        };

        // Rotate slides to the left
        //---------------------------------------------------------------------
        var moveToLeft = function(nextSlide){
            $sliderItem.eq(prevSlide).css({display: 'none'});
            $sliderItem.eq(nextSlide).css({left: imgWidth+'px', display: 'inline', 'z-index': 1})
                .animate({left: 0}, slidingTime);
            $sliderItem.eq(currentSlide)
                .animate({left: '-'+imgWidth+'px'}, slidingTime);
        };

        // Rotate slides to the right
        //---------------------------------------------------------------------
        var moveToRight = function(nextSlide){
            $sliderItem.eq(prevSlide).css({display: 'none'});
            $sliderItem.eq(nextSlide).css({left: '-'+imgWidth+'px', display: 'inline', 'z-index': 1})
                .animate({left: 0}, slidingTime);
            $sliderItem.eq(currentSlide)
                .animate({left: imgWidth+'px'}, slidingTime);
        };

        // Start rotation with specific interval (rotateDelay)
        //---------------------------------------------------------------------
        function startRotation(){
            slideTimer = setTimeout(function timer(){
                rotateSlider('left');
                slideTimer = setTimeout(timer, rotateDelay);
            }, rotateDelay);
        };

        // Events handlers
        // --------------------------------------------------------------------
        $sliderBox
            .hover(function(){
                //stop slides rotation when slide is hover
                clearTimeout(slideTimer);
                $sliderLeft.show();
                $sliderRight.show();

            }, function(){
                //renew slides rotation if not hover
                startRotation();
                $sliderLeft.hide();
                $sliderRight.hide();
            });

        // Left arrow is clicked
        $sliderLeft.click(function(){
            rotateSlider('right');
        });

        // Right arrow is clicked
        $sliderRight.click(function(){
            rotateSlider('left');
        });

        // Specific slide pointer is clicked
        $sliderPoint
            .hover(function() {
                clearTimeout(slideTimer);
            })
            .click(function(){
                rotateSlider($(this).index());
            });

        // Resize elements when browser's size was changed
        $(window).resize(function(){
            clearTimeout(slideTimer);
            $sliderItem.eq(Number(prevSlide)).css({"z-index": 0, "display": 'none'});

            imgWidth = $sliderBox[0].clientWidth;
            $sliderBox.find('img').css({'width': imgWidth});

            imgHeight = $sliderBox.find("img").eq(currentSlide)[0].clientHeight;
            $sliderBox.css({'height': imgHeight});
            $slider.css({'height': imgHeight});

            startRotation();
        });

        return this;
    };
})(jQuery);