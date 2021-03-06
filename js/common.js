(function($) {
	$.fn.switchPopup = function(btn, time) {		
		var $popup = this;
		$(document).on('click', btn, function() {
			var $subject = $(this).data('subject');
			$subject = typeof $subject === 'undefined' ? '' : $subject;
			var $scrollWidth = window.innerWidth - document.documentElement.clientWidth
			var $time = typeof time === 'number' ? time : 300;
			
			if($popup.hasClass('display')) {
				$popup.removeClass('visible');
				setTimeout(function() {
					$popup.removeClass('display');
					$('html').css({
						'padding-right': 0,
						'overflow': 'auto'
					});
				}, $time);
			} else {
				$popup.find('input.callback-form-subject').val($subject);
				$popup.addClass('display');
				setTimeout(function() {
					$popup.addClass('visible');
				}, 1);
				$('html').css({
					'padding-right': $scrollWidth,
					'overflow': 'hidden'
				});
			}
		});
	};
})(jQuery);

$(function() {
	/* ИМГ В СВГ */
	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');

			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}

			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			$svg = $svg.removeAttr('xmlns:a');

			if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			$img.replaceWith($svg);

		}, 'xml');
	});
	
	$('.popup_callback').switchPopup('.js-tgl-callback');
	
	$('#politconf').on('change', function() {
		console.log(!$(this).prop('checked'));
		$(this).parents('.popup').find('button.btn').attr('disabled', !$(this).prop('checked'));
	});
});