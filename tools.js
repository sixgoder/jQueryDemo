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
	var moving = false

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

	$outer.hover(function() {
		clearInterval(timer)
	}, function() {
		autoPage()
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
		var lastIndex = index - 1
		lastIndex = lastIndex < 0 ? $allA.length - 1 : lastIndex
		// 有样式优先级问题 !important
		// $allA.eq(lastIndex).removeClass('on')
		$allA.removeClass('on')
		$allA.eq(index).addClass('on')
	}

	function updatePage(obj, callback) {
		if (moving) {
			return
		}
		moving = true
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
				moving = false
				clearInterval(obj.timer)
				callback && callback()
			}
		}, INTERVAL)
	}
})
