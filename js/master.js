jQuery(function($) {
	var loader = $('#html-loader');

	function write(data) {
		var d = loader.contents().get(0);
		d.open();
		if (data) { d.write(data); }
		d.close();
	}
	write();

	// TODO generate contents
	// $('#contents')

	$('.description').each(function() {
		var $$   = $(this)
		  , href = $$.parent().find('h3 a').attr('href');

		$.get(href).done(function(data) {
			var desc;

			loader.one('load', function() {
				desc = $(this).contents().find('meta[name="description"]');
				$$.text(desc.attr('content'));
			});
			write(data);
		});
	});

	$('li').click(function(e) {
		if (e.target.tagName != 'A') { $(this).find('a').click(); }
		else { return false; } // disabled for now...
	});

});
