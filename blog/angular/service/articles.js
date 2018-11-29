app.service('articles', function(){
	var articles = [
    { id: 1,
        title: "What the Kleancierge",
    	whoPublished: "Vince Moley",
    	whoImage: "images/avatars/user-01.png",
    	datePublished: "Nov. 27, 2018",
    	bgImage: "images/thumbs/featured/kleancierge_logo_fb.jpg",
        lead: "\"Siiiiiighhhhh.  Ok I'll take care of this tonight.\" This is what I said to myself every morning as I walked to my vehicle and got in.  I'm far from a slob, but living in Pennsylvania, being a busy professional, throw in a dog and it's tough NOT to have a dirty vehicle.  AND who's got 2+ hours that they're willing to clean it?!?  I'd rather go for a run, spend time w/ loved ones, relax, watch football, I could go on and on with things I'd rather do than wash my vehicle...",
        content_1: "Then, on a trip to south Florida, to visit my brother and his fiance at the time, I was having a conversation with friends about how there's NOT an app to schedule a mobile detailing appointment like hailing a ride with Uber or Lyft...  By my surprise, S. Florida had such app and I thought my prayers had been answered!  Back to Pa I went with app en tow... err on phone.  To my dismay, said app only covered S. Florida, and after doing some research, the few other apps only covered a small region(s) too...",
        content_2: "I'm a software engineer and I love a good challenge.  I set off to learn more about the vehicle detailing industry.  After a few weeks of networking I met a gentleman who sells detailing products nationwide.  We setup a meeting and I told him my \"crazy\" idea of building an app so anyone, anywhere can find a detailer in their area, schedule an appointment and pay without leaving their home or office.  He grew a grin on his face like the Grinch imagining his next caper.  I could see the gears turning and that set off hours of " + 
        "brainstorming, which lead to weeks and months of planning, prototyping and developing." + 
        "\r\n\r\nAlong the way, I spent countless hours interviewing detailers, learning their pain points, the products they use, in what concentration, how they apply them and most of all how much pride they take in their work.  It was refreshing to speak with detailer after detailer and hear the exact same thing, which was, how much every detailer enjoyed taking someone's vehicle from its current state to showroom quality and then seeing the owner's face once they were finished.  I was and still am fired up to help these men & women!",
        content_3:"That brings us to today, about 2 years after I first started working on Kleancierge.  The Kleancierge platform is finally live in York, Pa (my home town), the Potomac, MD area and Orlando, FL.  Vehicle owners are learning about the app through social media, google searches, word of mouth, my smiling face and this blog.  Appointments are being scheduled, completed and vehicle owners could not be happier!  Detailers are being found and doing what they do best!",
        content_4: "However, this is only the first inning.  There's a big world out there and it's filled with dirty vehicles, owners with better things to do and professional detailers waiting to bring a smile to their face.  If you're a vehicle owner, with a dirty vehicle, download the app and schedule an appointment!  Stop waiting, because you deserve a smile on your face!",
        contentQuote: "how much every detailer enjoyed taking someone's vehicle from its current state to showroom quality and then seeing the owner's face once they were finished",
        postImages: ["images/thumbs/post/IMG_0748.JPG", "images/thumbs/post/IMG_0380.JPG"]
    },
    {  id: 2,
        title: "Salt is for margaritas NOT your vehicle",
    	whoPublished: "Vince Moley",
    	whoImage: "images/avatars/user-01.png",
    	datePublished: "Nov. 27, 2018",
    	bgImage: "images/thumbs/featured/road_salt.jpg",
        lead: "",
        content: "",
        postImages: []
    },
    {  id: 3,
        title: "My fleet is cleaner than yours",
    	whoPublished: "Vince Moley",
    	whoImage: "images/avatars/user-01.png",
    	datePublished: "Nov. 27, 2018",
    	bgImage: "images/thumbs/featured/fleet.jpg",
        lead: "",
        content: "",
        postImages: []
    }];

    this.retrieveById = function(id){
        for(var idx in articles){
            var article = articles[idx];

            if(article.id === id) return article;
        }

        return null;
    }

    this.featured = function(){
    	return articles;
    }

    this.popular = function(){
        return articles;
    }
});