jQuery(function($) {

	function log(value) { if (console) console.log(value); }

	var IFRAME = $('<IFRAME FRAMEBORDER="0" STYLE="display: none;">');

	function getContext() {
		var context = IFRAME.contents().get(0);

		context.open();
		context.writeln('<!DOCTYPE HTML>');
		context.writeln('<STYLE>');
		context.writeln('  html { overflow: hidden; }');
		context.writeln('  body { margin: 0; }');
		context.writeln('</STYLE>');
		context.close();

		return context;
	}
	$('body').append(IFRAME);

	function prepareDocument() {
		var context = IFRAME.contents().get(0);
		context.open();
		context.close();
	}
	prepareDocument();

	function Player(attr) {
		this.context = getContext();

		this.video = $('<VIDEO>', this.context).attr(attr);
		this.video.bind('error', function(e) { log(this.error); });

		$('body', this.context).html(this.video);

		return this;
	};

	(function(proto) {
		proto.open = function(src, callback) {
			this.src = src;

			var mp4 = $('<SOURCE>', this.context).attr({
				type: 'video/mp4',
				src: src.mp4
			});
			var ogv = $('<SOURCE>', this.context).attr({
				type: 'video/ogg; codecs="theora, vorbis"',
				src: src.ogv
			});

			this.video.one('canplay', callback).append(mp4).append(ogv);
		};
		
	})(Player.prototype);

	$.fn.video = function(callback) {
		var attr = { height: this.height(), width: this.width() },
		    href = this.attr('href');

		this.replaceWith(IFRAME.attr(attr).show());
		var player = new Player(attr);

		player.open({
			mp4: href,
			ogv: href.replace(/mp4$/, 'ogv')
		}, callback);

		return player.video;
	};

});
