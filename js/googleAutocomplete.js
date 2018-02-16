$(function(){
    var gAutoCompleteService;
    var timeoutId;
    var userCoords;

    try
    {
        gAutoCompleteService = new google.maps.places.AutocompleteService();
    }
    catch(e){ }

    var search = function(text){
        askForCurrentLocation(function(){
            var data = { input: text };

            if(userCoords){
                data.location = new google.maps.LatLng(userCoords.latitude, userCoords.longitude);
                data.radius = 8000; // ~5 miles
            }

            gAutoCompleteService.getQueryPredictions(data, displaySuggestions);
        });
    };

    var displaySuggestions = function(predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) { return; }

        var results = $("#g-auto-complete-address-results");
        var ol = $("<ol></ol>");

        results.empty();

        results.append(ol);

        predictions.forEach(function(prediction) {
            ol.append($("<li><a href='#'>" + prediction.description + "</a></li>"))
        });
    };

    var askForCurrentLocation = function(callback){
        if (navigator.geolocation && !userCoords) {
            navigator.geolocation.getCurrentPosition(function(position){
                userCoords = position.coords;
                if(callback) callback();
            }, function(er){
                if (er.code == er.PERMISSION_DENIED) userCoords = {};
            });
        } else if(callback) {
            callback();
        }
    };

    $("body")
        .on("keyup", ".g-auto-complete-address-control", function(){
            var text = $(this).val();

            timeoutId = null;

            if(text !== ''){
                timeoutId = window.setTimeout(search, 1000, text);
            }
        })
        .on("mouseover", "#g-auto-complete-address-results li", function(){
            $(this).addClass("highlight");
        })
        .on("mouseout", "#g-auto-complete-address-results li", function(){
            $(this).removeClass("highlight");
        })
        .on("click", "#g-auto-complete-address-results li a", function(e){
            e.preventDefault();

            var link = $(this);
            var results = link.closest("div");
            var input = results.closest(".address-row").find("input:first");

            input.val(link.text());

            results.empty();
        })
        .on("focus", "[name='address']", function(){
            askForCurrentLocation();
        });
});
