include.js({
	lib: ['compo', 'ranimate'],
	framework: ['dom/zepto', 'ruqq.base']
}).ready(function() {

	new Compo('#layout').render().insert(document.body);
	
	var model = new ruqq.animate.Model({
		model: [{
			model: 'transform | translate3d(0px, 0px, 0px) > translate3d(300px, 300px, 0px) | 1s',
			next: {
				model: 'transform | scale(1) > translate3d(200px, 200px,0px) scale(.5) | 600ms',
				next: [ //
				'transform | scale(.5) > scale(1.5) | 2s', 
				'opacity | 1 > 0 | 4s', //
				'background-color | > violet | 1s']
			}
		}, {
			model: 'background-color | > blue | 1s',
			next: 'background-color | > yellow | 1s',
		}, {
			model: 'border-radius | 0% > 60% | 1s',
			next: 'border-radius | 60% > 0% | 1s'
		}],
		next: {
			model: 'opacity | 0 > 1 | 3s'
		}
	});

	console.log('Model:', model);
	
	model.start(document.querySelector('#panel'));
});