jQuery(function($) {
	// TODO generate contents
	// $('#contents')
	$('.description').each(function() {
		var desc = $(this)
		  , href = desc.parent().find('h3 a').href;

		console.log(href);

		// TODO extract description
		$.get(href).done(function(data) {
			var html        = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null)
			  , fragment    = html.parseFragment(data, false, null, html)
			  , description = $('meta[name="description"]', fragment).text();
			
			desc.text(description);
		});
	});
	$('li').click(function(e) {
		if (e.target.tagName != 'A') { $(this).find('a').click(); }
		else { return false; } // disabled for now...
	});
});
