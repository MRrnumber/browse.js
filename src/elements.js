window.Node = window.Node || {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9
}

var
  __node_type_element__ = Node.ELEMENT_NODE,
  __node_type_text__ = Node.TEXT_NODE,
  __node_type_comment__ = Node.COMMENT_NODE,
  __node_type_document__ = Node.DOCUMENT_NODE

browse.prototype.firstChild = function() {
  if('firstElementChild' in this.element) {
    return browse(this.element.firstElementChild)
  }
  var child = this.element.firstChild
  while(child && __node_type_element__ !== child.nodeType) {
    child = child.nextSibling
  }
  return browse(child)
}

browse.prototype.lastChild = function() {
  if('lastElementChild' in this.element) {
    return browse(this.element.lastElementChild)
  }
  var child = this.element.lastChild
  while(child && __node_type_element__ !== child.nodeType) {
    child = child.previousSibling
  }
  return browse(child)
}

browse.prototype.next = function() {
  if('nextElementSibling' in this.element) {
    return browse(this.element.nextElementSibling)
  }
  var next = this.element.nextSibling
  while(next && __node_type_element__ !== next.nodeType) {
    next = next.nextSibling
  }
  return browse(next)
}

browse.prototype.previous = function() {
  if('previousElementSibling' in this.element) {
    return browse(this.element.previousElementSibling)
  }
  var previous = this.element.previousSibling
  while(previous && __node_type_element__ !== previous.nodeType) {
    previous = previous.previousSibling
  }
  return browse(previous)
}

browse.prototype.append = function(html, tagName) {
  if(safeInsertAdjacentHtml(this.element, 'beforeend', html)) {
    return this
  }
  var temp = deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
  while(temp.childNodes.length) {
    this.element.appendChild(temp.childNodes[0])
  }
  return this
}

browse.prototype.prepend = function(html, tagName) {
  if(safeInsertAdjacentHtml(this.element, 'afterbegin', html)) {
    return this
  }
  var temp = deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
  var firstChild = this.element.firstChild
  while(temp.childNodes.length) {
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
  while(temp.childNodes.length) {
    insertBeforeOrAppendChild(next, this.element.parentNode, temp.childNodes[0])
  }
  return this
}

browse.prototype.before = function(html, tagName) {
  if (quickAfterBefore(this.element, html, 'beforebegin')) {
    return this
  }
  var temp = deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
  while(temp.childNodes.length) {
    this.element.parentNode.insertBefore(temp.childNodes[0], this.element)
  }
  return this
}

browse.prototype.hasClass = function(className) {
  if(!className || className.match(/ /)) {
    return false
  }
  var element = this.element
  if('classList' in element && element.classList.contains(className)) {
    return true
  }
  else if('className' in element) {
    return ((' '+element.className+' ').indexOf(' '+className+' ') > -1)
  }
  return false
}

browse.prototype.addClass = function(className) {
  if(!className || className.match(/ /)) {
    return this
  }
  var element = this.element
  if('classList' in element && !element.classList.contains(className)) {
    element.classList.add(className)
  }
  else if('className' in element) {
    if((' '+element.className+' ').indexOf(' '+className+' ') === -1) {
      element.className += ' ' + className
    }
  }
  return this
}

browse.prototype.removeClass = function(className) {
  if(!className || className.match(/ /)) {
    return this
  }
  var element = this.element
  if('classList' in element && element.classList.contains(className)) {
    element.classList.remove(className)
  }
  else if('className' in element) {
    var existingWithSpaces = ' ' + element.className + ' '
    var argumentWithSpaces = new RegExp(' ' + className + ' ', 'g')
    if(existingWithSpaces.match(argumentWithSpaces)) {
      element.className = existingWithSpaces.replace(argumentWithSpaces, '').replace(/^ /, '').replace(/ $/, '')
    }
  }
  return this
}

browse.prototype.topLeft = function() {
  var element = this.element
  if(element.getBoundingClientRect) {
    var rect = element.getBoundingClientRect()
    return {
      top : ('top' in rect ? rect.top : rect.y) + getCurrY() - browse.capabilities.adjustOffsetY,
      left: ('left' in rect ? rect.left : rect.x) + getCurrX() - browse.capabilities.adjustOffsetX
    }
  }
  return { top : 0, left : 0 }
}

browse.prototype.height = function() {
  return this.element.offsetHeight
}

browse.windowHeight = function() {
  return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
}

browse.prototype.width = function() {
  return this.element.offsetWidth
}

browse.windowWidth = function() {
  return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
}

browse.prototype.remove = function() {
  if(this.element.remove) {
    this.element.remove()
  }
  else {
    this.element.parentNode.removeChild(this.element)
  }
}

function quickAfterBefore(element, html, spec) {
  var tag = element.tagName.toLowerCase()
  if(-1 !== ['html', 'body'].indexOf(tag) || safeInsertAdjacentHtml(element, spec, html)) {
    return true
  }
  return false
}

var __ie_invalid_target__ = /Invalid target element for this operation/

function safeInsertAdjacentHtml(element, spec, html) {
  if(!element.insertAdjacentHTML) {
    return false
  }
  try {
    element.insertAdjacentHTML(spec, html)
    return true
  }
  catch(e) {
    if(window.console && window.console.log) {
      console.log(e.message)
      console.log('insertAdjacentHTML failed: ' + element.tagName + ' ' + html)
    }
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
  }
  catch(e) {
    if(window.console && window.console.log) {
      console.log(e.message)
      console.log('setting innerHTML failed: ' + element.tagName + ' ' + html)
    }
  }
}

function insertBeforeOrAppendChild(before, par, what)
{
  if(before)
  {
    par.insertBefore(what, before)
  }
  else
  {
    par.appendChild(what)
  }
}

function getCurrX() {
  return window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
}

browse.getCurrX = getCurrX

function getCurrY() {
  return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

browse.getCurrY = getCurrY
