describe('hasClass', function() {

  /** No classes, ask for null, expect false */
  it('should return false for null argument for element with no classes', function() {
    expect($_(document.body).hasClass(null)).toEqual(false)
  })

  /** No classes, ask for empty string, expect false */
  it('should return false for empty argument for element with no classes', function() {
    expect($_(document.body).hasClass('')).toEqual(false)
  })

  /** No classes, ask for any given string, expect false */
  it('should return false for element with no classes', function() {
    expect($_(document.body).hasClass('some-class')).toEqual(false)
  })

  /** Exactly one class, ask for null, expect false */
  it('should return false for null argument for element with one class', function() {
    $_(document.body).append('<div class=has-class-single></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass(null)).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Exactly one class, ask for empty string, expect false */
  it('should return false for empty argument for element with one class', function() {
    $_(document.body).append('<div class=has-class-single></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass('')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Exactly one class, ask for the same, expect true */
  it('should find existing class for element with one class', function() {
    $_(document.body).append('<div class=has-class-single></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass('has-class-single')).toEqual(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Three classes, ask for all of them, expect true for all */
  it('should find all classes from beginning to end in list', function() {
    $_(document.body).append('<div class="has-class-1 has-class-2 has-class-3"></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass('has-class-1')).toEqual(true)
    expect($_newElem.hasClass('has-class-2')).toEqual(true)
    expect($_newElem.hasClass('has-class-3')).toEqual(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Few classes, play with space at beginning and/or end, expect false */
  it('should return false for arguments with trailing or beginning space', function() {
    $_(document.body).append('<div class="has-class-1 has-class-2 has-class-3"></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass(' has-class-1')).toEqual(false)
    expect($_newElem.hasClass('has-class-1 ')).toEqual(false)
    expect($_newElem.hasClass(' has-class-1 ')).toEqual(false)
    expect($_newElem.hasClass(' has-class-2')).toEqual(false)
    expect($_newElem.hasClass('has-class-2 ')).toEqual(false)
    expect($_newElem.hasClass(' has-class-2 ')).toEqual(false)
    expect($_newElem.hasClass('has-class-3 ')).toEqual(false)
    expect($_newElem.hasClass(' has-class-3')).toEqual(false)
    expect($_newElem.hasClass(' has-class-3 ')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Substring match should not work */
  it('should not match substrings of classes', function() {
    $_(document.body).append('<div class="has-class-1 has-class-2 has-class-3"></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass('has-class')).toEqual(false)
    expect($_newElem.hasClass(' has-class')).toEqual(false)
    expect($_newElem.hasClass('-class-1')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Strings overlapping two or more classes should not work */
  it('should not match combinations of substrings of classes', function() {
    $_(document.body).append('<div class="has-class-1 has-class-2 has-class-3"></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass('-class-1 has-class-2')).toEqual(false)
    expect($_newElem.hasClass('class-1 has-class-2 has')).toEqual(false)
    expect($_newElem.hasClass('has-class-1 has-class-2')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

})
