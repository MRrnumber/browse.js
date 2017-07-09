/** global: browse */

browse.prototype.style = function(property, value) {
  if(!property) {
    return null
  }
  if(undefined === value) {
    return _getStyle(this.element, property)
  }
  this.element.style[_toCamelCase(property)] = value
  return this
}

function _getStyle(element, property) {
  if(document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(element, null).getPropertyValue(property)
  }
  else if(element.currentStyle) {
    return element.currentStyle[_toCamelCase(property)]
  }
}

function _toCamelCase(property) {
  return property.replace(/\-(\w)/g, function(str, letter) {
    return letter.toUpperCase()
  })
}
