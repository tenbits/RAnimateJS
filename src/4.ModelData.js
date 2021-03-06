
var ModelData = (function() {

	var vendorProperties = {
		'transform': null
	};

	function parse(model) {
		var arr = model.split(/ *\| */g),
			data = {},
			length = arr.length;

		data.prop = arr[0] in vendorProperties ? prfx + arr[0] : arr[0];


		var vals = arr[1].split(/ *> */);

		if (vals[0]) {
			data.from = vals[0];
		}

		data.to = vals[vals.length - 1];

		if (length > 2) {
			var info = /(\d+m?s)?\s*([a-z]+[^\s]*)?\s*(\d+m?s)?/.exec(arr[2]);
			if (info != null) {
				data.duration = info[1] || '200ms';
				data.timing = info[2] || 'linear';
				data.delay = info[3] || '0';
				
				return data;
			}
		}
		data.duration = '200ms';
		data.timing = 'linear';
		data.delay = '0';
		
		
		return data;
	}

	return Class({
		Construct: function(data, parent) {
			this.parent = parent;
			this.transformModel = parent && parent.transformModel || new TransformModel();

			var model = data.model || data;

			if (model instanceof Array) {
				this.model = [];
				for (var i = 0, length = model.length; i < length; i++) {
					this.model.push(new ModelData(model[i], this));
				}
			} else if (model instanceof Object) {
				this.model = [new ModelData(model, this)];
			} else if (typeof model === 'string') {
				this.model = parse(model);

				if (~this.model.prop.indexOf('transform')) {
					this.transformModel.handle(this.model);
				}
			}

			if (data.next != null) {
				this.next = new ModelData(data.next, this);
			}

			this.state = 0;
			this.modelCount = this.model instanceof Array ? this.model.length : 1;
			this.nextCount = 0;
			
			if (this.next != null) {
				this.nextCount = this.next instanceof Array ? this.next.length : 1;
			}
		},
		reset: function() {
			this.state = 0;
			this.modelCount = this.model instanceof Array ? this.model.length : 1;
			this.nextCount = 0;
			
			if (this.next != null) {
				this.nextCount = this.next instanceof Array ? this.next.length : 1;
			}

			var isarray = this.model instanceof Array,
				length = isarray ? this.model.length : 1,
				x = null;
			for (var i = 0; isarray ? i < length : i < 1; i++) {
				x = isarray ? this.model[i] : this.model;
				x.reset && x.reset();
			}
		},
		getNext: function() {
			//-console.log('getNext', this.state, this.modelCount, this.nextCount, this.model.prop, this);
			if (this.state === 0) {				
				this.state = 1;
				return this;
			}

			if (this.state == 1 && this.modelCount > 0) {
				--this.modelCount;
			}
			if (this.state == 1 && this.modelCount === 0) {
				this.state = 2;
				if (this.next) {
					return this.next;
				}
			}
			if (this.state == 2 && this.nextCount > 0) {
				--this.nextCount;
			}

			if (this.state == 2 && this.nextCount === 0 && this.parent) {
				return this.parent.getNext && this.parent.getNext();
			}
			return null;
		}
	});

})();


