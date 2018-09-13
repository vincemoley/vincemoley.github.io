(function($){
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        $(".play-store-image").show();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        $(".app-store-image").show();
    }
})(jQuery);