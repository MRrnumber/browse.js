( /* eslint-disable complexity */ /* eslint-disable max-statements */ /* eslint-disable no-shadow-restricted-names */
  function(ns, undefined) {
    /* eslint-enable complexity */
    /* eslint-enable max-statements */ /* eslint-enable no-shadow-restricted-names */
    function browse(element) {
      if (!element || !isDOMElement(element)) {
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

    /*function isDOMNode(obj){
      return (
        typeof Node === "object"
        ? obj instanceof Node
        : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
      )
    }*/

    function isDOMElement(obj) {
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
      tagName = tagName || element && element.tagName.toLowerCase() || defTag
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

    browse.prototype.hasClass = function(className) {
      if (_emptyClassName(className)) {
        return false
      }
      var element = this.element
      if (_classListHasCheck(element, className)) {
        return true
      } else /*if('className' in element)*/ {
        return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1)
      }
    }

    browse.prototype.addClass = function(className) {
      if (_emptyClassName(className)) {
        return this
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
      if (_emptyClassName(className)) {
        return this
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

    function _emptyClassName(className) {
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
        if (!element.value) {
          var tagName = element.tagName.toLowerCase()
          if ('option' === tagName) {
            return element.innerHTML
          } else if ('input' === tagName) {
            var onTypes = ['radio', 'checkbox']
            if (-1 !== onTypes.indexOf(element.type)) {
              return 'on'
            }
          }
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
        return element.currentStyle[_toCamelCase(property)]
      }
    }

    function _toCamelCase(property) {
      return property.replace(/\-(\w)/g, function(str, letter) {
        return letter.toUpperCase()
      })
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
        if ('object' === typeof(e)) {
          if (e.type === 'readystatechange' && document.readyState !== 'complete') {
            return
          }
          (e.type === 'load' ? window : document)[_rem](_pre + e.type, init, false)
        }
        if (!done) {
          done = true
          callback(('object' === typeof(e) && e.type) || e)
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
      if (!marginLeft) {
        marginLeft = 0
      }
      if (!marginTop) {
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
        sX: window.scrollX || window.pageXOffset,
        sY: window.scrollY || window.pageYOffset
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