$(function(){
	$(".submit-sign-up-btn").on('click', function(e) {
		e.preventDefault();

		var form = $(".contact-form");

		$.ajax({
			url: "https://app.kleancierge.com/signup",
			type: "POST",
			crossDomain: true,
			data: form.serialize(),
			dataType: "json",
			success: function(resp){
				$("#contact-form").html("<h4 class='text-center alert alert-success'>Thank you for signing up!<br/><br/>A Kleancierge representative will be in touch</h4>");
			},
			error: function(xhr, status){
				alert("Uh oh!  We were unable to save your information.  Please email to vince@kleancierge.com.  Thank you!")
			}
		});
	});
});