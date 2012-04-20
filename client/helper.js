
function system( msg ) {
	output( $( '<div class="sysmsg">' ).text( '>>> '+msg ));
}

function output( msg ) {
	$( '#chat_content > div' ).append( msg );
	$( '#chat_content' ).scrollTop( $( '#chat_content div' ).height() );
}

function adduser( id, name ) {
	$( '#chat_users' ).append( $( '<div id="user_'+id+'" class="username">').text( name ));
}

function say( id, message ) {
	var msg = $( '<span>' ).text( message );
	var from = $( '<span class="username">' ).text( $( '#user_'+id ).text()+': ');

	if( id == self ) {
		msg.css( 'font-style', 'italic' );
		from.css( 'color', 'red' );
	} else {
		from.css( 'color', 'blue' );
	}

	output( $( '<div>' ).append( from ).append( msg ));
}

function sendform( form ) {
	var text = form.chat_input.value;
	form.chat_input.value = '';

	if( text.substr( 0, 1 ) == "/" ) {
		var args = text.substr( 1 ).split( " " );
		var cmd = args.shift();

		if( cmd == "help" ) {
			system( "On my ToDoList: creating a Help File" );
		} else if( cmd == "nick" ) {
			if( args.length ) socket.emit( 'name', args.shift());
			else system( 'Bitte einen Namen angeben...' );
		} else {
			system( "Unknown Command: "+cmd );
		}
	} else {
		socket.emit( 'say', text );
		say( self, text );
	}


	return false;
}