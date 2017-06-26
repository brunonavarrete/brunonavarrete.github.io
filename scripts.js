!(function(){
	$.getJSON('https://teamtreehouse.com/brunonavarrete.json',
		function(data){
			var badges = data.badges;
			$.each( badges, function( key, val ){
				var title = val.name + ' &mdash; Earned: ' + val.earned_date;
				var url = val.url;
				var badgeClass = '';
				if( url.indexOf('html') >= 0 ){
					badgeClass = 'html';
				} else if( url.indexOf('css') >= 0 || url.indexOf('sass') >= 0 ){
					badgeClass = 'css';
				} else if( url.indexOf('javascript') >= 0 || url.indexOf('js') >= 0 || url.indexOf('jquery') >= 0 || url.indexOf('ajax') >= 0 || url.indexOf('ES2015') >= 0 ){
					badgeClass = 'javascript';
				} else if( url.indexOf('version') >= 0 || url.indexOf('git') >= 0 || url.indexOf('hub') >= 0 ){
					badgeClass = 'git';
				} else {
					badgeClass = 'others';
				}

				$('#badges > div').append('<div data-badge-title="'+title+'" class="badge '+badgeClass+'" data-type="'+badgeClass+'"><img src="'+val.icon_url+'" alt="'+val.name+'" title="'+title+'"></div>');

			});
		}
	).fail(function(x){
		alert(x.status+' '+x.statusText);
	});
	$('#color-code ul li').hover(function(){
		var badges = $(this).data('badges');
		$('#color-code ul li').removeClass('active');
		$(this).addClass('active');
		$('.badge').removeClass('active');
		$('.badge.'+badges).addClass('active');
	});
	$(document).on('mouseenter','.badge',function(){
		var title = $(this).attr('data-badge-title');
		var type = $(this).data('type');
		$('.badge').removeClass('active');
		$('.badge.'+type).addClass('active');
		$('#badge-title').show().text(title);
	});
})();