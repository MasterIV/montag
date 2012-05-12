
function system( msg, color ) {
	if( color ) output( $( '<div class="sysmsg">' ).css( 'color', color ).text( '» '+msg ));
	else output( $( '<div class="sysmsg">' ).text( '» '+msg ));
}

function output( msg ) {
	$( '#chat_content > div' ).append( msg );
	$( '#chat_content' ).scrollTop( $( '#chat_content div' ).height() );
}

function adduser( id, name, points ) {
	var name = $( '<span class="name">').text( name );
	var points = $( '<span class="points">').html( ' ('+Number( points )+' Punkte)' );
	$( '#chat_users' ).append( $( '<div id="user_'+id+'" class="user">').append( name ).append( points ));
}

function setpoints( id, points ) {
	$( '#user_'+id+' .points' ).html( ' ('+Number( points )+' Punkte)' );
}

function say( id, message ) {
	var msg = $( '<span>' ).text( message );
	var from = $( '<span class="username">' ).text( $( '#user_'+id+' .name' ).text()+': ');

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
	if(text.length == 0)
		return false;
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

function request_paint( requeue ) {
	socket.emit( 'painter_request', requeue );
}

function screen_clear() {
	game.screen_clear();
	socket.emit( 'screen_clear',{} );
}

function color_set( color_dom ){
	var color = $(color_dom).data('color');
	socket.emit( 'color_set',{color:color} );
}

function send_fb_login() {
	fbcheck(client_respons_fb);
	
	//socket.emit('fbstate',{"fbstate" : fbcheck()});
}
function client_respons_fb (resp){
		
	if (resp !== false){
		$('#login').unbind('click');
		$('#login').text('Loading ...');
		socket.emit('fbstate',{"accessToken" : resp.authResponse.accessToken, "uid" : resp.authResponse.userID});
	}
	else {
		$('#login').unbind('click');
		$('#login').bind("click", fblogin);
	}
}



function realname_set(name) {
	$('#login').text('Hallo '+name);
}