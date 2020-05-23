import Typed from 'typed.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/owl.carousel.min.js';
//import { CountUp } from 'countup.js';
//import 'font-awesome/css/font-awesome.css';
//import 'easy-pie-chart';

if (module.hot) {
	module.hot.accept()
}

$(window).on("load", function() {
	$(".loader--inner").fadeOut(500, function() {
		$(".loader").fadeOut(750);
	});

	$(".portfolio-section__items").isotope({
    	filter: '*',
    	animationOptions: {
    		duration: 1500,
    		easing: 'linear',
    		queue: false
    	}
    });
});

$(document).ready(function () {

	/*$('body').scrollspy({target: '#navbarNav'});*/

	$('#slides').superslides({
		animation: 'fade',
		play: 5000,
		pagination: false
	});

	var typed = new Typed(".typed", {
		strings: ["Web Developer.", "Software Engineer.", "Electrical Engineer."],
		typeSpeed: 70,
		loop: true,
		startDelay: 1000,
		showCursor: false
	});

	$('.owl-carousel').owlCarousel({
		loop: true,
		items: 4,
		nav: false,
		dots: true,
		dotsEach: true,
		dotsData: false,
		responsive: {
			0:{
				items:1
			},
			480:{
				items:2
			},
			768:{
				items:3
			},
			938:{
				items:4
			}
		}
	});

    var skillsTopOffset = $(".skill-section").offset().top;
    var statsTopOffset = $(".stats-section").offset().top;
    var countUpFinished = false;

    $(window).scroll(function() {
    	if(window.pageYOffset > skillsTopOffset - $(window).height() + 200) {

    		$('.skill-section__chart').easyPieChart({
	            easing: 'easeInOut',
	            barColor: '#fff',
	            trackColor: false,
	            scaleColor: false,
	            lineWidth: 4,
	            size: 152,
	            onStep: function(from, to, percent) {
	            	$(this.el).find('.percent').text(Math.round(percent));
	            }
    		});
    	}

    	if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
    		$(".counter").each(function() {
		    	var element = $(this);
		    	var endVal = parseInt(element.text());

		    	element.countup(endVal);
	    	})

	    	countUpFinished =true;
    	}
    });

    $("[data-fancybox]").fancybox();

    

    $(".portfolio-section__filter-a").click(function() { // if we want to use id tag then use #id instead of .class

    	$(".portfolio-section__current").removeClass("portfolio-section__current");
    	$(this).addClass("portfolio-section__current");

    	var selector = $(this).attr("data-filter");
	        
	    $(".portfolio-section__items").isotope({
	    	filter: selector,
	    	animationOptions: {
	    		duration: 1500,
	    		easing: 'linear',
	    		queue: false
	    	}
    	});

	    return false;
    });

    $("#navigation .nav-link").click(function(e) {

    	var targetElement = $(this).attr("href");

    	if(targetElement.charAt(0) == "#") {
    		e.preventDefault();
    		var targetPosition = $(targetElement).offset().top;
    		$("html, body").animate({ scrollTop: targetPosition }, "slow");              
        }
    });

    $("#navigation .nav-link").on("click", function(){
   		$(".nav-link").removeClass("active");
   		$(this).addClass("active");
	});

    var navMain = $("#navbarNav");
     navMain.on("click", "a", null, function () {
         navMain.collapse('hide');
     });

    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation () {
    	var body = $("body");

    	if($(window).scrollTop() >= navTop) {
    		body.css("padding-top", nav.outerHeight() + "px");
    		body.addClass("fixedNav");
    	} else {
    		body.css("padding-top", 0);
    		body.removeClass("fixedNav");
    	}
    }

});

/*window.onload = function () {
	var countUp = new CountUp('counter', 0, 200);
	countUp.start();
}*/