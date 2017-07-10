var _mouseEventDefs = {
  bubbles: true,
  cancelable: true,
  view: window,
  detail: 0,
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  button: 0,
  buttons: 0,
  relatedTarget: null,
  region: null
},
_allowedMouseEventParams = [
  'ctrlKey',
  'altKey',
  'shiftKey',
  'metaKey',
  'button',
  'buttons'
]

function _createMouseEvent(type, params) {
  var e,
  input = _eventDataFromDefsAndParams(_mouseEventDefs, _allowedMouseEventParams, params)
  _processMouseEventType(input, type)
  if('MouseEvent' in window) {
    e = _nonIeMouseEvent(type, input)
  }
  else /*if('createEventObject' in document)*/ {
    e = _ieMouseEvent(type, input)
  }
  e.synthetic = true
  return e
}

function _nonIeMouseEvent(type, input) {
  try {
    e = new window.MouseEvent(type, input)
  }
  catch(err) {
    e = document.createEvent('MouseEvents')
    e.initMouseEvent(type, input.bubbles, input.cancelable, input.view,
      input.detail, input.screenX, input.screenY, input.clientX,
      input.clientY, input.ctrlKey, input.altKey, input.shiftKey,
      input.metaKey, input.button, input.relatedTarget)
  }
  return e
}

function _ieMouseEvent(type, input) {
  e = document.createEventObject()
  e.type = type
  for(var key in input) {
    if(input.hasOwnProperty(key)) {
      e[key] = input[key]
    }
  }
  return e
}

function _processMouseEventType(input, type) {
  input.cancelable = (type !== 'mousemove')
  /*input.relatedTarget =
    /^(mouseenter|mouseover|mouseout|mouseleave)$/.test(type)
    ? document.body.parentNode
    : null*/
}
