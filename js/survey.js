$(function(){
	$(".submit-sign-up-btn").on('click', function(e) {
		e.preventDefault();

		var form = $(".contact-form");

		$.post("https://app.kleancierge.com/signup", form.serialize(), function(){
			$("#contact-form").html("<h4 class='text-center alert alert-success'>Thank you for signing up!<br/><br/>A Kleancierge representative will be in touch</h4>");
		});
	});
});