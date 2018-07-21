$.main = {
	/*------------------------------------------------------------
	    0.1. Affix header
	------------------------------------------------------------*/
	affixHeader: function () {
		$(window).on('scroll', function () {
			var headerElement = $('.nheader'),
				heightHeader = headerElement.height(),
				scrollTop = $(window).scrollTop();
			if (scrollTop >= heightHeader + 10) {
				$(headerElement).addClass('affix');
			} else {
				$(headerElement).removeClass('affix');
			}
		})
	},
	/*------------------------------------------------------------
	    0.2. Menu Mobile
	------------------------------------------------------------*/
	menuMobile: function () {
		var hamburgerEle = $('.nheader__hamburger'),
			headerRightMenu = $('.nheader__wrap .nheader__right'),
			clickFlag = true;
		hamburgerEle.on('click', function () {
			$(this).toggleClass('open');
			headerRightMenu.toggleClass('active');
			clickFlag = true;
		});
		$('body').on('click', function () {
			if (!clickFlag) {
				hamburgerEle.removeClass('open');
				headerRightMenu.removeClass('active');
			}
			clickFlag = false;
		})
	},
	/*------------------------------------------------------------
	    0.2. Accordion content
	------------------------------------------------------------*/
	accordionContent: function (accSelector, accBody) {
		var activeClass = 'is-active';
		accSelector.on('click', function () {
			var $this = $(this);
			var currentBody = $this.siblings(accBody);
			accBody.not(currentBody).slideUp();
			currentBody.slideToggle();
			// scroll to top of active 
			// setTimeout(() => {
			// 	var headerHeight = $('.nheader').height();
			// 	var accTop = $this.offset().top - headerHeight - 20;
			// 	$('html, body').animate({
			// 		scrollTop: accTop
			// 	}, 1000);
			// }, 200);
			accSelector.not(this).removeClass(activeClass);
			$this.toggleClass(activeClass);
		})
	},
	/*------------------------------------------------------------
	 0.3.  Scrollspy
	------------------------------------------------------------*/
	scrollSpy: function () {
		$(window).on('scroll', function () {
			var eachSection = $('.nsection'),
				navigation = $('.nheader__wrap .nheader__right'),
				navigationHeight = $('.nheader').outerHeight(),
				curPostionScroll = $(this).scrollTop();
			eachSection.each(function () {
				var topCurScroll = $(this).offset().top - navigationHeight,
					bottomCurScroll = topCurScroll + $(this).outerHeight();
				if (curPostionScroll >= topCurScroll && curPostionScroll <= bottomCurScroll) {
					navigation.find('.item a').removeClass('active');
					navigation.find('.item a[href="#' + $(this).attr('id') + '"]').addClass('active');
				}
			});
		})
		var widthBrow = $(window).width();
		$('.nheader__wrap .nheader__right .item a').on('click', function (event) {
			event.preventDefault();
			var curSection = $(this).attr('href'),
				headerHeight = $('.nheader').height();
			setTimeout(() => {

				$('html, body').animate({
					// scrollTop: $(curSection).offset().top - headerHeight + 2
					scrollTop: $(curSection).offset().top - 40
				}, 1000);
			}, 100);
		})

	},
	/*------------------------------------------------------------
	    0.4. Show Back To Top
	------------------------------------------------------------*/
	showBackToTop: function () {
		$(window).on('scroll', function () {
			var scroll = $(window).scrollTop(),
				eleBackToTop = $('.nchange-lang, .nbacktotop');
			if (scroll >= 300) {
				eleBackToTop.addClass('active');
			} else {
				eleBackToTop.removeClass('active');
			}
		})
	},
	/*------------------------------------------------------------
	    0.4. Back To Top
	------------------------------------------------------------*/
	backToTop: function () {
		$(document).on('click', '.nbacktotop', function (e) {
			e.preventDefault();
			setTimeout(() => {
				$('html,body').stop().animate({
					scrollTop: 0
				}, 1500);
			}, 200);
		});
	},
	/*------------------------------------------------------------
	    0.5. Scroll first section
	------------------------------------------------------------*/
	scrollFirstSection: function () {
		$(document).on('click', '#scroll-down', function (e) {
			e.preventDefault();
			var headerHeight = $('.nheader').height();
			$('html,body').animate({
				scrollTop: $('#bos-about').offset().top - headerHeight + 2
			}, 1000);
		});
	}
};
$(function () {
	$.main.affixHeader();
	$.main.menuMobile();
	$.main.scrollSpy();
	$.main.showBackToTop();
	$.main.scrollFirstSection();
	$.main.accordionContent($('.nevent__schedule-info .inner-pane'), $('.nevent__schedule-info .inner-content'));
	$.main.backToTop();
});