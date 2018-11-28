app.service('articles', function(){
	var articleList = [
    { title: "What the Kleancierge",
    	whoPublished: "Vince Moley",
    	whoImage: "images/avatars/user-01.png",
    	datePublished: "Nov. 27, 2018",
    	image: "images/thumbs/featured/kleancierge_logo_fb.jpg",
    	link: "what_the_kleancierge.html"
    },
    { title: "Salt is for margaritas NOT your vehicle",
    	whoPublished: "Vince Moley",
    	whoImage: "images/avatars/user-01.png",
    	datePublished: "Nov. 27, 2018",
    	image: "images/thumbs/featured/road_salt.jpg",
    	link: "road_salt_margaritas.html"
    },
    { title: "My fleet is cleaner than yours",
    	whoPublished: "Vince Moley",
    	whoImage: "images/avatars/user-01.png",
    	datePublished: "Nov. 27, 2018",
    	image: "images/thumbs/featured/fleet.jpg",
    	link: "my_clean_fleet.html"
    }];

    this.featured = function(){
    	return articleList;
    }

    this.popular = function(){
        return articleList;
    }
});