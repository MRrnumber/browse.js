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

    function forEach(callback) {
      for (var idx = 0; idx < this.length; ++idx) {
        callback(this[idx], idx, this)
      }
    }

    function every(callback) {
      for (var idx = 0; idx < this.length; ++idx) {
        if (!callback(this[idx], idx, this)) {
          return
        }
      }
    }

    /* eslint-disable no-extend-native */
    Array.prototype.forEach = Array.prototype.forEach || forEach
    Array.prototype.every = Array.prototype.every || every

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

    if (window.NodeList) {
      window.NodeList.prototype.forEach = window.NodeList.prototype.forEach || forEach
      window.NodeList.prototype.every = window.NodeList.prototype.every || every
    }

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
      if (safeInsertAdjacentHtml(this.element, 'beforeend', html)) {
        return this
      }
      var temp = deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
      while (temp.childNodes.length) {
        this.element.appendChild(temp.childNodes[0])
      }
      return this
    }

    browse.prototype.prepend = function(html, tagName) {
      if (safeInsertAdjacentHtml(this.element, 'afterbegin', html)) {
        return this
      }
      var temp = deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
      var firstChild = this.element.firstChild
      while (temp.childNodes.length) {
        insertBeforeOrAppendChild(firstChild, this.element, temp.childNodes[0])
      }
      return this
    }

    browse.prototype.after = function(html, tagName) {
      if (quickAfterBefore(this.element, html, 'afterend')) {
        return this
      }
      var temp = deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
      var next = this.next() && this.next().element || null
      while (temp.childNodes.length) {
        insertBeforeOrAppendChild(next, this.element.parentNode, temp.childNodes[0])
      }
      return this
    }

    browse.prototype.before = function(html, tagName) {
      if (quickAfterBefore(this.element, html, 'beforebegin')) {
        return this
      }
      var temp = deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
      while (temp.childNodes.length) {
        this.element.parentNode.insertBefore(temp.childNodes[0], this.element)
      }
      return this
    }

    function quickAfterBefore(element, html, spec) {
      var tag = element.tagName.toLowerCase()
      if (-1 !== ['html', 'body'].indexOf(tag) || safeInsertAdjacentHtml(element, spec, html)) {
        return true
      }
      return false
    }

    var __ie_invalid_target__ = /Invalid target element for this operation/

    function safeInsertAdjacentHtml(element, spec, html) {
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

    function deriveTagAndSafeSetInnerHTML(element, html, tagName, defTag) {
      tagName = tagName || element && element.tagName.toLowerCase() || defTag
      var temp = document.createElement(tagName)
      safeSetInnerHTML(temp, html)
      return temp
    }

    function safeSetInnerHTML(element, html) {
      try {
        element.innerHTML = html
      } catch (e) {
        // do nothing
      }
    }

    function insertBeforeOrAppendChild(before, par, what) {
      if (before) {
        par.insertBefore(what, before)
      } else {
        par.appendChild(what)
      }
    }

    /** global: browse */

    browse.prototype.hasClass = function(className) {
      if (emptyClassName(className)) {
        return false
      }
      var element = this.element
      if (classListHasCheck(element, className)) {
        return true
      } else if ('className' in element) {
        return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1)
      }
      return false
    }

    browse.prototype.addClass = function(className) {
      if (emptyClassName(className)) {
        return this
      }
      var element = this.element
      if (classListHasNotCheck(element, className)) {
        element.classList.add(className)
      } else if ('className' in element) {
        if ((' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1) {
          element.className += ' ' + className
        }
      }
      return this
    }

    browse.prototype.removeClass = function(className) {
      if (emptyClassName(className)) {
        return this
      }
      var element = this.element
      if (classListHasCheck(element, className)) {
        element.classList.remove(className)
      } else if ('className' in element) {
        var existingWithSpaces = ' ' + element.className + ' '
        var argumentWithSpaces = new RegExp(' ' + className + ' ', 'g')
        if (existingWithSpaces.match(argumentWithSpaces)) {
          element.className = existingWithSpaces.replace(argumentWithSpaces, '').replace(/^ /, '').replace(/ $/, '')
        }
      }
      return this
    }

    function emptyClassName(className) {
      return (!className || className.match(/ /))
    }

    function classListHasCheck(element, className) {
      return ('classList' in element && element.classList.contains(className))
    }

    function classListHasNotCheck(element, className) {
      return ('classList' in element && !element.classList.contains(className))
    }

    /** global: browse */

    browse.prototype.topLeft = function() {
      var element = this.element
      if (element.getBoundingClientRect) {
        var rect = element.getBoundingClientRect()
        return {
          top: rect.top + getCurrY() - browse.capabilities.adjustOffsetY,
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

    /** global: browse */

    var __opacity_regex__ = /^alpha\(opacity=([0-9]+)\)/g

    browse.prototype.style = function(property) {
      if (!property) {
        return null
      }
      if (this.element.currentStyle) {
        property = property.replace(/\-(\w)/g, function(str, letter) {
          return letter.toUpperCase()
        })
        return this.element.currentStyle[property]
      } else if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(this.element, null).getPropertyValue(property)
      }
      return null
    }

    /*browse.prototype.opacity = function(value) {
      var element = this.element
      if(undefined === value) {
        if(undefined !== element.style.opacity) {
          return element.style.opacity !== '' ? parseFloat(element.style.opacity) : 1
        }
        else if(undefined !== element.style.filter) {
          return parseFloat(element.style.filter.match(__opacity_regex__)[1]) / 100
        }
        else {
          throw Error('No support for opacity on the browser')
        }
      }
      if(undefined !== element.style.opacity) {
        element.style.opacity = parseFloat(value)
      }
      else if(undefined !== element.style.filter) {
        element.style.filter = 'alpha(opacity=' + ((100 * parseFloat(value)) | 0) + ')'
      }
      else {
        throw Error('No support for opacity on the browser')
      }
      return this
    }

    browse.prototype.display = function(value) {
      var element = this.element
      if(undefined === value) {
        return element.style.display
      }
      if('none' === value && 'none' !== element.style.display) {
        element.style.savedDisplay = element.style.display
      }
      element.style.display = value
      return this
    }*/

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
          callback(e.type) // || e
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

    function detectIEWindowOffset() {
      var rect = document.body.getBoundingClientRect()
      var marginLeft = parseInt($_(document.body).style('margin-left'), 10)
      var marginTop = parseInt($_(document.body).style('margin-top'), 10)
      if (!marginLeft) {
        marginLeft = 0
      }
      if (!marginTop) {
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

  }(window.browse = window.browse || {}))