$(function() {
	var verimail = new Comfirm.AlphaMail.Verimail();
	var messageContainer = $("#subscribe-suggestion");
	messageContainer.css("opacity", 0);
	$("#subscribe").click(function() {
		var inputEmailVal = $("input#subscribe-email").val();
		messageContainer.text("");
		verimail.verify(inputEmailVal, function(status, message, suggestion) {
			if(status < 0) {
				if(suggestion) {
					messageContainer.append("Did you mean "+suggestion+"?").animate({opacity: 100}).delay(1000).animate({opacity: 0});
				} else {
					messageContainer.append("Invalid email!").animate({opacity: 100}).delay(1000).animate({opacity: 0});
				}
			} else {
				if(suggestion) {
					messageContainer.append("Did you mean "+suggestion+"?").animate({opacity: 100}).delay(1000).animate({opacity: 0});
				} else {
					// console.log("VALID EMAIL");
					$.post('/newsletter', {email: inputEmailVal}, function(data) {
						$(messageContainer.append("Subscribed!").animate({opacity: 100}).delay(1000).animate({opacity: 0}));
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