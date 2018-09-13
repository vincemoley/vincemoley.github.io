(function($){
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	var psi = $(".play-store-image");
	var asi = $(".app-store-image");

    if (/android/i.test(userAgent)) {
        psi.show();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        asi.show();
    } else {
    	psi.show();
    	asi.show();
    }
})(jQuery);