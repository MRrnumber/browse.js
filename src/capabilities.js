/** global: browse */

browse.capabilities = {
  'adjustOffsetX'   : 0,
  'adjustOffsetY'   : 0,
  'absolutePosition'  : false,
  'fixedPosition'   : false
}

function detectIEWindowOffset() {
  var rect = document.body.getBoundingClientRect()
  var marginLeft = parseInt($_(document.body).style('margin-left'), 10)
  var marginTop = parseInt($_(document.body).style('margin-top'), 10)
  if(!marginLeft) {
    marginLeft = 0
  }
  if(!marginTop) {
    marginTop = 0
  }
  browse.capabilities.adjustOffsetY = rect.top + getCurrY() - marginTop
  browse.capabilities.adjustOffsetX = rect.left + getCurrX() - marginLeft
}

function testAbsolutePositionSupport() {
  var s = rememberAndScrollTo(0, 0)
  var element = createElementWithContent('<div id=test-absolute style=position:absolute;left:-800px></div>')
  var left = getLeftOfElement('test-absolute')
  browse.capabilities.absolutePosition = (left === -800)
  removeTempAndScrollBack(element, s)
}

function testFixedPositionSupport() {
  var s = rememberAndScrollTo(100, 100)
  var element = createElementWithContent('<div id=test-fixed style=position:fixed;left:-800px></div>')
  var left = getLeftOfElement('test-fixed')
  browse.capabilities.fixedPosition = (left === -800)
  removeTempAndScrollBack(element, s)
}

function rememberAndScrollTo(x, y) {
  var s = {
    sX: window.scrollX || window.pageXOffset,
    sY: window.scrollY || window.pageYOffset
  }
  window.scrollTo(x, y)
  return s
}

function createElementWithContent(content) {
  var element = document.createElement('div')
  element.innerHTML = content
  document.body.appendChild(element)
  return element
}

function getLeftOfElement(id) {
  var element = document.getElementById(id)
  var rect = element.getBoundingClientRect()
  return (rect.left - browse.capabilities.adjustOffsetX)
}

function removeTempAndScrollBack(element, s) {
  element.parentNode.removeChild(element)
  window.scrollTo(s.sX, s.sY)
}

browse.ready(function() {
  detectIEWindowOffset()
  testAbsolutePositionSupport()
  testFixedPositionSupport()
})
