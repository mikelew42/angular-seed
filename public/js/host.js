;(function($){
	var Value = MPL.Value;

	var Host = MPL.Host = function Host(){
		this.properties = [];
	};

	Host.prototype = $.extend(Object.create(MPL.Events.prototype), {
		constructor: Host,
		properties: [],
		v: function(name){
			this.createAndAddValue({name: name});
		},
		createAndAddValue: function(opts){
			var value = new Value(opts);
			this.addValue(value);
		},
		addValue: function(value){
			this.properties.push(value);
			Object.defineProperty(this, value.name, {
				get: function(){ return value; },
				set: function(val){ value.value = val; }
			});
		},
		fork: function(){
			var fork = Object.create(this);
			this.properties.forEach(function(v, i){
				fork.addValue(v.fork());
			});
			return fork;
		}
	});

	Host.prototype.v('name');
	Host.prototype.name = "mike";

	MPL.testCase1 = function(){
		var test = new Host();
		test.v('mike');
		test.mike = 'lewis';
		var fork = test.fork();

	};

	var Base = MPL.Base = function Base(){};
	Base.prototype = Object.create(Host.prototype);
})(jQuery);