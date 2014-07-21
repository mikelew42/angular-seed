;(function($){

	if (typeof MPL !== "object")
		MPL = {};

	var Value = MPL.Value = function Value(opts){
		$.extend(this, opts);
	};

	Value.prototype = $.extend(Object.create(MPL.Events.prototype), {
		constructor: Value,
		_value: undefined,
		bindTo: function(bindTo){
			var self = this;
			if (bindTo instanceof jQuery){
				// self --> bindTo
				self.change(function(){
					bindTo.setValue(self.value);
				});
				// bindTo --> self
				bindTo.on('keypress', function(){
					self.value = bindTo.getValue();
				});
				// start synced? but which way? shouldn't matter, you're likely to set this value after binding
			} else if (bindTo instanceof Value) {
				// self --> bindTo
				self.change(function(){
					bindTo.value = self.value;
				});
				// bindTo --> self
				bindTo.change(function(){
					self.value = bindTo.value;
				});
			}
		},
		valueOf: function(){
			return this.value;
		},
		toString: function(){
			return '' + this.value;
		},
		fork: function(){
			return Object.create(this);
		},
		del: function(){
			delete this.value;
		}
	});

	Object.defineProperty(Value.prototype, 'value', {
		get: function(){ return this._value; },
		set: function(val){ this._value = val; this.change(); }
	});

	var aliasEvent = function(eventName){
		return function(cb){
			if (typeof cb === 'function') this.on(eventName, cb);
			else this.trigger(eventName);
		};
	};

	['change'].forEach(function(v, i){
		Value.prototype[v] = aliasEvent(v);
	});

	var Variable = MPL.Variable = function Variable(){

	};

	Variable.prototype._value = undefined;
	Object.defineProperty(Variable.prototype, 'value', {
		get: function(){ return this._value; },
		set: function(val){ this._value = val; }
	});
})(jQuery);