/** global: browse */

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
  if(quickAfterBefore(this.element, html, 'afterend')) {
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
  if(quickAfterBefore(this.element, html, 'beforebegin')) {
    return this
  }
  var temp = deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
  while(temp.childNodes.length) {
    this.element.parentNode.insertBefore(temp.childNodes[0], this.element)
  }
  return this
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
    // do nothing
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
