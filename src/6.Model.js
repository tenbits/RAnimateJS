
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

		var style = this.element.style;
		if (startCss != null) {
			for (var key in startCss) {
				style.setProperty(key, startCss[key], '');
				//-style[key] = startCss[key];
			}
		}

		setTimeout(function() {
			for (var key in css){			
				style.setProperty(key, css[key], '');
			}
		}, 0);
	}
});