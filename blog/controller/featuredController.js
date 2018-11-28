app.controller('featuredController', function($rootScope, $scope, $location) {
    var clSlickSlider = function() {
        
        $('.featured-slider').slick({
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '10%',
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        arrows: false,
                        centerPadding: '8%'
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        arrows: false,
                        centerPadding: '5%'
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        arrows: false,
                        centerMode: false
                    }
                }
            ]
        });
    };

    var clAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };

    window.setTimeout(clSlickSlider, 1000);
    window.setTimeout(clAOS, 1000);
});

