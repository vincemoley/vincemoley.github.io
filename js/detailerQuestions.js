$(function(){
	var rootUrl = "https://app.kleancierge.com";
	//var rootUrl = "http://localhost:8080";
	var url = rootUrl + "/vetting/step/";
	var step = parseInt(window.location.hash.substr(1)) || 1;
	var finalStep = 6;

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

			if(!resp.data.session && step > 1){
				showLostSession(form);
			}

			if(resp.data.packagesUrl){
				send(rootUrl + resp.data.packagesUrl, 'GET', null, function(packagesResp){
					populatePackages(packagesResp.data);

					populateExisting(form, resp.data);
				});
			} else {
				populateExisting(form, resp.data);
			}

			fireSelectChange(form);
		});
	};

	var save = function(tick){
		var form = $("#question-form");
		var fields =  form.find(".form-group:not(.hide)").find("input, select, textarea");

		send(url + step, 'POST', fields.serialize(), function(resp){
			if(resp.errors && tick > 0){
				handleErrors(fields, resp.errors);

				var firstError = form.find(".form-group.has-error").first().find("input, select, textarea").first();

				firstError.focus();

				$('body,html').animate({scrollTop: firstError}, 0);
			} else {
				step += tick;
				retrieve();
			}
		});
	};

	var send = function(url, action, data, callback){
		if(step <= finalStep){
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
		}
	};

	var populateExisting = function(fields, data){
		for(var name in data){
			var value = data[name];

			name = name.replace('step_' + step + '_', '');

			if(name === "businessHours"){
				for(var idx in value){
					var businessHour = value[idx];
					var startTime = ((businessHour.start.hour < 10) ?  "0" + businessHour.start.hour : businessHour.start.hour) + ":" + ((businessHour.start.minute < 10) ? businessHour.start.minute + "0" : businessHour.start.minute);
					var endTime = ((businessHour.end.hour < 10) ? "0" + businessHour.end.hour : businessHour.end.hour) + ":" + ((businessHour.end.minute < 10) ? businessHour.end.minute + "0" : businessHour.end.minute);

					populateValue(fields, name + "\\[" + idx + "\\]\\.start", startTime);
					populateValue(fields, name + "\\[" + idx + "\\]\\.end", endTime);
				}
			} else if(name === "packages") {
				for(var idx in value){
					var package = value[idx];

					populateValue(fields, name + "\\[" + idx + "\\]\\.cleaningPackage", package.cleaningPackage.value);
					
					if(package.price){
						populateValue(fields, name + "\\[" + idx + "\\]\\.price", package.price);
					}
				}
			} else if(value){
				populateValue(fields, name, value);
			}
		}
	};

	var populateValue = function(fields, id, value){
		var field = fields.find("#" + id);

		field.val(value+""); // add +"" for booleans since jquery compares to the option's value, which is a string
	};

	/**
	* fire change event for any visible selects in case there's a change event related to it
	*/
	var fireSelectChange = function(fields){
		var selects = fields.find("select");

		selects.each(function(idx, ele){
			var select = $(ele);
			
			if(!select.closest(".form-group").hasClass("hide")){
				select.change();
			}
		});
	};

	var handleErrors = function(fields, errors){
		for(var name in errors){
			var error = errors[name][0];

			name = name.replace('step_' + step + '_', '');

			if(name.includes("businessName")) name = name.replace('step_1_', '');

			var field = fields.filter("input[name='" + name + "'], select[name='" + name + "'], textarea[name='" + name + "'], #" + name);
			var parent = field.closest(".form-group");

			if(!parent.hasClass("has-error")){
				parent.addClass("has-error").append("<small>" + error + "</small>");
			}
			if(parent.hasClass("hide")){
				packages.removeClass("hide");
			}
		}
	};

	var updateUI = function(form){
		$('body,html').animate({scrollTop: 0}, 0);

		if(step <= 1){
			$(".question-prev").hide();
			$(".question-next").show();
		} else if(step < finalStep){
			$(".question-prev").show();
			$(".question-next").show();
		} else if(step > finalStep){
			$(".question-prev").hide();
			$(".question-next").hide();
		}

		nanobar.go((step / 7) * 100);

		form.find(".form-group").addClass("hide");
		form.find(".form-group.step-" + step).removeClass("hide");

		form.find(".form-group:not(.hide):first").find("input, select, textarea").first().focus();
	};

	var showLostSession = function(form){
		var field = form.find(".form-group.session-lost").removeClass("hide");
				
		if($("#sesssion-lost-msg").length === 0){
			field.find("label:first")
				.after("<div id=\"sesssion-lost-msg\"><small>Session Lost - Please re-enter</small></div>");
		}

		field.find("input:first").focus();
	}

	var populatePackages = function(packages){
		var packageTemplate = $(".template-package");
		var parent = packageTemplate.parent();

		packageTemplate.detach().removeClass("template-package");

		for(var idx in packages){
			var package = packages[idx];
			var clone = packageTemplate.clone();
			var packNameId = "packages[" + idx + "].cleaningPackage";
			var priceNameId = "packages[" + idx + "].price";
			var services = clone.find(".services");

			clone.find("#packages\\[0\\]\\.cleaningPackage")
				.attr("id", packNameId)
				.attr("name", packNameId);

			if(package.motorcycle){
				clone.find(".package:first").text("Motorycle - " + package.label);
			} else {
				clone.find(".package:first").text(package.label);
			}

			clone.find("#packages\\[0\\]\\.price")
				.attr("id", priceNameId)
				.attr("name", priceNameId);

			for(var srvcIdx in package.services){
				var service = package.services[srvcIdx];
				
				services.append("<li>" + service.description + "</li>");
			}

			parent.append(clone);
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

		if(ele.val()) ele.closest(".form-group").removeClass("has-error");
	});

	$(".input-group-addon.day-of-week").on("click", function(){
		var dayOfWeek = $(this);
		var icon = dayOfWeek.find("i.text-danger")
		var inputGroup = icon.closest(".input-group");

		if(icon.hasClass("fa-plus-circle")){
			icon.removeClass("fa-plus-circle").addClass("fa-minus-circle");
			inputGroup.find(".inline-form-control").prop("disabled", "");
			inputGroup.find("input[name$='off']").val("false");
		} else if(icon.hasClass("fa-minus-circle")){
			icon.removeClass("fa-minus-circle").addClass("fa-plus-circle");
			inputGroup.find(".inline-form-control").prop("disabled", "disabled");
			inputGroup.find("input[name$='off']").val("true");
		}
	});

	retrieve();
});