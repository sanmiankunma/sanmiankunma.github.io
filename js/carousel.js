function banner() {

	var width = $('.train_banner').width();
	var moveUl = document.querySelector('.banner_images');
	document.querySelector(".banner_images li img").style.height = 100% + "px"
	var linum = 0
	for(var j=1;j<=document.querySelectorAll(".banner_images li").length-1;j++){
			document.querySelector(".banner_index-frame").appendChild(document.createElement("li"));
			document.querySelectorAll(".banner_images li img")[j].style.height = 100% + "px"
			linum++
		}
	var indexLiArr = document.querySelectorAll('.banner_index li');
	
	var Ul = document.querySelector('.train_banner');
	var left = document.querySelector('.train_banner_left');
	var right = document.querySelector('.train_banner_right');
	var index = 0;
	
	
	

	var startTransition = function() {
		moveUl.style.transition = 'all .5s';
	}

	var endTransition = function() {
		moveUl.style.transition = '';
	}

	var setTransform = function(distance) {
		moveUl.style.transform = 'translateX(' + distance + 'px)';
	}

	var timeId = setInterval(function() {
		index++;
		if(index >= document.querySelectorAll(".banner_images li").length) {
						index = 0
					}
		startTransition();

		setTransform(index * width * -1);

	}, 4500);

	function li() {
		for(var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].index = i;
			indexLiArr[i].onclick = function() {
				for(var i = 0; i < indexLiArr.length; i++) {
					indexLiArr[i].className = '';
				}
				indexLiArr[this.index].className = 'current';
				clearInterval(timeId);
				endTransition();
				index = this.index;
				setTransform((this.index) * width * -1);
				startTransition()

				timeId = setInterval(function() {

					index++;
					if(index >= document.querySelectorAll(".banner_images li").length) {
						index = 0
					}
					startTransition();

					setTransform(index * width * -1);

				}, 4500)
			};

		}
	}
	li();

	left.addEventListener('click', function() {
		clearInterval(timeId);
		startTransition();
		index--;
		if(index < 0) {
			
			index = document.querySelectorAll(".banner_images li").length-1;

			setTransform(index * width * -1);
		} else {
			setTransform(index * width * -1);
		}

		for(var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		}

		indexLiArr[index].className = 'current';

		timeId = setInterval(function() {
			
			index++;
			if(index >= document.querySelectorAll(".banner_images li").length) {
						index = 0
					}
			startTransition();

			setTransform(index * width * -1);

		}, 4500)

	})

	right.addEventListener('click', function() {
		clearInterval(timeId);
		startTransition();
		index++;
		if(index >= document.querySelectorAll(".banner_images li").length) {
			index = 0;

			setTransform(index * width * -1);
		} else{
			setTransform(index * width * -1);
		}

		for(var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		}

		indexLiArr[index].className = 'current';

		timeId = setInterval(function() {

			index++;
			if(index >= document.querySelectorAll(".banner_images li").length) {
						index = 0
					}
			startTransition();

			setTransform(index * width * -1);

		}, 4500)

	})

	moveUl.addEventListener('webkitTransitionEnd', function() {

		if(index >= document.querySelectorAll(".banner_images li").length) {
			index = 0;

			endTransition();

			setTransform(index * width * -1);
		} else if(index < 0) {
			index = document.querySelectorAll(".banner_images li").length-1;

			endTransition();

			setTransform(index * width * -1);
		}

		for(var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		}

		indexLiArr[index].className = 'current';
	})

	window.onresize = function() {
		endTransition();
		clearInterval(timeId);
		width = document.documentElement.clientWidth;
		document.querySelector(".banner_images li img").style.height = 100% + "px"
		for(var j=1;j<=document.querySelectorAll(".banner_images li").length-1;j++){
			document.querySelectorAll(".banner_images li img")[j].style.height = 100% + "px"
		}
		setTransform(index * width * -1);
		timeId = setInterval(function() {
			index++;
			if(index >= document.querySelectorAll(".banner_images li").length) {
						index = 0
					}
			startTransition();
			
			setTransform(index * width * -1);
		}, 4500)
	}
	var start = 0
	var tform = 0
	function handlerTouchEvent(event){
	    if(event.touches.length==1 || event.touches.length==0){
	        switch(event.type){
	            case "touchstart":
	            	endTransition();
	            	clearInterval(timeId);
	              
	               start = event.touches[0].clientX
	                break;
	            case "touchend":
	            	if(start - event.changedTouches[0].clientX >= width/10){
	            		if(index >= document.querySelectorAll(".banner_images li").length-1){
	            			index = 0
	            		}else{
	            			index++
	            		}
	                	setTransform(index * width * -1);
	               }else{
	               		setTransform(index * width * -1);
	               }
	               
	            	if(event.changedTouches[0].clientX - start >= width/10){
	            		if(index <= 0){
	            			index = document.querySelectorAll(".banner_images li").length-1
	            		
	            		}else{
	            			index--
	            		}
	                	setTransform(index * width * -1);
	               }else{
	               		setTransform(index * width * -1);
	               }
	            	startTransition();
	               
	                timeId = setInterval(function() {
						index++;
						if(index >= document.querySelectorAll(".banner_images li").length) {
							index = 0
						}
						startTransition();
			
						setTransform(index * width * -1);
					}, 5000)
	                break;
	            case "touchmove":
	                event.preventDefault();
	                tform = index * width * -1 - (start - event.changedTouches[0].clientX)
	                if(tform >= 0){
						tform = 0
					}
					
					if(tform <= -linum * width){
						tform = -linum * width
					}
					setTransform(tform);
	        }
	    }
	}
		
	moveUl.addEventListener('touchstart',handlerTouchEvent,false);
    moveUl.addEventListener('touchmove',handlerTouchEvent,false);
    moveUl.addEventListener('touchend',handlerTouchEvent,false);
}
