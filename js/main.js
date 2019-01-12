(function($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav :not(.has-dropdown) a[href^='#']").on('click', function(e){
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $(this).offset().top
		}, 600).promise().then(function(){
			$('#nav').toggleClass('open');
		});
	});

	$(".sign-up-btn").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $("#contact-form").offset().top
		}, 600, function(){
			$(".contact-form select:first").focus();
		});
	});

	$('#back-to-top').on('click', function(){
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// Owl Carousel
	$('#customer-reviews').owlCarousel({
		items: 2,
		margin: 20,
		loop: true,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots : true,
		autoplay : false,
		animateOut: 'fadeOut',
		responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
	        600:{
	            items:1,
	            nav:true
	        },
	        1000:{
	            items:2,
	            nav:true
	        }
	    }
	});

	setTimeout(function(){
		$('#after-photos').owlCarousel({
			items:1,
			loop:true,
			nav: true,
			navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			dots : true,
			autoplay : true,
			animateOut: 'fadeOut',
			responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        600:{
		            items:1,
		            nav:true
		        },
		        1000:{
		            items:1,
		            nav:true
		        }
		    }
		});
	}, 100);

	setTimeout(function(){
		$('#before-photos').owlCarousel({
			items:1,
			loop:true,
			nav: true,
			navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			dots : true,
			autoplay : true,
			animateOut: 'fadeOut',
			responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        600:{
		            items:1,
		            nav:true
		        },
		        1000:{
		            items:1,
		            nav:true
		        }
		    }
		});
	}, 250);

	$(".scroll-link").on("click", function(e){
		e.preventDefault();
		
		var hash = this.hash;

		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$(".btn-types .btn").on("click", function(e){
		var btn = $(this);

		if(!btn.hasClass("btn-primary")){
			$(".btn-types .btn").removeClass("btn-primary").addClass("btn-default");
			btn.removeClass("btn-default").addClass("btn-primary");

			if(btn.hasClass("vo-btn")){
				$(".vehicle-owner-section").removeClass("hide");
				$(".detailer-section").addClass("hide");
			} else {
				$(".detailer-section").removeClass("hide");
				$(".vehicle-owner-section").addClass("hide");
			}
		}
	});
})(jQuery);
