$(function() {

	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// $('.announcement-container').css({'height':windowHeight});
	var annPadding = (windowHeight - $('.announcement-container .container').css('height').replace(/[^-\d\.]/g, ''))  / 2;
	$('.announcement-container').css({'padding-top':annPadding,'padding-bottom':annPadding})

	var annPadding = (windowHeight - $('.about-container .container').css('height').replace(/[^-\d\.]/g, ''))  / 2;
	$('.about-container').css({'padding-top':annPadding,'padding-bottom':annPadding})

	var annPadding = (windowHeight - $('.we-container .container').css('height').replace(/[^-\d\.]/g, ''))  / 2;
	$('.we-container').css({'padding-top':annPadding,'padding-bottom':annPadding})

	console.log(annPadding);
	console.log(windowHeight);

	/* Remove the html scroll and create scroll events. */
	$('div.about-container').removeAttr('id');
	$('a[href="#headerAboutPlazr"]').click(function() {
		$.scrollTo($('div.about-container'), 500);
	});
	$('div.we-container').removeAttr('id');
	$('a[href="#headerAboutUs"]').click(function() {
		$.scrollTo($('div.we-container'), 500);
	});
	$('div.announcement-container').removeAttr('id');
	$('a[href="#headerAnn"]').click(function() {
		$.scrollTo($('div.announcement-container'), 500);
	});


	/* Newsletter subscription. */
	var verimail = new Comfirm.AlphaMail.Verimail();
	var messageContainer = $("#subscribe-suggestion");
	messageContainer.css("opacity", 0);
	$("#subscribe").click(function() {
		var inputEmailVal = $("input#subscribe-email").val();
		verimail.verify(inputEmailVal, function(status, message, suggestion) {
			if(status < 0) {
				if(suggestion) {
					messageContainer.text("Did you mean "+suggestion+"?").animate({opacity: 100}).delay(1000).animate({opacity: 0});
				} else {
					messageContainer.text("Invalid email!").animate({opacity: 100}).delay(1000).animate({opacity: 0});
				}
			} else {
				if(suggestion) {
					messageContainer.text("Did you mean "+suggestion+"?").animate({opacity: 100}).delay(1000).animate({opacity: 0});
				} else {
					messageContainer.text("Sending...").animate({opacity: 100});
					$.post('/newsletter', {email: inputEmailVal}, function(data) {
						messageContainer.animate({opacity: 0}).delay(100);
						$(messageContainer.text("Subscribed!").animate({opacity: 100}).delay(1000).animate({opacity: 0}));
					});
				}
			}
		});
	});
	$('.input-append').keypress(function(e) {
		if(e.keyCode == 13)	{
			$("#subscribe").click();
		}
	});
});