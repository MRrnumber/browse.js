/** global: browse */

browse.prototype.value = function(value) {
  if(undefined === value) {
    return _getValue(this.element)
  }
  _setValue(this.element, value)
  return this
}

function _getValue(element) {
  if('value' in element) {
    if(!element.value) {
      var tagName = element.tagName.toLowerCase()
      if('option' === tagName) {
        return element.innerHTML
      }
      else if('input' === tagName) {
        var onTypes = ['radio', 'checkbox']
        if(-1 !== onTypes.indexOf(element.type)) {
          return 'on'
        }
      }
    }
    return element.value
  }
  throw new TypeError('Element does not support entering or selecting a value')
}

function _setValue(element, value) {
  if('value' in element) {
    element.value = value
    var tagName = element.tagName.toLowerCase()
    if('select' === tagName) {
      _setSelectValue(element, value)
    }
    else if('textarea' === tagName) {
      element.innerHTML = value
    }
    return
  }
  throw new TypeError('Element does not support entering or selecting a value')
}

function _setSelectValue(element, value) {
  var options = element.getElementsByTagName('option'), idx
  for(idx = 0; idx < options.length; ++idx) {
    var option = options[idx]
    if(value === option.value) {
      option.setAttribute('selected', '')
    }
    else {
      option.removeAttribute('selected')
    }
  }
}
