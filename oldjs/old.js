(function() {
    'use strict';

    var currentPage = null;
    var home = 'home',
        dance_artist = 'dance_artist',
        choreographer = 'choreographer',
        educator = 'educator',
        on_the_move = 'on_the_move';
    var isMobile = window.innerWidth < 1000;

    // hamburger toggle
    $('.header__hamburger').on('click', function(e) {
        e.preventDefault(); // prevents from scrolling to top
        $(this).toggleClass('header__hamburger--open');

        $('.menu').toggleClass('menu--open');
    });

    // menu background change
    $('.items__item').hover(function() {
        var backgroundImage = $(this).attr("data-name");
        $('.menu__overlay').css({"background-image": "url('./assets/img/menu_backgrounds/menu__" + backgroundImage + ".jpg')"});
    }, function() {
        $('.menu__overlay').css({"background-image": "url('./assets/img/menu_backgrounds/menu__main.jpg"});
    });




    function pageLoad(page) {
        var url = page +'.html';

        $('.wrapper').load("./subsites/" + url, function() {
            currentPage = page;
            var vh = window.innerHeight;
            $('.heroimage').height(vh);

            if (currentPage === home) {
                $(this).on('mousemove', function (ev) {
                    var windowWidth = window.innerWidth,
                        oneSixteen = windowWidth / 16,
                        currentSlice = (ev.pageX / oneSixteen);
                    $('.heroimage--home').attr('class', 'heroimage heroimage--home imgAdd');
                    $('.heroimage--home').addClass('imgAdd img--' + ( Math.floor(currentSlice) + 1 ));
                });
            }
            if(!isMobile) {
                $('.single__photo').addClass('rellax');
                $('.single__sidetext').addClass('rellax')
                    .css({transform: 'rotate(-90deg)'})
                    .attr('data-rellax-percentage', '-1.5');

            } else {
                console.log('mobile mode');
            }

            if (currentPage !== home && !isMobile) {
                var rellax = new Rellax('.rellax', {
                    speed: 1.8,
                    center: false,
                    round: true
                });
            }
        });
    }

    pageLoad(home);

    $('.header__logo').on('click', function() {
        pageLoad(home);
        $('.menu').removeClass('menu--open');
        if ($('.header__hamburger').hasClass('header__hamburger--open')) {
            $('.header__hamburger').removeClass('header__hamburger--open');
        }
    });

    $('.items__item').on('click', function() {
        var pageName = $(this).attr('data-name');
        pageLoad(pageName);
        $('.menu').removeClass('menu--open');
        $('.header__hamburger').removeClass('header__hamburger--open');
    });
}());
