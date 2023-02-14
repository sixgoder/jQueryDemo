$(function() {
	var $outer = $('#outer')
	var $imgList = $('#imgList')
	var $imgs = $('img')
	var $navDiv = $('#navDiv')
	var $allA = $('a')

	var index = 0
	var timer
	var PAGE_WIDTH = 520
	var TIME = 1000
	var INTERVAL = 20

	$imgList.css('width', PAGE_WIDTH * $imgs.length)
	var x = $outer.offset().left
	var y = $navDiv.offset().left
	$navDiv.css('left', ($outer.width() - $navDiv.width()) / 2)

	$allA.each(function(i) {
		this.i = i
	})

	$navDiv.delegate('a', 'click', function() {
		index = this.i
		clearInterval(timer)
		updatePage($imgList, autoPage)
		resetA()
	})

	function autoPage() {
		timer = setInterval(function() {
			index++
			index %= $imgs.length
			updatePage($imgList, function() {
				resetA()
			})
		}, TIME)
	}
	autoPage()

	function resetA() {
		if (index >= $imgs.length - 1) {
			index = 0;
			$imgList.css('left', 0)
		}
		$allA.css('background', '')
		$($allA[index]).css('background', 'hotpink')
	}

	function updatePage(obj, callback) {
		clearInterval(obj.timer)
		var target = index * -PAGE_WIDTH
		var currLeft = $imgList.position().left
		var offset = target - currLeft
		var itemOffset = offset / INTERVAL
		var isLeft = target > currLeft

		obj.timer = setInterval(function() {
			currLeft += itemOffset
			$imgList.css('left', currLeft)

			//越界判断很重要
			if ((isLeft && currLeft >= target) || (!isLeft && currLeft <= target)) {
				currLeft = target;
			}

			if (currLeft == target) {
				clearInterval(obj.timer)
				callback && callback()
			}
		}, INTERVAL)
	}
})
