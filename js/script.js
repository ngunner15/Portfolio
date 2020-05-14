import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

$(document).ready(function () {

	$('#slides').superslides({
		animation: 'fade',
		play: 5000,
		pagination: false
	});

});