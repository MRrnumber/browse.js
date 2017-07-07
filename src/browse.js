function browse(element) {
  if(!element || !isDOMElement(element)) {
    return null
  }
  if(element.$_) {
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

function isDOMElement(obj){
  return (
    typeof window.HTMLElement === "object"
    ? obj instanceof window.HTMLElement
    : null !== obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string"
  )
}

/** global: ns */
ns = window.$_ = browse
