jQuery(function($) {
	var loader = $('#html-loader').contents().get(0);

	console.log(loader);
	// TODO generate contents
	// $('#contents')
	$('.description').each(function() {
		var desc = $(this)
		  , href = desc.parent().find('h3 a').attr('href');

		console.log(href);

		$.get(href).done(function(data) {
			var description;
			loader.open();
			loader.write(data);
			loader.close();
			console.log(data);
			console.log(loader.innerHTML);
			description = $('meta[name="description"]', loader).text();
			desc.text(description);
		});
	});
	$('li').click(function(e) {
		if (e.target.tagName != 'A') { $(this).find('a').click(); }
		else { return false; } // disabled for now...
	});
});
