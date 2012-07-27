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
        mixpanel_events.add_email(email);
      }
    });

    return false;
  });

  var mixpanel_events = {
    add_email: function(email){
      mixpanel.people.set({ $email: email,
                            $created: new Date().toDateString() });
      mixpanel.identify(email);
      mixpanel.name_tag(email);
      mixpanel.track("Email added");
    },

    facebook: function(){
      mixpanel.track_links(".social-media a.facebook", "facebook");
    },

    twitter: function(){
      mixpanel.track_links(".social-media a.twitter", "twitter");
    },

    coming_from: function(){
      mixpanel.register({ 'referrer': document.referrer });
    },

    init: function(){
      mixpanel_events.facebook();
      mixpanel_events.twitter();
      mixpanel_events.coming_from();
    }
  };

  mixpanel_events.init();
});
