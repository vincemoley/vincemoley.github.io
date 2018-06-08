$(function(){
	$("#password").focus();

	$(".btn-submit").on('click', function(e) {
		e.preventDefault();

		var form = $("form");

		$.ajax({
			url: "https://app.kleancierge.com/users/password/reset",
			type: "POST",
			crossDomain: true,
			data: form.serialize(),
			dataType: "json",
			success: function(result){
				var status = result.statusCode;
                var errors = result.errors;

				if(status == 200){
					$("form").addClass("hide");
					$(".password-reset").removeClass("hide");
				} else {
					var error = $(".general-error");

					for (var fd in errors) {
			            error.text(errors[fd][0]);
			        }

			        error.parent().removeClass("hide");
				}
			},
			error: function(xhr, status){
				alert("Uh oh!  We were unable to reset your password.  Please open the Kleancierge app to reset your password")
			}
		});
	});

	$(".btn-cancel").on('click', function(e) {
		e.preventDefault();

		window.location.href="https://www.kleancierge.com"
	});

	$("[name='token']:first").val(window.location.href.split("?")[1]);
});