
var auth = {
	token: null,

	init: function(){
		FB.init({
			appId : '456606837688818',
			status: true,
			cookie: true,
			xfbml : true,
			oauth : true
		});

		FB.getLoginStatus( this.response );
		FB.Event.subscribe('auth.authResponseChange', this.response);
		FB.Event.subscribe('auth.login', this.response );
	},

	response: function(response) {
		if (response.status === 'connected') {
			set_fb_button('Loading ...');
			var token = response.authResponse.accessToken;
			var uid = response.authResponse.userID;
			socket.emit( 'login', {"accessToken" : token, "uid": uid});
		} else {
			set_fb_button( 'Login', auth.login );
		}
	},

	login: function(){
		FB.login();
	},

	realname_set: function(name) {
		$('#login').text('Hallo '+name);
	}

}
