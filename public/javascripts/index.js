jQuery.noConflict();

jQuery(document).ready(function($) {

  // Newsletter
  $('form').on('click', 'button', function() {
    var email = $("input").val();
    var data = 'email='+ email;

    $.ajax({
      type: "POST",
      url: "/newsletter",
      data: data,
      success: function() {
        $('button').text('Added!');
		mixpanel.identify(email);
		mixpanel.track("Email added");
      }
    });

    return false;
  });
});
