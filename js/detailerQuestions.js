$(function(){
	//var rootUrl = "https://app.kleancierge.com";
	var rootUrl = "http://localhost:8080";
	var url = rootUrl + "/vetting/step/";
	var step = parseInt(window.location.hash.substr(1)) || 1;

	var nanobar = new Nanobar({ 
		id: "progress-bar",
		target: $(".panel-heading")[0]
	});

	var retrieve = function(){
		window.location.hash = step;

		var form = $("#question-form");

		updateUI(form);

		send(url + step, 'GET', null, function(resp){
			$("#questions .panel-title").text(resp.data.title);

			populateExisting(form, resp.data);
		});
	};

	var save = function(tick){
		var form = $("#question-form");
		var fields =  form.find(".form-group:not(.hide)").find("input, select, textarea");

		send(url + step, 'POST', form.serialize(), function(resp){
			if(resp.errors){
				handleErrors(fields, resp.errors);

				form.find(".form-group.has-error").first().find("input, select, textarea").first().focus();
			} else {
				step += tick;
				retrieve();
			}
		});
	};

	var send = function(url, action, data, callback){
		$.ajax({
			url: url,
			type: action,
			xhrFields: {
		       withCredentials: true
		    },
			crossDomain: true,
			data: data,
			dataType: "json",
			success: callback,
			error: function(xhr, status){
				alert("Uh oh!  We were unable to process your information.  Please email to vince@kleancierge.com, if the problem persists.  Thank you!")
			}
		});
	};

	var populateExisting = function(form, data){
		for(var name in data){
			var value = data[name];

			name = name.replace('step_' + step + '_', '');

			var field = form.find("input[name='" + name + "'], select[name='" + name + "']");

			if(field.length === 1){
				field.val(value);
			}
		}
	};

	var handleErrors = function(fields, errors){
		for(var name in errors){
			var error = errors[name][0];

			name = name.replace('step_' + step + '_', '');

			var field = fields.filter("input[name='" + name + "'], select[name='" + name + "'], textarea[name='" + name + "']");
			var parent = field.parent();

			if(!parent.hasClass("has-error")){
				parent.addClass("has-error").append("<small>" + error + "</small>");
			}
		}
	};

	var updateUI = function(form){
		$('body,html').animate({scrollTop: 0}, 600);

		if(step <= 1){
			$(".question-prev").hide();
			$(".question-next").show();
		} else if(step >= 7){
			$(".question-prev").show();
			$(".question-next").hide();
		} else {
			$(".question-prev").show();
			$(".question-next").show();
		}

		nanobar.go((step / 7) * 100);

		form.find(".form-group").addClass("hide");
		form.find(".form-group.step-" + step).removeClass("hide");

		form.find(".form-group:not(.hide):first").find("input, select, textarea").first().focus();

		if(step === 2){
			$("#serviceType").change();
		}
	};

	$(".question-next").on("click", function(){
		save(1);
	});
	$(".question-prev").on("click", function(){
		save(-1);
	});

	$("#serviceType").on("change", function(){
		var serviceType = $(this).val();
		var dependents = $("#mobileUnits, #travelDistance, #travelDistanceTilCharge, #travelSurcharge, #travelRequirement");

		if(serviceType === "mobile" || serviceType === "both"){
			dependents.closest(".form-group").removeClass("hide");
		} else {
			dependents.closest(".form-group").addClass("hide");
		}
	});

	$(".form-group").find("input, select, textarea").on("blur", function(){
		var ele = $(this);

		if(ele.val()) ele.parent().removeClass("has-error");
	});

	retrieve();
});