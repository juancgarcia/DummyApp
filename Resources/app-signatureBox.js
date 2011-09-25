// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var PhoneHomeModule = require('lib/PhoneHomeModule');

//
// create base UI tab and root window
//
var win = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#ddd'
    //backgroundImage:'clear.png'
});

var wrapper = Ti.UI.createView({
	width:'95%',
	top:-2,
	height:300,
	borderColor:'#aaa',
	borderWidth:2,
	backgroundColor:'#fff'
});

var wrapperShadow = Ti.UI.createView({
	width:'95%',
	height:2,
	backgroundColor:'#bbb',
	top:297
});

win.add(wrapper);
win.add(wrapperShadow);

var doneButton = Ti.UI.createButton({
	backgroundImage:'blue.png',
	title:'Done',
	width:90,
	height:35,
	right:12,
	bottom:10,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14},
	opacity:0
})
 
var clearButton = Ti.UI.createButton({
	backgroundImage:'clear.png',
	width:26,
	height:27,
	right:20,
	top:10
});
 
win.add(doneButton);
wrapper.add(clearButton);
 
var cancelButton = Ti.UI.createButton({
	backgroundImage:'gray.png',
	title:'Cancel',
	width:90,
	height:35,
	left:12,
	bottom:10,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14},
});
 
win.add(cancelButton);

var terms = Ti.UI.createLabel({
	text:'I agree that this demo is very very cool.\nCan we get a shout out?',
	textAlign:'center',
	width:'auto',
	height:'auto',
	font:{fontFamily:'Arial',fontSize:12},
	color:'#555',
	shadowColor:"#fff",
	shadowOffset:{x:1,y:1},
	bottom:12
});
 
win.add(terms);

// our signature line is simply a 2px view
var sigLine = Ti.UI.createView({
	width:'90%',
	height:2,
	backgroundColor:'#aaa',
	bottom:40
});


var sigName = Ti.UI.createLabel({
	text:'Jeff Haynie',
	textAlign:'center',
	width:'auto',
	height:'auto',
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:18},
	color:'#999',
	bottom:10
});


var thex = Ti.UI.createLabel({
	text:'X',
	textAlign:'center',
	width:'auto',
	height:'auto',
	font:{fontFamily:'Arial',fontSize:24},
	color:'#aaa',
	bottom:45,
	left:20
});

var price = Ti.UI.createLabel({
	text:'$9.99',
	width:'auto',
	height:'auto',
	left:25,
	top:8,
	color:'#333',
	font:{fontFamily:'Arial',fontSize:54},
	shadowColor:"#eee",
	shadowOffset:{x:1,y:1}
});
win.add(price);
 
var payto = Ti.UI.createLabel({
	text:'Pay to: Appcelerator, Inc.',
	width:'auto',
	height:'auto',
	left:28,
	top:70,
	color:'#777',
	font:{fontFamily:'Arial',fontSize:12},
	shadowColor:"#eee",
	shadowOffset:{x:0,y:1}
});

win.add(payto);
wrapper.add(sigLine);
wrapper.add(sigName);
wrapper.add(thex);


var paint = Ti.p

var doEvent = function(e) {
	PhoneHomeModule.sendMessage('sendMessage')
};
win.addEventListener('focus', doEvent );

win.open();
