/** global: browse */

var eventTypes = ['click', 'keyup', 'change']

eventTypes.forEach(function(type) {
  browse.prototype['on' + type] = function(callback) {
    _addEventHandler(this.element, callback, type)
    return this
  }
})

var
  __html_events_regex__ = /^(change)$/,
  __keyboard_events_regex__ = /^(keyup)$/
  __mouse_events_regex__ = /^(click)$/

browse.prototype.trigger = function(type, params) {
  if(type.match(__html_events_regex__)) {
    _dispatchEvent(this.element, _createHtmlEvent(type))
  }
  else if(type.match(__keyboard_events_regex__)) {
    _dispatchEvent(this.element, _createKeyboardEvent(type, params))
  }
  else if(type.match(__mouse_events_regex__)) {
    _dispatchEvent(this.element, _createMouseEvent(type, params))
  }
}

function _addEventHandler(element, callback, eventName) {
  if('addEventListener' in element) {
    element.addEventListener(eventName, callback, false)
  }
  else {
    element.attachEvent('on' + eventName, function() {
      callback.apply(element, arguments)
    })
  }
}

function _dispatchEvent(element, e) {
  if('dispatchEvent' in element) {
    element.dispatchEvent(e)
  }
  else /*if('fireEvent' in element)*/ {
    element.fireEvent('on' + e.type, e)
  }
}

function _eventDataFromDefsAndParams(defs, allowed, params) {
  var input = { }
  for(var key in defs) {
    if(defs.hasOwnProperty(key)) {
      input[key] = defs[key]
    }
  }
  if(params) {
    for(key in params) {
      if(defs.hasOwnProperty(key) && -1 !== allowed.indexOf(key)) {
        input[key] = params[key]
      }
    }
  }
  return input
}
