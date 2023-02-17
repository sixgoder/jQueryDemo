(function() {
	// jQuery对象扩展
	$.extend({
		min: function(a, b) {
			return a < b ? a : b
		},
		max: function(a, b) {
			return a > b ? a : b
		},
		leftTrim: function(str) {
			return str.replace(/^\s+/, '')
		},
		rightTrim: function(str) {
			return str.replace(/\s+$/, '')
		}
	})

	//jQuery方法扩展
	$.fn.extend({
		: function() {
			this.prop('checked', true)
		},
		unCheckAll: function() {
			this.prop('checked', false)
		},
		reverseCheck: function() {
			this.each(function() {
				this.checked = !this.checked
			})
		}
	})
})()
