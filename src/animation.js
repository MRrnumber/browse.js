var __frame_interval__ = 16

window.requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame

/** global: browse */

browse.prototype.fadeIn = function(duration, callback) {
  duration = (duration < __frame_interval__) ?  __frame_interval__ : duration
  this.show()
  var queueHandle,
  tick = _fadeInTick(
    this,
    ((1.0 - this.opacity()) * __frame_interval__) / duration,
    callback,
    function(){queueHandle = _queueAnimation(tick, queueHandle)})
  queueHandle = _queueAnimation(tick, queueHandle)
  return this
}

browse.prototype.fadeOut = function(duration, callback) {
  duration = (duration < __frame_interval__) ?  __frame_interval__ : duration
  var queueHandle,
  tick = _fadeOutTick(
    this,
    (this.opacity() * __frame_interval__) / duration,
    callback,
    function(){queueHandle = _queueAnimation(tick, queueHandle)})
  queueHandle = _queueAnimation(tick, queueHandle)
  return this
}

browse.scrollY = function(toY, duration, callback) {
  duration = (duration < __frame_interval__) ?  __frame_interval__ : duration
  var
    queueHandle,
    currY = _getCurrY(),
    tick = _scrollYTick(
      this,
      _getCurrX(),
      currY,
      toY,
      ((toY - currY) * __frame_interval__) / duration,
      currY < toY ? 'down' : 'up',
      callback,
      function(){queueHandle = _queueAnimation(tick, queueHandle)})
  queueHandle = _queueAnimation(tick, queueHandle)
  return this
}

function _queueAnimation(func, handle) {
  if(window.requestAnimationFrame) {
    window.requestAnimationFrame(func)
  }
  else {
    handle = _adaptiveAnimate(func, handle)
  }
  return handle
}

function _adaptiveAnimate(func, handle) {
  handle = handle || { start: (new Date()).getTime(), times: 0 }
  var interval = __frame_interval__ - ((new Date()).getTime() - handle.start - (handle.times * __frame_interval__))
  interval = interval >= 0 ? interval : 0
  setTimeout(function(){
    func()
    ++handle.times
  }, interval)
  return handle
}

function _fadeInTick(obj, step, callback, queueFn) {
  var opacity = obj.opacity()
  var tick = function() {
    opacity = opacity + step > 1 ? 1 : opacity + step
    //console.log('fadeIn step', obj.opacity(), ' -> ', opacity)
    obj.opacity(opacity)
    if(opacity < 1) {
      queueFn()
      return
    }
    callback(obj)
  }
  return tick
}

function _fadeOutTick(obj, step, callback, queueFn) {
  var opacity = obj.opacity()
  var tick = function() {
    opacity = opacity - step < 0 ? 0 : opacity - step
    //console.log('fadeOut step', obj.opacity(), ' -> ', opacity)
    obj.opacity(opacity)
    if(opacity > 0) {
      queueFn()
      return
    }
    obj.hide()
    callback(obj)
  }
  return tick
}

function _scrollYTick(obj, currX, currY, toY, step, direction, callback, queueFn) {
  var tick = function() {
    currY = currY + step
    currY = _isPastTargetY(direction, currY, toY) ? toY : currY
    //console.log('scrollY step', currY, toY)
    window.scrollTo(currX, Math.ceil(currY))
    if(currY !== toY) {
      queueFn()
      return
    }
    callback(obj)
  }
  return tick
}

function _isPastTargetY(direction, currY, toY) {
  return ('down' === direction && currY > toY || 'up' === direction && currY < toY)
}

/*var _scrollThruTimer =
  (null !== window.navigator.userAgent.match(/ Android /i))
    if(_scrollThruTimer) {
      // several browsers do not scroll properly unless wrapped
      // by this ugly hack of calling them through setTimeout
      setTimeout(function(){
        window.scrollTo(currX, Math.ceil(currY))
      }, 0)
    } else {
      window.scrollTo(currX, Math.ceil(currY))
    }*/
