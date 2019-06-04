	// selector (css selector
	// default: [hred^="#anchor"]
	// Селектор на ссылку для клика

	// speed (number)
	// default: 500
	// Скорость анимации прокрутки

	// beforeScroll (callback)
	// Функция, которая будет выполнена перед анимацией

	// afterScroll (callback)
	// Функция, которая будет выполнена после анимации

	// )





function toAnchor(param) {
	var options = {
		selector: '[href^="#anchor"]',
		speed: 500,
		beforeScroll: function() {},
		afterScroll: function() {},
		responsive: [],
		offset: 0
	};

	for (let key in param) {
		options[key] = param[key];
	}

	var defaults = {};

	for (let key in options) {

		defaults[key] = options[key];
	}

	if ( options.responsive.length ) {

		$(document).ready(reOpt);
		$(window).resize(reOpt);
		function reOpt (){

			for (let i = 0; i < options.responsive.length; i++) {
				if (window.matchMedia(`(max-width: ${options.responsive[i].breakpoint}px)`).matches ) {

					for (let key in options.responsive[i].settings) {
					options[key] = options.responsive[i].settings[key];
					}
				}else {
					for (let key in options) {
						options[key] = defaults[key];
					}

				}
			}
		}
	}

	$(options.selector).click(function() {
		event.preventDefault();

		var id     = $(this).attr('href'),
			docTop = $(id).offset().top;


		options.beforeScroll();

		$('html, body').animate({
			scrollTop: docTop - options.offset
		}, options.speed);

		setTimeout(options.afterScroll, options.speed);
	});

};


toAnchor({
	responsive: [
		{
			breakpoint: 1110,
			settings: {
				offset: $('.topheader').height()
			}
		}
	]
});


	// selector (css selector)
	// default: .nav-toggle
	// Селектор кнопки переключателя для клика

	// toggleClass (string)
	// default: nav-toggle_active
	// Переключатель класса для кнопки

	// selectorNav (css selector)
	// default: .nav
	// Селектор блока навигации

	// toggleClassNav (string)
	// default: nav_active
	// Переключатель класса для блока навигации

	// selectorLink (css selector)
	// default: [href^="#anchor"]
	// Селектор ссылки для клика

	// blockScroll (boolean)
	// default: false
	// Блокирует прокрутку страницы при открытом меню





function toggleNav(param) {
	var options = {
		selector: '.nav-toggle',
		toggleClass: 'nav-toggle_active',
		selectorNav: '.nav',
		toggleClassNav: 'nav_active',
		selectorLink: '[href^="#anchor"]',
		blockScroll: false,
		responsive: [],
		activeState: false
	};

	for (let key in param) {
		options[key] = param[key];
	}

	var defaults = {};

	for ( let key in options) {
		defaults[key] = options[key];
	}

	if ( options.responsive.length ) {
		$(document).ready(reOpt);
		$(window).resize(reOpt);

		function reOpt () {
			for (let i = 0; i < options.responsive.length; i++) {
				if ( window.matchMedia(`(max-width: ${options.responsive[i].breakpoint}px)`).matches ) {

					for (let key in options.responsive[i].settings ) {
						options[key] = options.responsive[i].settings[key];
					}
				} else {

					for (let key in options) {
						options[key] = defaults[key];
					}
				}
		}

		}
	}

	$(`${options.selector}, ${options.selectorLink}`).click(function() {
		options.activeState = !options.activeState;

		if ( options.toggleClass ) {
			$(options.selector).toggleClass(options.toggleClass );
		}

		if ( options.toggleClassNav ) {
			$(options.selectorNav).toggleClass( options.toggleClassNav );
		}

		if ( options.blockScroll ) {
			if ( options.activeState ) {
				$('body').css('overflow', 'hidden');
			} else {
				$('body').removeAttr('style');
			}
		}
	});
}

toggleNav({
	responsive: [
		{
			breakpoint: 1110,
			settings: {
				blockScroll: true
			}
		}
	]
});

$('.preview-block').slick({
	slidesToShow: 1,
	infinite: true,
	arrows: false,
	autoplay: true,
	dots: true,
	fade: true,
	cssEase: 'linear',
	autoplaySpeed: 7000,
	slidesToScroll: 1
});

