import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

if (module.hot) {
	module.hot.accept()
}

$(document).ready(function () {

	$('#slides').superslides({
		animation: 'fade',
		play: 5000,
		pagination: false
	});

});