/** global: browse */

browse.prototype.topLeft = function() {
  var element = this.element
  if(element.getBoundingClientRect) {
    var rect = element.getBoundingClientRect()
    return {
      top : rect.top + getCurrY() - browse.capabilities.adjustOffsetY,
      left: rect.left + getCurrX() - browse.capabilities.adjustOffsetX
    }
  }
  throw new Error('No support for getBoundingClientRect')
}

function getCurrX() {
  return window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
}

browse.getCurrX = getCurrX

function getCurrY() {
  return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

browse.getCurrY = getCurrY
