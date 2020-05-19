import Typed from 'typed.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
//import { CountUp } from 'countup.js';
//import 'font-awesome/css/font-awesome.css';
//import 'easy-pie-chart';

if (module.hot) {
	module.hot.accept()
}

$(document).ready(function () {

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

    $(".portfolio-section__items").isotope({
    	filter: '*',
    	animationOptions: {
    		duration: 1500,
    		easing: 'linear',
    		queue: false
    	}
    });

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

});

/*window.onload = function () {
	var countUp = new CountUp('counter', 0, 200);
	countUp.start();
}*/