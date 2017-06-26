!(function(){
	$.getJSON('http://teamtreehouse.com/brunonavarrete.json',
		function(data){
			var badges = data.badges;
			$.each( badges, function( key, val ){
				var title = val.name + ' &mdash; Earned: ' + val.earned_date;
				var url = val.url;
				if( url.indexOf('html') >= 0 ){
					$('#badgerHTML').append('<img src="'+val.icon_url+'" alt="'+val.name+'" title="'+title+'">');
				} else if( url.indexOf('css') >= 0 || url.indexOf('sass') >= 0 ){
					$('#badgerCSS').append('<img src="'+val.icon_url+'" alt="'+val.name+'" title="'+title+'">');
				} else if( url.indexOf('javascript') >= 0 || url.indexOf('js') >= 0 || url.indexOf('jquery') >= 0 || url.indexOf('ajax') >= 0 ){
					$('#badgerJS').append('<img src="'+val.icon_url+'" alt="'+val.name+'" title="'+title+'">');
				} else {
					$('#badgerOther').append('<img src="'+val.icon_url+'" alt="'+val.name+'" title="'+title+'">');

				}
			});
		}
	).fail(function(x){
		alert(x.status+' '+x.statusText);
	});
})();