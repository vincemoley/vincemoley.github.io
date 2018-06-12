$(function(){
	$(".submit-sign-up-btn").on('click', function(e) {
		e.preventDefault();

		var hasError = false;
		var form = $(".contact-form");
		var fName = form.find("[name='firstName']");
		var lName = form.find("[name='lastName']");
		var email = form.find("[name='email']");
		var address = form.find("[name='address']");
		
		if(fName.val() === ''){
			fName.addClass("has-error");
			hasError = true;
		}
		if(lName.val() === ''){
			lName.addClass("has-error");
			hasError = true;
		}
		if(email.val() === ''){
			email.addClass("has-error");
			hasError = true;
		}
		if(address.val() === ''){
			address.addClass("has-error");
			hasError = true;
		}

		if(hasError){
			alert('Please enter the required fields highlighted above');

			return;
		}

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