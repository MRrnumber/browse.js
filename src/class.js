/** global: browse */

browse.prototype.hasClass = function(className) {
  if(emptyClassName(className)) {
    return false
  }
  var element = this.element
  if(classListHasCheck(element, className)) {
    return true
  }
  else if('className' in element) {
    return ((' '+element.className+' ').indexOf(' '+className+' ') > -1)
  }
  return false
}

browse.prototype.addClass = function(className) {
  if(emptyClassName(className)) {
    return this
  }
  var element = this.element
  if(classListHasNotCheck(element, className)) {
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
  if(emptyClassName(className)) {
    return this
  }
  var element = this.element
  if(classListHasCheck(element, className)) {
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

function emptyClassName(className) {
  return (!className || className.match(/ /))
}

function classListHasCheck(element, className) {
  return('classList' in element && element.classList.contains(className))
}

function classListHasNotCheck(element, className) {
  return('classList' in element && !element.classList.contains(className))
}
