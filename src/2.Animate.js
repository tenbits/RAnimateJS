var Animate = function (element, property, valueTo, duration, callback, valueFrom, timing) {

	var data = typeof property === 'string' ? {
		property: property,
		valueFrom: valueFrom,
		valueTo: valueTo,
		duration: duration,
		timing: timing,
		callback: callback
	} : property,
		$this = $(element);

	if (data.timing == null) {
		data.timing = 'linear';
	}
	if (data.duration == null) {
		data.duration = 300;
	}


	if (data.valueFrom != null) {
		var css = {};
		css[data.property] = data.valueFrom;
		css[prfx + 'transition-property'] = 'none';
		css[prfx + 'transition-duration'] = '0ms';

		$this.css(css);
	}
	setTimeout(function() {
		var css = {};
		css[data.property] = data.valueTo;
		css[prfx + 'transition-property'] = data.property;
		css[prfx + 'transition-duration'] = data.duration + 'ms';
		css[prfx + 'transition-timing-function'] = data.timing;

		$this.css(css);

		if (data.callback) {			
			var callback = function(){
					element.removeEventListener(getTransitionEndEvent(), callback, false);
					data.callback();
			};
			
			element.addEventListener(getTransitionEndEvent(), callback, false);					
		}
		
	}, 0);

	return this;
};

