
var TransitionEvent = window.WebKitTransitionEvent || window.mozTransitionEvent || window.oTransitionEvent || window.TransitionEvent;

var Model = Class({
	Construct: function(models) {
		this.stack = new Stack();
		this.model = new ModelData(models);
		this.transitionEnd = this.transitionEnd.bind(this);
		
	},
	start: function(element, onComplete) {
		this.onComplete = onComplete;
		var startCss = {},
			css = {};

		this.model.reset();
		this.stack.clear();
		this.stack.put(this.model);
		this.stack.getCss(startCss, css);



		element.addEventListener(getTransitionEndEvent(), this.transitionEnd, false);
		this.element = element;
		this.apply(startCss, css);
	},
	transitionEnd: function(event) {
		if (this.stack.resolve(event.propertyName) === true) {
			var startCss = {},
				css = {};
			this.stack.getCss(startCss, css);
			this.apply(startCss, css);
		} else {
			if (this.stack.arr.length < 1) {
				
				this.element.removeEventListener(getTransitionEndEvent(), this.transitionEnd, false);
				this.onComplete && this.onComplete();
			}			
		}
		
	},

	apply: function(startCss, css) {
		//-console.log('apply', startCss, css);
		startCss[prfx + 'transition'] = 'none';

		var style = this.element.style,
			element = this.element;

		if (startCss != null) {
			for (var key in startCss) {
				style.setProperty(key, startCss[key], '');
				//-style[key] = startCss[key];
			}
		}

		setTimeout(function() {
			var fire;
			for (var key in css){			
				style.setProperty(key, css[key], '');
				if (key in ImmediatCss){
					(fire || (fire = [])).push(key);
				}
			}

			if (fire == null || TransitionEvent == null){
				return;
			}

			var eventName = getTransitionEndEvent();

			for(var i = 0; i< fire.length; i++){
				var event = new TransitionEvent(eventName, {
					propertyName: fire[i],
					bubbles: true, 
					cancelable: true
				});

				element.dispatchEvent(event);
			}

		}, 0);
	}
});

var ImmediatCss = {
	'display': 1,
	'font-family': 1,
	'visibility': 1
};