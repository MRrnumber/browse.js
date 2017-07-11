/** global: browse */

browse.capabilities = {
  'adjustOffsetX'   : 0,
  'adjustOffsetY'   : 0,
  'absolutePosition'  : false,
  'fixedPosition'   : false
}

function _detectIeOffset() {
  var rect = document.body.getBoundingClientRect()
  var marginLeft = parseInt($_(document.body).style('margin-left'), 10)
  var marginTop = parseInt($_(document.body).style('margin-top'), 10)
  if(!marginLeft) {
    marginLeft = 0
  }
  if(!marginTop) {
    marginTop = 0
  }
  browse.capabilities.adjustOffsetY = rect.top + _getCurrY() - marginTop
  browse.capabilities.adjustOffsetX = rect.left + _getCurrX() - marginLeft
}

function _testAbsolutePos() {
  var s = _remPosAndScroll(0, 0)
  var element = _divWithContent('<div id=test-absolute style=position:absolute;left:-800px></div>')
  var left = _elementLeft('test-absolute')
  browse.capabilities.absolutePosition = (left === -800)
  _removeTempScrollOrig(element, s)
}

function _testFixedPos() {
  var s = _remPosAndScroll(100, 100)
  var element = _divWithContent('<div id=test-fixed style=position:fixed;left:-800px></div>')
  var left = _elementLeft('test-fixed')
  browse.capabilities.fixedPosition = (left === -800)
  _removeTempScrollOrig(element, s)
}

function _remPosAndScroll(x, y) {
  var s = {
    sX: _getCurrX(),
    sY: _getCurrY()
  }
  window.scrollTo(x, y)
  return s
}

function _divWithContent(content) {
  var element = document.createElement('div')
  element.innerHTML = content
  document.body.appendChild(element)
  return element
}

function _elementLeft(id) {
  var element = document.getElementById(id)
  var rect = element.getBoundingClientRect()
  return (rect.left - browse.capabilities.adjustOffsetX)
}

function _removeTempScrollOrig(element, s) {
  element.parentNode.removeChild(element)
  window.scrollTo(s.sX, s.sY)
}

browse.ready(function() {
  _detectIeOffset()
  _testAbsolutePos()
  _testFixedPos()
})
