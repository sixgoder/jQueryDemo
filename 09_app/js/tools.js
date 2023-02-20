$(function() {
	var $simgs = $('.simgs')
	var $mimg = $('.mimg')
	var $imgs = $('.simgs > li img')
	var $m_img = $('.mimg > img')
	var $simgsContainer = $('.simgsContainer')
	var $prev = $('.prev')
	var $next = $('.next')
	var imgCount = $imgs.length
	var moveCount = 0 // 移动次数
	var imgwidth = $simgs.children(':first').width()
	var SHOW_COUNT = 3

	/**
	 * 1.点击小图更换中图
	*/

	$imgs.click(function() {
		var src = this.src
		$m_img.attr('src', src) 
	})

	/**
	 * 2.点击按钮滑动小图
	 * 制作移动方法
	 * 按钮点击计算位移调用移动方法
	*/

	function move(isNext){
		console.log(moveCount)
		if (isNext) {
			if (moveCount === imgCount - SHOW_COUNT) {
				return
			}
			if(moveCount === imgCount - SHOW_COUNT - 1) {
				var left = $simgs.width() - $simgsContainer.width()
				$simgs.css('left', -left)
				moveCount++
				return
			}
			moveCount++
		} else {
			if(moveCount === 0) {
				return
			}
			moveCount--
		}
		$simgs.css('left', -moveCount * imgwidth)
		
	}

	$next.click(function(){
		move(true)
	})

	$prev.click(function(){
		move(false)
	})
	/**
	 * 3.鼠标监听中图滑动展示大图
	*/

})
