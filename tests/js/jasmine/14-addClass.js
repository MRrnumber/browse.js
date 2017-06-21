describe('addClass', function() {

  /** Null class should not be allowed */
  it('should gracefully ignore null argument', function() {
    $_(document.body).addClass(null)
    expect(document.body.$_.hasClass(null)).toBe(false)
  })

  /** Empty class name should not be allowed */
  it('should gracefully ignore empty argument', function() {
    $_(document.body).addClass('')
    expect(document.body.$_.hasClass('')).toBe(false)
  })

  /** Element with no classes should be able to add a class */
  it('should add a new class when no classes exist', function() {
    $_(document.body).append('<div></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.addClass('add-class-none-1')
    expect($_newElem.hasClass('add-class-none-1')).toEqual(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should be able to add a class when a class already exists */
  it('should add a new class when classes exist', function() {
    $_(document.body).append('<div class=add-class-exist-1></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.addClass('add-class-exist-2')
    expect($_newElem.hasClass('add-class-exist-1')).toEqual(true)
    expect($_newElem.hasClass('add-class-exist-2')).toEqual(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should refuse arguments with trailing or beginning space */
  it('should refuse class names with trailing or beginning space', function() {
    $_(document.body).append('<div></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.addClass('add-class-space-1 ')
    expect($_newElem.hasClass('add-class-space-1')).toEqual(false)
    $_newElem.addClass(' add-class-space-2')
    expect($_newElem.hasClass('add-class-space-2')).toEqual(false)
    $_newElem.addClass(' add-class-space-3 ')
    expect($_newElem.hasClass('add-class-space-3')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should refuse arguments with space within */
  it('should refuse space separated class names', function() {
    $_(document.body).append('<div></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.addClass('add-class-within-1 add-class-within-2')
    expect($_newElem.hasClass('add-class-within-1')).toEqual(false)
    expect($_newElem.hasClass('add-class-within-2')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

})
