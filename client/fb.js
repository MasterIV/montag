function fbini(){
		 FB.init({
            appId      : '456606837688818',
            status     : true, 
            cookie     : true,
            xfbml      : true,
            oauth      : true
          });
}

function fblogin(){
	FB.login();
}

function fbcheck(callback){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			callback(response);
		  } else {
			  callback(false);
		  }
 });
	
}