$('.services-grid').slick({
	slidesToShow: 3,
	infinite: true,
	arrows: true,
	dots: false,
	prevArrow: $('.services-prev'),
	nextArrow: $('.services-next'),
	responsive: [
		{
			breakpoint: 767,
			settings:{
				slidesToShow: 1,
				dots: true
			}
		},
		{
			breakpoint: 1110,
			settings:{
				slidesToShow: 2,
				dots: true
			}
		},
		]
});

$('.team-grid').slick({
	slidesToShow: 3,
	infinite: true,
	arrows: true,
	dots: false,
	prevArrow: $('.team-prev'),
	nextArrow: $('.team-next'),
	responsive: [
		{
			breakpoint: 767,
			settings:{
				slidesToShow: 1,
				dots: true
			}
		},
		{
			breakpoint: 1110,
			settings:{
				slidesToShow: 2,
				dots: true
			}
		},
		]
});

$(document).ready(function() {
$("#post-loadLess").hide();
	var grid = $('.post-grid');
	grid.find('.post-grid__col').slice(0, 3).addClass('post-grid__col_active');


	$("#post-loadMore").on('click', function (e) {
      e.preventDefault();
      grid.find('.post-grid__col').slice(3).addClass('post-grid__col_active');
      if ($(".post-grid__col").hasClass('post-grid__col_active')) {
        $("#post-loadMore").hide();
         $("#post-loadLess").fadeIn('slow');
      }
    });

 $("#post-loadLess").on('click', function(e) {
    e.preventDefault();
    $('.post-grid__col:not(:lt(3))').removeClass('post-grid__col_active');
    $("#post-loadMore").fadeIn('slow');
    $("#post-loadLess").hide();

    desiredHeight = $(window).height();

    $('html,body').animate({
      scrollTop: $(".post").offset().top + desiredHeight
    }, 1500);
  });
});

$(window).on('load resize', function() {
	if ($(".post-grid__col").hasClass('post-grid__col_active')) {
        $("#post-loadLess").hide();
      };
  if (window.matchMedia('(max-width: 1110px)').matches) {
    $('.post-grid:not(.slick-initialized)').slick({
	infinite: true,
	slidesToShow: 2,
	arrows: true,
	dots: true,
	prevArrow: $('.post-prev'),
	nextArrow: $('.post-next'),
	responsive: [
		{
			breakpoint: 767,
			settings:{
				slidesToShow: 1
			}
		},
		]
    });
  } else {
  	$("#post-loadLess").hide();
    $(".post-grid.slick-initialized").slick("unslick");
  }
});

var toggle = $('ul.works-list'),
	grid = $('ul.works-grid');

	toggle.find('li.link').eq(0).addClass('active');
	grid.find('li.item').slice(0, 6).addClass('item_active');

	toggle.on('click', 'li.link', event => {
		let elem = $(event.target),
			id   = elem.attr('data-filter'),
			items = grid.find(`[data-filter*="${id}"]`);

		elem.closest(toggle).find('.active').removeClass('active');
		elem.addClass('active');

		if (id === 'all') {
			$("#loadMore").show();
			grid.find('li.item').removeClass('item_active');
			grid.find('li.item').slice(0, 6).addClass('item_active');
		} else {
			$("#loadMore").hide();
			$("#loadLess").hide();
			grid.find('li.item').addClass('item_active');
			grid.find('li.item').not(items).removeClass('item_active');
		}
	});

$("#loadMore").on('click', function (e) {
      e.preventDefault();
      $("li.item").addClass('item_active');
      if ($(".item").hasClass('item_active')) {
        $("#loadMore").hide();
         $("#loadLess").fadeIn('slow');
      }
    });

 $("#loadLess").on('click', function(e) {
    e.preventDefault();
    $('.item:not(:lt(6))').removeClass('item_active');
    $("#loadMore").fadeIn('slow');
    $("#loadLess").hide();

    desiredHeight = $(window).height();

    $('html,body').animate({
      scrollTop: $(".works").offset().top + desiredHeight
    }, 1500);
  });
