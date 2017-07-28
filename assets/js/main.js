'use strict';
!(function(){
	function getData(src){
		$.ajax({
			url: src,
			success: function(data){
				console.log(data);
				$.each(data,function( key,val ){
					var item = data[key];
					var html = '';
					var html_icons = '';
					var html_other = '';
					html += ' <li class="project col-12 col-md-6 mt-3 mt-md-0 mb-md-3 left text-right">';
					html += ' <a href="';
					html += item.link;
					html += '" target="_blank">';
					html += ' <div class="thumb" style="background-image:url('+item.thumbnail+')"></div>';
					html += ' <div class="text"><div class="helper py-3"><h3 class="col mb-2">';
					html += item.name;
					html += '</h3>';
					html += ' <ul class="col icons">';
					$.each(item.icons, function( icon_key,icon_name ){
						html += ' <li class="mr-3"><i class="fa fa-' + icon_name + '"></i></li>';
					});
					html += '</ul><ul class="col other">';
					$.each(item.other, function( feature_key,feature_name ){
						html += ' <li>' + feature_name + '</li>';
					});
					html += '</ul>';
					html += '</div></div>';							
					html += '</a>';
					html += '</li>';
					$('.projects').append(html);
					//$('.projects .icons').html(html_icons);
				});
			},
			error: function(error){
				console.error('Error: ',error)
			}
		});
	}

	getData( 'data.json' );

	function timeOfDay( currentHour ){
    	var partOfDay;
		if (currentHour > 12 && currentHour <= 5) {
			partOfDay = 'Late night';
		} else if (currentHour > 5 && currentHour <= 10) {
			partOfDay = 'Morning';
		} else if (currentHour > 10 && currentHour <= 17) {
			partOfDay = 'Afternoon';
		} else if (currentHour > 17 && currentHour <= 19) {
			partOfDay = 'Late afternoon';
		} else {
			partOfDay = 'Night';
		}
		return partOfDay;
	}

	function loadWeather( location, blocked ) {
		// Docs at http://simpleweatherjs.com
		$.simpleWeather({ 
		    location: location,
		    unit: 'c',
		    success: function( weather ) {
		    	var textString = weather.currently.toLowerCase();
		    	var typeOfWeather;

		    	if( textString.indexOf('sun') >= 0 ){
		    		typeOfWeather = 'clear';
		    	} else if( textString.indexOf('cloud') >= 0 ) {
		    		typeOfWeather = 'cloud';
		    	} else if( textString.indexOf('snow') >= 0 ) {
		    		typeOfWeather = 'snow';
		    	} else {
		    		typeOfWeather = 'rain';
		    	}

		    	var partOfDay = timeOfDay( new Date().getHours() );
		    	var temp = ( weather.country !== 'United States' ) ? weather.temp + '&deg; ' + weather.units.temp : weather.alt.temp + ' ' + weather.alt.unit;

		    	//console.log(weather);
		    	//console.log(partOfDay);
		    	customizeSite( partOfDay,typeOfWeather,temp,blocked,weather.text );
		    },
		    error: function(error) {
		      $("#weather").html('<p>'+error+'</p>');
		    }
		});
	}

	function customizeSite( partOfDay, weather, temp, blocked, weatherText ){
		var text,icon;
		var bodyClass = partOfDay.toLowerCase().replace(' ','_');
		if( blocked ){
			if( weather == 'clear' ){
				icon = 34;
			} else if( weather == 'cloud' ){
				icon = 26;
			} else if( weather == 'snow' ){
				icon = 42;
			} else { // any type of rain
				icon = 40;
			}
			text = weatherText +  ' over here in Querétaro, México';
		} else {
			switch( partOfDay ) {
				case 'Morning':
					if( weather == 'clear' ){
						icon = 34;
						text = 'Sun\'s shining... Grab some coffee and off to work!';
					} else if( weather == 'cloud' ){
						icon = 26;
						text = 'Hey! Don\'t forget your umbrella ;)';
					} else if( weather == 'snow' ){
						icon = 42;
						text = 'I guess we\'ll skip work today :D';
					} else { // any type of rain
						icon = 40;
						text = 'Hey! Don\'t forget your umbrella ;)';
					}
					break;
				case 'Afternoon':
					if( weather == 'clear' ){
						icon = 34;
						text = 'Beautiful day, leave this alone and go outside to play!';
					} else if( weather == 'cloud' ){
						icon = 26;
						text = 'I hope you brought your umbrella...';
					} else if( weather == 'snow' ){
						icon = 42;
						text = 'Better sit down for a while :(';
					} else { // any type of rain
						icon = 40;
						text = 'I hope you brought your umbrella...';
					}
					break;
				case 'Late afternoon':
					if( weather == 'clear' ){
						icon = 34;
						text = 'Well done today... let\'s go get some rest :)';
					} else if( weather == 'cloud' ){
						icon = 26;
						text = 'I hope you brought your umbrella...';
					} else if( weather == 'snow' ){
						icon = 42;
						text = 'Better sit down for a while :(';
					} else { // any type of rain
						icon = 40;
						text = 'I hope you brought your umbrella...';
					}
					break;
				case 'Night':
					if( weather == 'clear' ){
						icon = 33;
						text = 'Got any plans? It\'s clear outside :)';
					} else if( weather == 'cloud' ){
						icon = 26;
						text = 'Those clouds call for some take out + Netflix :P';
					} else if( weather == 'snow' ){
						icon = 42;
						text = 'How about some hot cocoa? ^ ^';
					} else { // any type of rain
						icon = 40;
						text = 'Those clouds call for some take out + Netflix :P';
					}
					break;
				case 'Late night':
					icon = 33;
					text = 'Wow, you should really get some sleep... . z Z';
					break;
			}
		}
		var html = text + '<span><i class="icon-' + icon + '"></i>' + temp + '</span>';

		$("#weather p").html(html);
		$('body').addClass( bodyClass + ' ' + weather );
	}

	navigator.geolocation.getCurrentPosition( 
		function( position ) {
		    loadWeather( position.coords.latitude + ',' + position.coords.longitude, undefined ); // Where in the world are you? 
		},
		function( error ){
			if (error.code == error.PERMISSION_DENIED)
			loadWeather( 'Querétaro', 1 );
		}
	);
})();