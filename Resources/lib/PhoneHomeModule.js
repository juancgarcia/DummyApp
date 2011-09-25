var notifyMessageSent = function(msg){
	alert(msg);  
}

exports = {
	foo: function(str){
		alert('foo' + str);
	},
	sendMessage: function() {
		setTimeout( function() {
				notifyMessageSent('we waited on the timer')
			},
		5000);
	}
};