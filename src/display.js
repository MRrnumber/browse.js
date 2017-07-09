/** global: browse */

browse.prototype.show = function() {
  _display(this.element.style, this.element.style.$_savedDisplay || '')
  return this
}

browse.prototype.hide = function() {
  _display(this.element.style, 'none')
  return this
}

function _display(style, value) {
  if('none' === value && 'none' !== style.display && style.display) {
    style.$_savedDisplay = style.display
  }
  style.display = value
}
