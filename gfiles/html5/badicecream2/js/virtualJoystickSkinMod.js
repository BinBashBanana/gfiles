const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if(!isMobile){
	window.addEventListener('load', ()=>{
		document.body.style.backgroundImage = 'url(./skin/poki-nitrome_border.png)';
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundPosition = 'center';
	});
}

(function (){
	var scope = {};

	scope.gameCanvas = null;
	scope.skinnerObject = null;
	scope.target = null;
	scope.edgeLeft = null;
	scope.edgeRight = null;
	scope.logo = null;
	scope.home = null;
	scope.pauseBut = null;
	scope.pokiLogo = null;
	scope.frameConfig = {width:480, height:480};
	scope.portraitOffset = 0;
	scope.isOnPoki = new URLSearchParams(window.location.search).has('tag');

	scope.getPortraitOffset = function(){
		const landscape = window.innerWidth > window.innerHeight;
		const aspect = window.innerWidth/window.innerHeight;
		const isIpad = (!landscape && aspect >= 0.75) || (landscape && aspect <= 1.34);

		if(landscape){
			scope.portraitOffset = 0;
			window["setStageDimensions"](0, 0, "100%", "100%");
		}else{

			if(isIpad){
				const frameHeight = window.innerWidth;
				const gap = (window.innerHeight-frameHeight)/2;
				scope.portraitOffset = -(gap-gap*(0.5/3));
				window["setStageDimensions"](0, scope.portraitOffset, "100%", "100%");
			}else{
				const frameHeight = window.innerWidth;
				const gap = (window.innerHeight-frameHeight)/2;
				scope.portraitOffset = -(gap-gap*(2/3));
				window["setStageDimensions"](0, scope.portraitOffset, "100%", "100%");
			}
		}
	}

	scope.placeSprites = function(){
		scope.edgeLeft = scope.target.domElement.parentNode.appendChild(scope.createTile(scope.skinnerObject.sprites['edge.png']));
		scope.edgeRight = scope.target.domElement.parentNode.appendChild(scope.createTile(scope.skinnerObject.sprites['edge.png']));

		scope.logo = scope.target.domElement.parentNode.appendChild(scope.skinnerObject.createImage(scope.skinnerObject.sprites['nitrome_small.png']));
		scope.logo.style.pointerEvents = 'all';
		scope.logoPresses = 0;
		scope.logo.addEventListener('touchstart', ()=>{

			scope.logoPresses++;

			if(scope.logoReleaseTimeout) clearTimeout(scope.logoReleaseTimeout);
			scope.logoReleaseTimeout = setTimeout(()=>{
				scope.logoPresses = 0;
			}, 1000);

			if(scope.logoPresses === 3){
				const gameboySkin = 'sepia(1) hue-rotate(20deg) brightness(0.65) saturate(0.9)';
				document.documentElement.style.transition = 'filter 0.5s cubic-bezier(.96,.29,.83,.67) 0s';
				if(document.documentElement.style.filter === gameboySkin) document.documentElement.style.filter = 'unset';
				else document.documentElement.style.filter = gameboySkin;
			}

		})

		if(!scope.isOnPoki){
			scope.home = scope.target.domElement.parentNode.appendChild(scope.skinnerObject.createImage(scope.skinnerObject.sprites['home.png']));
			scope.home.style.pointerEvents = 'all';
			scope.home.style.touchAction = 'none';

			scope.home.ontouchstart = ()=>{
				scope.home.src = scope.skinnerObject.sprites['home_down.png'];
			}
			scope.home.ontouchend = ()=>{
				scope.home.src = scope.skinnerObject.sprites['home.png'];
				window.history.back();
			}
		}

		scope.pauseBut = document.createElement('div');
		scope.pauseBut.style.visibility = 'hidden';
		scope.pauseBut.style.position = 'absolute';
		scope.target.domElement.parentNode.appendChild(scope.pauseBut);
		const pauseButtonImage = scope.skinnerObject.createImage(scope.skinnerObject.sprites['pause.png']);
		pauseButtonImage.style.transform = 'unset';
		pauseButtonImage.onload = ()=>{
			scope.pauseBut.style.width = `${pauseButtonImage.width}px`;
			scope.pauseBut.style.height = `${pauseButtonImage.height}px`;
			scope.pauseBut.style.visibility = 'visible';
		}
		scope.pauseBut.appendChild(pauseButtonImage);
		scope.pauseBut.style.pointerEvents = 'all';
		scope.pauseBut.style.touchAction = 'none';
		scope.pauseBut.ontouchstart = ()=>{
			scope.target.triggerKeyEvent('keydown', 'P'.charCodeAt(0));
			setTimeout(()=>{scope.target.triggerKeyEvent('keyup', 'P'.charCodeAt(0))}, 50);
			const bounds = scope.gameCanvas.getBoundingClientRect();
			try{
				if(scope.gameCanvas){
					let touchEvent;
					if(scope.isPaused){
						touchEvent = new Event('touchend');
						touchEvent.touches = touchEvent.changedTouches = [{clientX: bounds.left+bounds.width/2, clientY: bounds.top+5}];
					}else{
						touchEvent = new Event('touchstart');
						touchEvent.touches = touchEvent.changedTouches = [{clientX: bounds.left+bounds.width-10, clientY: bounds.top+10}];
					}
					scope.gameCanvas.dispatchEvent(touchEvent)
					scope.isPaused = !scope.isPaused;
				}
			}catch(e){
				console.log(e);
			}

			pauseButtonImage.src = scope.skinnerObject.sprites['pause_down.png'];
		}
		scope.pauseBut.ontouchend = ()=>{
			pauseButtonImage.src = scope.skinnerObject.sprites['pause.png'];
		}

		scope.pokiLogo = scope.target.domElement.parentNode.appendChild(scope.skinnerObject.createImage(scope.skinnerObject.sprites['poki_large.png']));
		scope.pokiLogo.style.transform = 'unset';
		scope.pokiLogo.style.bottom = '6px';
		scope.pokiLogo.style.right = '6px';
	}

	scope.resize = function(){
		const landscape = window.innerWidth > window.innerHeight;


		const aspect = window.innerWidth / window.innerHeight;

		const isIpad = (!landscape && aspect >= 0.75) || (landscape && aspect <= 1.34);
		const edgeSize = 9;
		scope.getPortraitOffset();
		const topItemsMargin = 20;

		//have to reset the bounding rect after every repositioning
		scope.target.virtualJoystick.boundingRect = null;


		const preloader = document.querySelector('#nitrome-preloader');

		scope.pokiLogo.src = scope.skinnerObject.sprites['poki_large.png'];



		if(landscape){
			const frameWidth = window.innerHeight;
			const gap = (window.innerWidth-frameWidth)/2;

			scope.edgeLeft.style.left = `${gap}px`;
			scope.edgeLeft.style.top = `0px`;
			scope.edgeLeft.style.height = `${window.innerHeight}px`;
			scope.edgeLeft.style.width = `${edgeSize}px`
			scope.edgeLeft.style.transform = 'translate(-100%, 0%)';

			scope.edgeRight.style.left = `${gap+frameWidth}px`;
			scope.edgeRight.style.top = `0px`;
			scope.edgeRight.style.height = `${window.innerHeight}px`;
			scope.edgeRight.style.width = `${edgeSize}px`
			scope.edgeRight.style.transform = 'translate(0%, 0%) rotateZ(180deg)';

			scope.logo.src = scope.skinnerObject.sprites['nitrome_small.png'];

			scope.logo.style.left = `unset`;

			if(!isIpad){
				scope.logo.style.top = `${topItemsMargin}px`;
				scope.logo.style.right = `${topItemsMargin*2.3}px`;
				scope.logo.style.transform = 'translate(-100%, 10%)';
			}else{
				scope.logo.style.top = `${topItemsMargin*2}px`;
				scope.logo.style.right = `${topItemsMargin}px`;
				scope.logo.style.transform = 'translate(-6%, 100%)';
			}

			if(scope.home){
				scope.home.style.top = scope.home.style.left = `${topItemsMargin}px`;
				scope.home.style.transform = 'unset';
			}

			scope.pauseBut.style.top = scope.pauseBut.style.right = `${topItemsMargin}px`;
			scope.pauseBut.style.left = `unset`;
			scope.pauseBut.style.transform = 'unset';

			scope.skinnerObject.joystickElement.style.left = `${gap/2-edgeSize/2}px`;
			scope.skinnerObject.joystickElement.style.top = `unset`;
			scope.skinnerObject.joystickElement.style.bottom = `80px`;

			scope.skinnerObject.buttonsElement.style.left = `unset`;
			scope.skinnerObject.buttonsElement.style.right = `${gap/2-edgeSize/2}px`;
			scope.skinnerObject.buttonsElement.style.top = `unset`;
			scope.skinnerObject.buttonsElement.style.bottom = `80px`;
			scope.skinnerObject.buttonsElement.style.paddingLeft = 'unset';

			if(preloader){
				preloader.style.top = `${window.innerHeight/2}px`;
			}

			if(isIpad){
				scope.pokiLogo.src = scope.skinnerObject.sprites['poki_small.png'];
			}

		}else{
			const frameHeight = window.innerWidth;
			const gap = (window.innerHeight-frameHeight)/2;

			scope.edgeLeft.style.left = `${window.innerWidth/2}px`;
			scope.edgeLeft.style.top = `${gap-edgeSize/2+scope.portraitOffset}px`;
			scope.edgeLeft.style.width = `${edgeSize}px`
			scope.edgeLeft.style.height = `${window.innerWidth}px`;
			scope.edgeLeft.style.transform = 'translate(-50%, -50%) rotateZ(90deg)';

			scope.edgeRight.style.left = `${window.innerWidth/2}px`;
			scope.edgeRight.style.top = `${gap+frameHeight+edgeSize/2+scope.portraitOffset}px`;
			scope.edgeRight.style.width = `${edgeSize}px`
			scope.edgeRight.style.height = `${window.innerWidth}px`;
			scope.edgeRight.style.transform = 'translate(-50%, -50%) rotateZ(-90deg)';

			scope.logo.src = scope.skinnerObject.sprites['nitrome_full.png'];
			if(!isIpad){
				scope.logo.style.bottom = 'unset'
				scope.logo.style.top = `${-scope.portraitOffset-edgeSize/2}px`;
			}else{
				scope.logo.style.bottom = `6px`;
				scope.logo.style.top = `unset`;
			}
			scope.logo.style.right = `unset`;
			scope.logo.style.left = `${window.innerWidth/2}px`;
			scope.logo.style.transform = 'translate(-50%, -50%)';

			if(scope.home){
				if(!isIpad){
					scope.home.style.bottom = 'unset';
					scope.home.style.top = `${-scope.portraitOffset-edgeSize/2}px`;
					scope.home.style.left = `${topItemsMargin}px`;
					scope.home.style.transform = 'translate(0%, -50%)';
				}else{
					scope.home.style.bottom = `${gap/2-scope.portraitOffset/2}px`;
					scope.home.style.top = `unset`;
					scope.home.style.left = `${window.innerWidth/2 - topItemsMargin*1.5}px`;
					scope.home.style.transform = 'translate(-50%, 50%)';
				}
			}

			if(!isIpad){
				scope.pauseBut.style.bottom = 'unset';
				scope.pauseBut.style.top = `${-scope.portraitOffset-edgeSize/2}px`;
				scope.pauseBut.style.right = `${topItemsMargin}px`;
				scope.pauseBut.style.transform = 'translate(0%, -50%)';
			}else{
				scope.pauseBut.style.bottom = `${gap/2-scope.portraitOffset/2}px`;
				scope.pauseBut.style.top = `unset`;
				scope.pauseBut.style.right = `${window.innerWidth/2 - topItemsMargin*1.5}px`;
				scope.pauseBut.style.transform = 'translate(50%, 50%)';
			}

			if(!isIpad){
				scope.skinnerObject.joystickElement.style.left = `30%`;
			}else{
				scope.skinnerObject.joystickElement.style.left = `15%`;
			}
			scope.skinnerObject.joystickElement.style.top = `unset`;
			scope.skinnerObject.joystickElement.style.bottom = `${gap/2-scope.portraitOffset/2}px`;

			if(!isIpad){
				scope.skinnerObject.buttonsElement.style.right = `26%`;
			}else{
				scope.skinnerObject.buttonsElement.style.right = `14%`;
			}
			scope.skinnerObject.buttonsElement.style.left = `unset`;
			scope.skinnerObject.buttonsElement.style.top = `unset`;
			scope.skinnerObject.buttonsElement.style.bottom = `${gap/2-scope.portraitOffset/2}px`;

			if(preloader){
				preloader.style.top = `${window.innerHeight/2+scope.portraitOffset}px`;
			}
		}
	}
	scope.createTile = function(src){
		const image = document.createElement('div');
		image.style.background = `url(${src})`;
		image.style.position = 'absolute';
		image.style.transform = 'translate(-50%, -50%)';
		return image;
	}
	scope.init = function(){
		document.addEventListener('tOCParsed', function(e){
			const tryToInit = ()=>{
				try{
					scope.skinnerObject = e.skinner;
					scope.target = scope.skinnerObject.target;
					scope.getPortraitOffset();
					scope.placeSprites();
					window.addEventListener('resize', scope.resize);
					scope.resize();

					if(scope.portraitOffset === 0){
						// [iOS] Fix initial resizing not going well
						setTimeout(()=>{
							window.dispatchEvent(new Event('resize'));
						},
						3000)
					}
				}catch(e){
					console.log(e, "FAILED INIT");
					setTimeout(() => {
						tryToInit()
					}, 100);
				}
			}
			tryToInit();

			const oldGameplayStart = PokiSDK.gameplayStart;
			PokiSDK.gameplayStart = ()=>{
				scope.cancelNextPress = true;
				oldGameplayStart();
			}

			const searchCanvasInterval = setInterval(()=>{
				const canvas = document.querySelector('canvas');
				if(canvas){
					scope.gameCanvas = canvas;
					clearInterval(searchCanvasInterval);
					scope.gameCanvas.addEventListener('touchstart', ()=>{
							if (!scope.cancelNextPress && parseFloat(scope.target.domElement.style.opacity) <= scope.target.settings.offOpacity) {
								scope.target.triggerKeyEvent('keydown', 32);
							}
							scope.cancelNextPress = false;

					});
				}
			}, 100);
		})
	}
	scope.init();
})();
