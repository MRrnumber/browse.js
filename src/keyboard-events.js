var _keyboardEventDefs = {
  bubbles: true,
  cancelable: true,
  view: window,
  key: '',
  code: '',
  location: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  repeat: false,
  isComposing: false,
  charCode: 0,
  keyCode: 0,
  which: 0
},
_allowedKeyboardEventParams = [
  'key',
  'code',
  'location',
  'ctrlKey',
  'altKey',
  'shiftKey',
  'metaKey',
  'repeat',
  'isComposing',
  'charCode',
  'keyCode',
  'which'
]

function _createKeyboardEvent(type, params) {
  var e,
  input = _eventDataFromDefsAndParams(_keyboardEventDefs, _allowedKeyboardEventParams, params)
  if('KeyboardEvent' in window) {
    e = _nonIeKbEvent(type, input)
  }
  else /*if('createEventObject' in document)*/ {
    e = _ieKbEvent(type, input)
  }
  e.synthetic = true
  return e
}

function _nonIeKbEvent(type, input) {
  var e
  try {
    e = new window.KeyboardEvent(type, input)
  }
  catch(err) {
    e = document.createEvent('Events')
    e.initEvent(type, input.bubbles, input.cancelable)
    e.view = input.view
    for(var key in input) {
      if(-1 !== _allowedKeyboardEventParams.indexOf(key)) {
        e[key] = input[key]
      }
    }
  }
  return e
}

function _ieKbEvent(type, input) {
  var e = document.createEventObject()
  e.type = type
  /* eslint-disable guard-for-in */
  for(var key in input) {
    e[key] = input[key]
  }
  /* eslint-enable guard-for-in */
  return e
}

/*
var _modifierMap = {
  'ctrlKey': 'Control',
  'shiftKey': 'Shift',
  'altKey': 'Alt',
  'metaKey': 'Meta'
}

function _getModifierArg(input) {
  var used = [ ]
  for(var key in _modifierMap) {
    if(input[key]) {
      used.push(_modifierMap[key])
    }
  }
  return used.join(' ')
}*/
