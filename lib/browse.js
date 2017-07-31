( /* eslint-disable complexity */ /* eslint-disable max-statements */ /* eslint-disable no-shadow-restricted-names */
  function(ns, undefined) {
    /* eslint-enable complexity */
    /* eslint-enable max-statements */ /* eslint-enable no-shadow-restricted-names */
    function browse(element) {
      if (!element || !_isDOMElement(element)) {
        return null
      }
      if (element.$_) {
        return element.$_
      }
      return new _create(element)
    }

    function _create(element) {
      this.element = element
      this.element.$_ = this
    }

    _create.prototype = browse.prototype

    /*function _isDOMNode(obj){
      return (
        typeof Node === "object"
        ? obj instanceof Node
        : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
      )
    }*/

    function _isDOMElement(obj) {
      return (
        typeof window.HTMLElement === "object" ?
        obj instanceof window.HTMLElement :
        null !== obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string"
      )
    }

    /** global: ns */
    ns = window.$_ = browse

    function _forEach(callback) {
      for (var idx = 0; idx < this.length; ++idx) {
        callback(this[idx], idx, this)
      }
    }

    function _every(callback) {
      for (var idx = 0; idx < this.length; ++idx) {
        if (!callback(this[idx], idx, this)) {
          return
        }
      }
    }

    /* eslint-disable no-extend-native */
    Array.prototype.forEach = Array.prototype.forEach || _forEach
    Array.prototype.every = Array.prototype.every || _every

    Array.prototype.indexOf = Array.prototype.indexOf || function(member) {
      for (var idx = 0; idx < this.length; ++idx) {
        if (this[idx] === member) {
          return idx
        }
      }
      return -1
    }

    Array.prototype.remove = function(member, howMany) {
      var idx = this.indexOf(member)
      if (-1 !== idx) {
        this.splice(idx, howMany || 1)
      }
    }
    /* eslint-enable no-extend-native */

    var _arrayTypes = ['NodeList', 'HTMLCollection']

    _arrayTypes.forEach(function(type) {
      if (window[type]) {
        window[type].prototype.forEach = window[type].prototype.forEach || _forEach
        window[type].prototype.every = window[type].prototype.every || _every
      }
    })

    window.Node = window.Node || {
      ELEMENT_NODE: 1,
      TEXT_NODE: 3,
      COMMENT_NODE: 8,
      DOCUMENT_NODE: 9
    }

    var
      __node_type_element__ = window.Node.ELEMENT_NODE,
      __node_type_text__ = window.Node.TEXT_NODE,
      __node_type_comment__ = window.Node.COMMENT_NODE,
      __node_type_document__ = window.Node.DOCUMENT_NODE

    /** global: browse */

    browse.prototype.firstChild = function() {
      if ('firstElementChild' in this.element) {
        return browse(this.element.firstElementChild)
      }
      var child = this.element.firstChild
      while (child && __node_type_element__ !== child.nodeType) {
        child = child.nextSibling
      }
      return browse(child)
    }

    browse.prototype.lastChild = function() {
      if ('lastElementChild' in this.element) {
        return browse(this.element.lastElementChild)
      }
      var child = this.element.lastChild
      while (child && __node_type_element__ !== child.nodeType) {
        child = child.previousSibling
      }
      return browse(child)
    }

    browse.prototype.next = function() {
      if ('nextElementSibling' in this.element) {
        return browse(this.element.nextElementSibling)
      }
      var next = this.element.nextSibling
      while (next && __node_type_element__ !== next.nodeType) {
        next = next.nextSibling
      }
      return browse(next)
    }

    browse.prototype.previous = function() {
      if ('previousElementSibling' in this.element) {
        return browse(this.element.previousElementSibling)
      }
      var previous = this.element.previousSibling
      while (previous && __node_type_element__ !== previous.nodeType) {
        previous = previous.previousSibling
      }
      return browse(previous)
    }

    /** global: browse */

    browse.prototype.append = function(html, tagName) {
      if (_safeInsertAdjacentHtml(this.element, 'beforeend', html)) {
        return this
      }
      var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
      while (temp.childNodes.length) {
        this.element.appendChild(temp.childNodes[0])
      }
      return this
    }

    browse.prototype.prepend = function(html, tagName) {
      if (_safeInsertAdjacentHtml(this.element, 'afterbegin', html)) {
        return this
      }
      var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
      var firstChild = this.element.firstChild
      while (temp.childNodes.length) {
        _insertBeforeOrAppendChild(firstChild, this.element, temp.childNodes[0])
      }
      return this
    }

    browse.prototype.after = function(html, tagName) {
      if (_quickAfterBefore(this.element, html, 'afterend')) {
        return this
      }
      var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
      var next = this.next() && this.next().element || null
      while (temp.childNodes.length) {
        _insertBeforeOrAppendChild(next, this.element.parentNode, temp.childNodes[0])
      }
      return this
    }

    browse.prototype.before = function(html, tagName) {
      if (_quickAfterBefore(this.element, html, 'beforebegin')) {
        return this
      }
      var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
      while (temp.childNodes.length) {
        this.element.parentNode.insertBefore(temp.childNodes[0], this.element)
      }
      return this
    }

    function _quickAfterBefore(element, html, spec) {
      var tag = element.tagName.toLowerCase()
      if (-1 !== ['html', 'body'].indexOf(tag) || _safeInsertAdjacentHtml(element, spec, html)) {
        return true
      }
      return false
    }

    var __ie_invalid_target__ = /Invalid target element for this operation/

    function _safeInsertAdjacentHtml(element, spec, html) {
      if (!element.insertAdjacentHTML) {
        return false
      }
      try {
        element.insertAdjacentHTML(spec, html)
        return true
      } catch (e) {
        return !(!e.message.match(__ie_invalid_target__))
      }
    }

    function _deriveTagAndSafeSetInnerHTML(element, html, tagName, defTag) {
      tagName = tagName || element && element.tagName.toLowerCase().replace(/body/, '') || defTag
      var temp = document.createElement(tagName)
      _safeSetInnerHTML(temp, html)
      return temp
    }

    function _safeSetInnerHTML(element, html) {
      try {
        element.innerHTML = html
      } catch (e) {
        // do nothing
      }
    }

    function _insertBeforeOrAppendChild(before, par, what) {
      if (before) {
        par.insertBefore(what, before)
      } else {
        par.appendChild(what)
      }
    }

    /** global: browse */

    browse.prototype.getClass = function() {
      if ('classList' in this.element) {
        return this.element.classList.value || Array.prototype.join.call(this.element.classList, ' ')
      } else {
        return this.element.className
      }
    }

    browse.prototype.hasClass = function(className) {
      if (_badClassName(className)) {
        throw new Error('Expected a valid class name')
      }
      var element = this.element
      if (_classListHasCheck(element, className)) {
        return true
      } else /*if('className' in element)*/ {
        return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1)
      }
    }

    browse.prototype.addClass = function(className) {
      if (_badClassName(className)) {
        throw new Error('Expected a valid class name')
      }
      var element = this.element
      if (_classListHasNotCheck(element, className)) {
        element.classList.add(className)
      } else /*if('className' in element)*/ {
        if ((' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1) {
          element.className += ' ' + className
        }
      }
      return this
    }

    browse.prototype.removeClass = function(className) {
      if (_badClassName(className)) {
        throw new Error('Expected a valid class name')
      }
      var element = this.element
      if (_classListHasCheck(element, className)) {
        element.classList.remove(className)
      } else /*if('className' in element)*/ {
        var existingWithSpaces = ' ' + element.className + ' '
        var argumentWithSpaces = new RegExp(' ' + className + ' ', 'g')
        if (existingWithSpaces.match(argumentWithSpaces)) {
          element.className = existingWithSpaces.replace(argumentWithSpaces, '').replace(/^ /, '').replace(/ $/, '')
        }
      }
      return this
    }

    function _badClassName(className) {
      return (!className || className.match(/ /))
    }

    function _classListHasCheck(element, className) {
      return ('classList' in element && element.classList.contains(className))
    }

    function _classListHasNotCheck(element, className) {
      return ('classList' in element && !element.classList.contains(className))
    }

    /** global: browse */

    browse.prototype.topLeft = function() {
      var element = this.element
      if (element.getBoundingClientRect) {
        var rect = element.getBoundingClientRect()
        return {
          top: rect.top + _getCurrY() - browse.capabilities.adjustOffsetY,
          left: rect.left + _getCurrX() - browse.capabilities.adjustOffsetX
        }
      }
      throw new Error('No support for getBoundingClientRect')
    }

    function _getCurrX() {
      return window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    }

    function _getCurrY() {
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    }

    browse.getCurrX = _getCurrX
    browse.getCurrY = _getCurrY

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
      __keyboard_events_regex__ = /^(keyup)$/,
      __mouse_events_regex__ = /^(click)$/

    browse.prototype.trigger = function(type, params) {
      if (type.match(__html_events_regex__)) {
        _dispatchEvent(this.element, _createHtmlEvent(type))
      } else if (type.match(__keyboard_events_regex__)) {
        _dispatchEvent(this.element, _createKeyboardEvent(type, params))
      } else if (type.match(__mouse_events_regex__)) {
        _dispatchEvent(this.element, _createMouseEvent(type, params))
      } else {
        throw new Error('Unsupported event ' + type)
      }
    }

    function _addEventHandler(element, callback, eventName) {
      if ('addEventListener' in element) {
        element.addEventListener(eventName, callback, false)
      } else {
        element.attachEvent('on' + eventName, function() {
          callback.apply(element, arguments)
        })
      }
    }

    function _dispatchEvent(element, e) {
      if ('dispatchEvent' in element) {
        element.dispatchEvent(e)
      } else /*if('fireEvent' in element)*/ {
        element.fireEvent('on' + e.type, e)
      }
    }

    function _eventDataFromDefsAndParams(defs, allowed, params) {
      var input = {}
      /* eslint-disable guard-for-in */
      for (var key in defs) {
        input[key] = defs[key]
      }
      /* eslint-enable guard-for-in */
      if (params) {
        for (key in params) {
          if (-1 !== allowed.indexOf(key)) {
            input[key] = params[key]
          }
        }
      }
      return input
    }

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
      if ('MouseEvent' in window) {
        e = _nonIeMouseEvent(type, input)
      } else /*if('createEventObject' in document)*/ {
        e = _ieMouseEvent(type, input)
      }
      e.synthetic = true
      return e
    }

    function _nonIeMouseEvent(type, input) {
      var e
      try {
        e = new window.MouseEvent(type, input)
      } catch (err) {
        e = document.createEvent('MouseEvents')
        e.initMouseEvent(type, input.bubbles, input.cancelable, input.view,
          input.detail, input.screenX, input.screenY, input.clientX,
          input.clientY, input.ctrlKey, input.altKey, input.shiftKey,
          input.metaKey, input.button, input.relatedTarget)
      }
      return e
    }

    function _ieMouseEvent(type, input) {
      var e = document.createEventObject()
      e.type = type
      /* eslint-disable guard-for-in */
      for (var key in input) {
        e[key] = input[key]
      }
      /* eslint-enable guard-for-in */
      return e
    }

    function _processMouseEventType(input, type) {
      input.cancelable = (type !== 'mousemove')
      /*input.relatedTarget =
        /^(mouseenter|mouseover|mouseout|mouseleave)$/.test(type)
        ? document.body.parentNode
        : null*/
    }

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
      if ('KeyboardEvent' in window) {
        e = _nonIeKbEvent(type, input)
      } else /*if('createEventObject' in document)*/ {
        e = _ieKbEvent(type, input)
      }
      e.synthetic = true
      return e
    }

    function _nonIeKbEvent(type, input) {
      var e
      try {
        e = new window.KeyboardEvent(type, input)
      } catch (err) {
        e = document.createEvent('Events')
        e.initEvent(type, input.bubbles, input.cancelable)
        e.view = input.view
        for (var key in input) {
          if (-1 !== _allowedKeyboardEventParams.indexOf(key)) {
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
      for (var key in input) {
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

    function _createHtmlEvent(type) {
      var e
      if ('createEvent' in document) {
        e = document.createEvent('Event')
        e.initEvent(type, 'change' !== type, true)
      } else /*if('createEventObject' in document)*/ {
        e = document.createEventObject()
        e.type = type
      }
      e.synthetic = true
      return e
    }

    /** global: browse */

    browse.prototype.value = function(value) {
      if (undefined === value) {
        return _getValue(this.element)
      }
      _setValue(this.element, value)
      return this
    }

    function _getValue(element) {
      if ('value' in element) {
        var def
        if (!element.value && (def = _handleFalsyVal(element))) {
          return def
        }
        return element.value
      }
      throw new TypeError('Element does not support entering or selecting a value')
    }

    function _setValue(element, value) {
      if ('value' in element) {
        element.value = value
        var tagName = element.tagName.toLowerCase()
        if ('select' === tagName) {
          _setSelectValue(element, value)
        } else if ('textarea' === tagName) {
          element.innerHTML = value
        }
        return
      }
      throw new TypeError('Element does not support entering or selecting a value')
    }

    var _onTypes = ['radio', 'checkbox']

    function _handleFalsyVal(element) {
      var tagName = element.tagName.toLowerCase()
      if ('option' === tagName) {
        return element.innerHTML
      }
      if ('input' === tagName && -1 !== _onTypes.indexOf(element.type)) {
        return 'on'
      }
      return undefined
    }

    function _setSelectValue(element, value) {
      var options = element.getElementsByTagName('option'),
        idx
      for (idx = 0; idx < options.length; ++idx) {
        var option = options[idx]
        if (value === option.value) {
          option.setAttribute('selected', '')
        } else {
          option.removeAttribute('selected')
        }
      }
    }

    /** global: browse */

    browse.prototype.style = function(property, value) {
      if (!property) {
        return null
      }
      if (undefined === value) {
        return _getStyle(this.element, property)
      }
      this.element.style[_toCamelCase(property)] = value
      return this
    }

    function _getStyle(element, property) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(element, null).getPropertyValue(property)
      } else /*if(element.currentStyle)*/ {
        var value = element.currentStyle[_toCamelCase(property)]
        if (/^\d+(ch|cm|em|ex|in|mm|%|pc|pt|rem|vh|vw)?$/i.test(value)) {
          value = _handleCssUnit(element, value)
        }
        return value
      }
    }

    function _toCamelCase(property) {
      return property.replace(/\-(\w)/g, function(str, letter) {
        return letter.toUpperCase()
      })
    }

    function _handleCssUnit(element, value) {
      // courtesy: https://stackoverflow.com/a/2664055/3348386
      var saveLeft = element.style.left,
        saveRtLeft = element.runtimeStyle.left
      element.runtimeStyle.left = element.currentStyle.left
      element.style.left = value
      value = element.style.pixelLeft + "px"
      element.style.left = saveLeft
      element.runtimeStyle.left = saveRtLeft
      return value
    }

    /** global: browse */

    var
      __ie_opacity_regex__ = new RegExp(/alpha\(opacity=([\d\.]+)\)/),
      __ie_opacity_expr__ = /alpha\(opacity=[\d\.]+\)/

    browse.prototype.opacity = function(value) {
      var element = this.element
      if (undefined === value) {
        return _getOpacity(element.style)
      }
      _setOpacity(element.style, value)
      return this
    }

    function _getOpacity(style) {
      if ('opacity' in style) {
        return style.opacity !== '' ? parseFloat(style.opacity) : 1.0
      } else /*if('filter' in style)*/ {
        var match = __ie_opacity_regex__.exec(style.filter)
        return null !== match ? parseFloat(match[1]) / 100 : 1.0
      }
    }

    function _setOpacity(style, value) {
      value = parseFloat(value)
      if (_badOpacity(value)) {
        throw Error('Opacity value must be >= 0 and <= 1')
      }
      if ('opacity' in style) {
        style.opacity = parseFloat(value)
      } else /*if('filter' in style)*/ {
        var match = __ie_opacity_regex__.exec(style.filter)
        var valueStr = 'alpha(opacity=' + (100 * value) + ')'
        style.filter = (null === match) ?
          valueStr :
          style.filter.replace(__ie_opacity_expr__, valueStr)
      }
    }

    function _badOpacity(value) {
      return (isNaN(value) || value < 0 || value > 1)
    }

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
      if ('none' === value && 'none' !== style.display && style.display) {
        style.$_savedDisplay = style.display
      }
      style.display = value
    }

    var __frame_interval__ = 16

    window.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame

    /** global: browse */

    browse.prototype.fadeIn = function(duration, callback) {
      duration = (duration < __frame_interval__) ? __frame_interval__ : duration
      this.show()
      var queueHandle,
        tick = _fadeInTick(
          this,
          ((1.0 - this.opacity()) * __frame_interval__) / duration,
          callback,
          function() {
            queueHandle = _queueAnimation(tick, queueHandle)
          })
      queueHandle = _queueAnimation(tick, queueHandle)
      return this
    }

    browse.prototype.fadeOut = function(duration, callback) {
      duration = (duration < __frame_interval__) ? __frame_interval__ : duration
      var queueHandle,
        tick = _fadeOutTick(
          this,
          (this.opacity() * __frame_interval__) / duration,
          callback,
          function() {
            queueHandle = _queueAnimation(tick, queueHandle)
          })
      queueHandle = _queueAnimation(tick, queueHandle)
      return this
    }

    browse.scrollY = function(toY, duration, callback) {
      duration = (duration < __frame_interval__) ? __frame_interval__ : duration
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
          function() {
            queueHandle = _queueAnimation(tick, queueHandle)
          })
      queueHandle = _queueAnimation(tick, queueHandle)
      return this
    }

    function _queueAnimation(func, handle) {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(func)
      } else {
        handle = _adaptiveAnimate(func, handle)
      }
      return handle
    }

    function _adaptiveAnimate(func, handle) {
      handle = handle || {
        start: (new Date()).getTime(),
        times: 0
      }
      var interval = __frame_interval__ - ((new Date()).getTime() - handle.start - (handle.times * __frame_interval__))
      interval = interval >= 0 ? interval : 0
      setTimeout(function() {
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
        if (opacity < 1) {
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
        if (opacity > 0) {
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
        if (currY !== toY) {
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

    /** global: browse */

    browse.ajax = function(url, options) {
      var xhr = _xhr()
      url = _nonce(url, options)
      _onload(xhr, url, options)
      _timeout(xhr, url, options)
      _data(options)
      xhr.open(options.method, url, true)
      _headers(xhr, options.headers)
      _contentType(xhr, options)
      xhr.send(options.method.match(__methods_with_data__) && options.data || null)
    }

    function _xhr() {
      if (window.ActiveXObject && (document.documentMode <= 8 || !window.XMLHttpRequest)) {
        return new window.ActiveXObject('Microsoft.XmlHttp')
      }
      return new window.XMLHttpRequest()
    }

    var
      __ajax_nonce__ = +(new Date()),
      __ready_state_done__ = 4,
      __content_form_urlencoded_regex__ = /application\/x\-www\-form\-urlencoded/,
      __content_form_urlencoded__ = "application/x-www-form-urlencoded; charset=UTF-8",
      __content_json_regex__ = /application\/json/,
      __content_json__ = "application/json; charset=UTF-8",
      //__content_multipart_regex__ = /multipart\/form\-data/,
      //__content_multipart__ = 'multipart/form-data; charset=UTF-8',
      __methods_with_data__ = /^(POST|PATCH|PUT)$/,
      __methods_with_response__ = /^(GET|HEAD|OPTIONS)$/
    //__methods_without_data__ = /^(GET|HEAD|OPTIONS|DELETE)$/,

    /** global: __methods_with_response__ */
    /** global: __ajax_nonce__ */
    /** global: __methods_with_data__ */
    /** global: __content_json_regex__ */
    /** global: __content_json__ */
    /** global: __content_form_urlencoded_regex__ */
    /** global: __content_form_urlencoded__ */

    function _nonce(url, options) {
      if (false === options.cache && options.method.match(__methods_with_response__)) {
        if (!url.match(/_=/)) {
          url += !url.match(/\?/) ?
            '?_=' :
            url.match(/\?$/) ?
            '_=' :
            '&_='
          url += __ajax_nonce__++
        }
      }
      return url
    }

    function _headers(xhr, headers) {
      if (headers) {
        /* eslint-disable guard-for-in */
        for (var key in headers) {
          xhr.setRequestHeader(key, headers[key])
        }
        /* eslint-enable guard-for-in */
      }
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    }

    function _contentType(xhr, options) {
      if (_dontNeedContentType(options)) {
        return
      }
      if (!options.contentType || options.contentType.match(__content_form_urlencoded_regex__)) {
        xhr.setRequestHeader('Content-type', __content_form_urlencoded__)
      } else if (options.contentType.match(__content_json_regex__)) {
        xhr.setRequestHeader('Content-type', __content_json__)
      }
      /*else if(options.contentType.match(__content_multipart_regex__)) {
        xhr.setRequestHeader('Content-type', __content_multipart__)
      }*/
      else {
        throw new Error('Unsupported content type ' + options.contentType)
      }
    }

    function _dontNeedContentType(options) {
      return (options.headers && options.headers['Content-type'] || !options.method.match(__methods_with_data__))
    }

    function _timeout(xhr, url, options) {
      if (options.timeout) {
        if (_usingOntimeout(xhr, url, options)) {
          return
        }
        _usingTimer(xhr, url, options)
      }
    }

    function _usingOntimeout(xhr, url, options) {
      if ('ontimeout' in xhr && 'timeout' in xhr) {
        try {
          xhr.timeout = options.timeout
          xhr.ontimeout = function() {
            _ajaxResponse(xhr, url, options)
          }
          return true
        } catch (e) {
          // ignore
        }
      }
      return false
    }

    function _usingTimer(xhr, url, options) {
      setTimeout(function() {
        try {
          xhr.abort()
        } catch (e) {
          // ignore
        }
        options.error('incomplete request', 0, url, xhr)
      }, options.timeout)
    }

    /** global: __methods_with_data__ */
    /** global: __content_form_urlencoded_regex__ */
    /** global: __content_json_regex__ */

    function _data(options) {
      if (!_needProcessData(options)) {
        return
      }
      if (!options.contentType || options.contentType.match(__content_form_urlencoded_regex__)) {
        var vars = []
        /* eslint-disable guard-for-in */
        for (var key in options.data) {
          vars.push(key + '=' + encodeURIComponent(options.data[key]))
        }
        /* eslint-enable guard-for-in */
        options.data = vars.join('&')
      } else if (options.contentType.match(__content_json_regex__)) {
        options.data = JSON.stringify(options.data)
      }
      /*else if(options.contentType.match(__content_multipart_regex__)) {
        options.data = _multipart(options.data)
      }*/
      else {
        throw new Error('Unsupported content type ' + options.contentType)
      }
    }

    function _needProcessData(options) {
      return (options.method.match(__methods_with_data__) && options.data && 'object' === typeof(options.data))
    }

    /*function _multipart(data) {
      if(window.FormData) {
        return _formData(data)
      }
      else {
        return _strMultipart(data)
      }
    }

    function _formData(data) {
      if(_isDOMElement(data) && 'form' == data.tagName.toLowerCase()) {
        return new window.FormData(data)
      }
      else {
        var formData = new window.FormData()
        for(var key in data) {
          formData.append(key, data[key])
        }
        return formData
      }
    }

    function _strMultipart(data) {
    }*/

    /** global: __ready_state_done__ */

    function _onload(xhr, url, options) {
      if ('onload' in xhr) {
        xhr.onload = function() {
          _ajaxResponse(xhr, url, options)
        }
      } else {
        xhr.onreadystatechange = function() {
          if (__ready_state_done__ === xhr.readyState) {
            _ajaxResponse(xhr, url, options)
          }
        }
      }
    }

    function _ajaxResponse(xhr, url, options) {
      if (0 === xhr.status) {
        options.error('incomplete request', xhr.status, url, xhr)
      } else if (200 <= xhr.status && 299 >= xhr.status) {
        options.success(_parsed(xhr, options), xhr.status, url, xhr)
      } else {
        options.error(_parsed(xhr, options), xhr.status, url, xhr)
      }
    }

    function _parsed(xhr, options) {
      switch (options.format) {
        case 'json':
          try {
            return JSON.parse(xhr.responseText)
          } catch (e) {
            return null
          }
        case 'xml':
          return xhr.responseXML
        default:
          return xhr.responseText
      }
    }

    /**
     * https://github.com/dperini/ContentLoaded
     */

    /** global: browse */

    var
      _root = document.documentElement,
      _modern = document.addEventListener,
      _add = _modern ? 'addEventListener' : 'attachEvent',
      _rem = _modern ? 'removeEventListener' : 'detachEvent',
      _pre = _modern ? '' : 'on'

    browse.ready = function(callback) {
      var
        init = _readyInit(callback),
        poll = _readyPoll()
      if (document.readyState === 'complete') {
        callback('lazy')
      } else {
        _notModernCheck(poll)
        document[_add](_pre + 'DOMContentLoaded', init, false)
        document[_add](_pre + 'readystatechange', init, false)
        window[_add](_pre + 'load', init, false)
      }
    }

    function _readyInit(callback) {
      var done = false
      var init = function(e) {
        if (e.type === 'readystatechange' && document.readyState !== 'complete') {
          return
        }
        (e.type === 'load' ? window : document)[_rem](_pre + e.type, init, false)
        if (!done) {
          done = true
          callback(e.type)
        }
      }
      return init
    }

    function _readyPoll() {
      var poll = function() {
        try {
          _root.doScroll('left')
        } catch (e) {
          setTimeout(poll, 20)
          return
        }
        init('poll')
      }
      return poll
    }

    function _notModernCheck(poll) {
      try {
        if (!_modern && _root.doScroll && !window.frameElement) {
          poll()
        }
      } catch (e) {
        // ignore
      }
    }

    /** global: browse */

    browse.capabilities = {
      'adjustOffsetX': 0,
      'adjustOffsetY': 0,
      'absolutePosition': false,
      'fixedPosition': false
    }

    function _detectIeOffset() {
      var rect = document.body.getBoundingClientRect()
      var marginLeft = parseInt($_(document.body).style('margin-left'), 10)
      var marginTop = parseInt($_(document.body).style('margin-top'), 10)
      /*if(!marginLeft) {
        marginLeft = 0
      }
      if(!marginTop) {
        marginTop = 0
      }*/
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

  }(window.browse = window.browse || {}))