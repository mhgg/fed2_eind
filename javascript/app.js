var APP = APP || {};

//anonieme functie
(function () {
	// Controller Init
	APP.controller = {
		init: function () {
			// Initialize router
			APP.router.init();
		}
	};

	// Router
	APP.router = {
		init: function () {
	  		routie({
			    '/game': function() {
			    	APP.page.game();
				},
			    '/ranking': function() {
			    	APP.page.ranking();
			    },

			    '/schedule': function() {
			    	APP.page.schedule();
			    },

				'/updateScore/:id': function(id) {
					console.log("updateScore" + id );
			    	APP.page.updateScore();
			    },
			    '*': function() {
			    	APP.page.game();
			    }
			});
		},

	change: function () {
            var route = window.location.hash.slice(2)
			route = route.split("/")[0];
			
            var    sections = qwery('section');
            var   section = qwery('[data-route=' + route + ']')[0];

            // Show active section, hide all other
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

	}
	};

	// Pages
	APP.page = {		
		game: function () {
			Transparency.render(qwery('[data-route=game')[0], APP.game);
			APP.router.change();
		},

		schedule: function () {
			promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19219&fields=%5Bid%2C%20pool%2C%20start_time%2C%20team_1%2C%20team_1_score%2C%20team_2%2C%20team_2_score%5D').then(function(error, text, xhr) {
				if (error) {
					alert('Error ' + xhr.status);
					return;
				}
				
			var json = JSON.parse(text);
			var pool = json.objects;
			console.log(pool);
			
			Transparency.render(qwery('[data-bind=scheduleTable')[0], pool);
			APP.router.change();
			
			});
		},

		ranking: function () {
			promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389').then(function(error, text, xhr) {
				if (error) {
					alert('Error ' + xhr.status);
					return;
				}
				
			var json = JSON.parse(text);
			var pool = json.objects[3];
			console.log(pool);
			
			Transparency.render(qwery('[data-route=ranking')[0], pool);
			APP.router.change();
			
			});
		},		
		
		updateScore: function (id) {
			promise.get('https://api.leaguevine.com/v1/games/129763/').then(function(error, text, xhr) {
				if (error) {
					alert('Error ' + xhr.status);
					return;
				}
				
			var data = JSON.parse(text);
			console.log
			console.log(pool);
			
			Transparency.render(qwery('[data-route=updateScore')[0], data);
			APP.router.change();
			
			});
	    }
	}
	// DOM ready
	domready(function () {
		// start van de applicatie wanneer content geladen is
		APP.controller.init();
	});
	
})();
