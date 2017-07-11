/** global: browse */

browse.prototype.append = function(html, tagName) {
  if(_safeInsertAdjacentHtml(this.element, 'beforeend', html)) {
    return this
  }
  var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
  while(temp.childNodes.length) {
    this.element.appendChild(temp.childNodes[0])
  }
  return this
}

browse.prototype.prepend = function(html, tagName) {
  if(_safeInsertAdjacentHtml(this.element, 'afterbegin', html)) {
    return this
  }
  var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
  var firstChild = this.element.firstChild
  while(temp.childNodes.length) {
    _insertBeforeOrAppendChild(firstChild, this.element, temp.childNodes[0])
  }
  return this
}

browse.prototype.after = function(html, tagName) {
  if(_quickAfterBefore(this.element, html, 'afterend')) {
    return this
  }
  var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
  var next = this.next() && this.next().element || null
  while(temp.childNodes.length) {
    _insertBeforeOrAppendChild(next, this.element.parentNode, temp.childNodes[0])
  }
  return this
}

browse.prototype.before = function(html, tagName) {
  if(_quickAfterBefore(this.element, html, 'beforebegin')) {
    return this
  }
  var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
  while(temp.childNodes.length) {
    this.element.parentNode.insertBefore(temp.childNodes[0], this.element)
  }
  return this
}

function _quickAfterBefore(element, html, spec) {
  var tag = element.tagName.toLowerCase()
  if(-1 !== ['html', 'body'].indexOf(tag) || _safeInsertAdjacentHtml(element, spec, html)) {
    return true
  }
  return false
}

var __ie_invalid_target__ = /Invalid target element for this operation/

function _safeInsertAdjacentHtml(element, spec, html) {
  if(!element.insertAdjacentHTML) {
    return false
  }
  try {
    element.insertAdjacentHTML(spec, html)
    return true
  }
  catch(e) {
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
  }
  catch(e) {
    // do nothing
  }
}

function _insertBeforeOrAppendChild(before, par, what) {
  if(before) {
    par.insertBefore(what, before)
  }
  else {
    par.appendChild(what)
  }
}
