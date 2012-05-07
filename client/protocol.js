var protocol = {
	init: function( data ) {
		console.log( data );

		self = data.id;
		game.color = game.allcolor[data.color];

		for( var i = 0; i < data.users.length; i++)
			adduser( data.users[i].id, data.users[i].name, data.users[i].points );

		system( 'Verbindung hergestellt.' );

		if( data.countdown > 0 ) {
			game.start( data.countdown );
		}
	},

	join: function( data ) {
		adduser( data.id, data.name, data.points );
		system( data.name+' hat den chat betreten.' )
	},

	leave: function( data ) {
		system( $( '#user_'+data.id+' .name' ).text()+' hat den chat verlassen.' )
		$( '#user_'+data.id ).remove();
	},

	say: function( data ) {
		say( data.user, data.text );
	},

	info: function( data ) {
		system( data.text, data.color );
	},

	name: function( data ) {
		var old = $( '#user_'+data.user+' .name' ).text();
		system( old+' heißt nun '+data.name );
		$( '#user_'+data.user+' .name' ).text( data.name );
	},

	screen_clear: function( data ) {
		game.screen_clear();
	},

	pen_down: function( data ) {
		game.before.x = data.x;
		game.before.y = data.y;
	},

	pen_move: function( data ) {
		game.draw_line( data.x, data.y );
	},

	game_new: function( data ) {
		var name = $( '#user_'+data.painter+' .name' ).text();
		system( 'Eine neue Runde hat begonnen, der Maler ist '+name, '#000088' );
		game.start();
	},

	game_word: function( data ) {
		game.ispainter = true;
		system( 'Du bist an der Reihe! Male das folgende Wort: '+data.word, '#000088' );
		game.start();
	},

	game_resolve: function( data ) {
		game.ispainter = false;

		setpoints( data.winner.id, data.winner.points );
		setpoints( data.painter.id, data.painter.points );

		system( data.winner.name+' Wort zu erraten. Das Wort lautete: '+data.word, '#008800' );
		game.end();
	},

	game_end: function( data ) {
		game.ispainter = false;
		system( 'Leider hat es keiner geschafft das Wort zu erraten. Das Wort lautete: '+data.word, '#880000' );
		game.end();
	},

	color_set: function( data ) {
		game.color = game.allcolor[data.color];
	}


}