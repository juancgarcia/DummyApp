var appNamespace = {};

Ti.include('dummyApp/grid.js');

appNamespace.ui = {};
Ti.include('dummyApp/styles.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


var winStats,
	wrapperConfig,
	gameContainer,
	gameBoard,
	puzzleGrid;

var win = Titanium.UI.createWindow({ backgroundColor:'#ddd' });
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
	Titanium.UI.UPSIDE_PORTRAIT
];


win.addEventListener('open', function() {
	
	winStats = win.size;
	
	var dollar = $$;/*{
		platformMin: Math.min(winStats.width, winStats.height),
		platformMax: Math.max(winStats.width, winStats.height),
		containerShrink: .9
	};*/dollar.containerShrink = .9;

	var scrollerSize = function() {
		var _size = {}, _minDimension = Math.min(winStats.width * dollar.containerShrink, winStats.height * dollar.containerShrink);
		_size.width = Math.floor(_minDimension/*winStats.width * .9*/);
		_size.height = Math.floor(_minDimension/*winStats.height * .75*/);
		return _size;
	};
	
	gameContainer = Ti.UI.createView({/*Ti.UI.createScrollView({*/
		width: dollar.platformMin * dollar.containerShrink,
		//top:0,
		height: dollar.platformMin * dollar.containerShrink,
		borderColor:'#aaa',
		borderWidth:2,
		backgroundColor:'#fff',
		//scrollType: 'horizontal'
	});
	
	overlay = Ti.UI.createView({/*Ti.UI.createScrollView({*/
		width: dollar.platformMin * dollar.containerShrink,
		height: dollar.platformMin * dollar.containerShrink,
		top:0
	});
	
	
	gameBoard = Ti.UI.createView({
		//top:0,
		//left:0
	});
	
	win.add(gameContainer);
	gameContainer.add(gameBoard);
	//win.add(gameBoard);
	win.add(overlay);
	
	// gameBoard.addEventListener('touchmove', function(e){
		// Ti.API.info('gameBoard touched');
		// //var _scrollType = gameBoard.scrollType;
		// //Ti.API.info('gameBoard scrollType: '+_scrollType);
	// });
	
	var gridConfig = {
		rows: 4,
		cols: 4,
		size: Math.min(dollar.platformMin * dollar.containerShrink, dollar.platformMin * dollar.containerShrink),
		containerObj: gameBoard
	};
	
	gridConfig.subSize = Math.floor(gridConfig.size/Math.max(gridConfig.cols, gridConfig.rows));
	
	gameBoard.width = gridConfig.subSize * gridConfig.cols;
	gameBoard.height = gridConfig.subSize * gridConfig.rows;
	puzzleGrid = Grid.createGrid(gridConfig);
	
	// default state is zoom-in
	zoomState = Boolean(true);
	
	var zoomMe = function(config) {
		var multi = 2;
		if(config)
			multi = config.multi;
		
		var viewObj = this.collection[config.index];
		viewObj.height = viewObj.height * multi;
		viewObj.width = viewObj.width * multi;
	};
	
	toggleZoom = function(){
		if(zoomState) {
			//add zoom-in callback
			// 2x zoom in
			Grid.loop(puzzleGrid, zoomMe, {multi: 2});
		}
		else {
			//add zoom-out callback
			// 2x zoom out
			Grid.loop(puzzleGrid, zoomMe, {multi: .5});
		}
		zoomState = !zoomState;
	};
	
	//var assignZoom = function(config) {		
		//gameBoard.addEventListener('doubletap', toggleZoom );
	//};

	var transformPrimary = Titanium.UI.create2DMatrix().scale(1.0);
	
	var animatePrimary = Titanium.UI.createAnimation();
	animatePrimary.transform = transformPrimary;
	animatePrimary.duration = 600;

	// when this animation completes, scale to normal size
	// a.addEventListener('complete', function()
	// {
	    // // we can use the identity transform to take it back to it's real size
	    // var t2 = Titanium.UI.create2DMatrix();
	    // w.animate({transform:t2, duration:200});
	// });
	
	var zoomed_in = false;
 
	overlay.addEventListener(/*'scale'*/'doubletap', function(e)
	{		 
        if (!zoomed_in)
        {   
			var xUnits = e.x / gridConfig.subSize;
			var yUnits = e.y / gridConfig.subSize;
			
			var xTrans = -1 * gridConfig.subSize * getTransFromGridUnits(xUnits);
			var yTrans = -1 * gridConfig.subSize * getTransFromGridUnits(yUnits);
			
			
        	var tempTrans = Titanium.UI.create2DMatrix().scale(2.0).translate( xTrans, yTrans);
        	var tempAnim = Titanium.UI.createAnimation();
			tempAnim.transform = tempTrans;
			tempAnim.duration = 600;
			
			gameContainer.animate(tempAnim);
            overlay.width = 0;
            overlay.height = 0;
            
        	zoomed_in = !zoomed_in;
        	e.handled = true;
        }
	});	
 
	/*gameContainer*//*gameBoard*/win.addEventListener(/*'scale'*/'doubletap', function(e)
	{		 
        if (!e.handled && zoomed_in)
        {   
            gameContainer.animate(animatePrimary);
            overlay.width = dollar.platformMin * dollar.containerShrink;
            overlay.height = dollar.platformMin * dollar.containerShrink;
            
        	zoomed_in = !zoomed_in;
        }
	});
	
	
	/*		
	// [0-1.5) no trans
	// (1.5-2.5) trans 1 subsize unit
	// (2.5-4) trans 2 subsize units
	*/
	var getTransFromGridUnits = function(units){
		if(units < 1.5)
			return 0;
			
		else if(units < 2.5)
			return 1;
			
		else
			return 2;
	};
	
	
	//var gridSize = Math.max(scrollerSize().height, scrollerSize().width);
	//var gridSubSize = Math.floor(gridSize/Math.max(cols, rows));
	
});

win.open();
