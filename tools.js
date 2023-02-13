$(function() {
	var $outer = $('#outer')
	var $imgList = $('#imgList')
	var $imgs = $('img')
	var $navDiv = $('#navDiv')
	var $allA = $('a')

	var index = 0
	var PAGE_WIDTH = 520
	var TIME = 400
	var INTERVAL = 20

	$imgList.css('width', PAGE_WIDTH * $imgs.length)
	var x = $outer.offset().left
	var y = $navDiv.offset().left
	$navDiv.css('left', ($outer.width() - $navDiv.width()) / 2)
	// $allA.css('background', 'black')

	$allA.each(function(i) {
		this.i = i
	})

	$navDiv.delegate('a', 'click', function() {
		if (index != this.i) {
			index = this.i
			updatePage()
		}
	})

	setInterval(function() {
		console.log(index)
		updatePage(function() {
			if (index >= $imgs.length - 1) {
				index = 0;
				imgList.style.left = 0;
			}
		})
		index++
		index %= $imgs.length
	}, 1000)

	function updatePage(callback) {
		var currLeft = $imgList.position().left
		var i = Math.abs(index - (currLeft / PAGE_WIDTH))
		var offset = -PAGE_WIDTH * Math.ceil(i)
		var itemOffset = offset / (TIME / INTERVAL)
		var target = currLeft + offset


		var intervalId = setInterval(function() {
			currLeft += itemOffset
			$imgList.css('left', currLeft)

			if (currLeft === target) {
				clearInterval(intervalId)
				callback && callback()
			}
		}, INTERVAL)
	}
})
