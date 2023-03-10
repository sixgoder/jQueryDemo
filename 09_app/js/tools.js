$(function () {
	var $simgs = $('.simgs')
	var $mimg = $('.mimg')
	var $mask = $('.mask')
	var $imgs = $('.simgs > li img')
	var $m_img = $('.mimg > img')
	var $limg = $('.limg>img')
	var $louter = $('.limg')
	var $simgsContainer = $('.simgsContainer')
	var $prev = $('.prev')
	var $next = $('.next')
	
	var imgCount = $imgs.length
	var moveCount = 0 // 移动次数
	var imgwidth = $simgs.children(':first').width()
	var SHOW_COUNT = 3

	var maskWidth =  $mask.width()
	var maskHeight = $mask.height()
	var outerWidth = $mimg.width()
	var outerHeifht = $mimg.height()
	var largeWidth = $limg.width()
	var largeHeight = $limg.height()

	/**
	 * 1.点击小图更换中图
	*/

	$imgs.click(function () {
		var src = this.src
		$m_img.attr('src', src)
		var lsrc = src.replace(' 2', '')
		$limg.attr('src', lsrc)
	})

	/**
	 * 2.点击按钮滑动小图
	 * 制作移动方法
	 * 按钮点击计算位移调用移动方法
	*/

	function move(isNext) {
		console.log(moveCount)
		if (isNext) {
			if (moveCount === imgCount - SHOW_COUNT) {
				return
			}
			if (moveCount === imgCount - SHOW_COUNT - 1) {
				var left = $simgs.width() - $simgsContainer.width()
				$simgs.css('left', -left)
				moveCount++
				return
			}
			moveCount++
		} else {
			if (moveCount === 0) {
				return
			}
			moveCount--
		}
		$simgs.css('left', -moveCount * imgwidth)

	}

	$next.click(function () {
		move(true)
	})

	$prev.click(function () {
		move(false)
	})
	/**
	 * 3.鼠标监听中图滑动展示大图
	*/

	$mimg.hover(function () {
		// 解决offsetX/Y抖动
		$mask.css('pointer-events', 'none');
		$mask.show()
		$limg.show()
	}, function () {
		$mask.hide()
		$limg.hide()
	})

	$mimg.mousemove(function (event) {
		var eventLeft = event.offsetX
		var eventTop = event.offsetY

		var left = eventLeft - maskWidth / 2
		var top = eventTop - maskHeight / 2

		// 边界计算
		left = Math.max(0, left)
		top = Math.max(0, top)
		left = Math.min(outerWidth - maskWidth, left)
		top = Math.min(outerHeifht - maskHeight, top)

		$mask.css({
			left: left,
			top: top,
		})

		left = -left * largeWidth / (outerWidth + maskWidth)
		top = -top * largeHeight / (outerHeifht + maskHeight)

		$limg.css({
			left: left,
			top: top
		})
	})
})
