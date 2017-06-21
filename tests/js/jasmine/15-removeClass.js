describe('removeClass', function() {

  /** Null class should not be allowed */
  it('should gracefully ignore null argument', function() {
    $_(document.body).append('<div class=remove-class-null></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.removeClass(null)
    expect($_newElem.hasClass('remove-class-null')).toBe(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Empty class name should not be allowed */
  it('should gracefully ignore empty argument', function() {
    $_(document.body).append('<div class=remove-class-empty></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.removeClass('')
    expect($_newElem.hasClass('remove-class-empty')).toBe(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Element with no classes should be able to deal with removing class */
  it('should remove nothing when no classes exist', function() {
    $_(document.body).append('<div></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.removeClass('remove-class-none-1')
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should be able to deal with a non-matching argument */
  it('should remove nothing when argument class does not exist', function() {
    $_(document.body).append('<div class=remove-class-exist-1></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.removeClass('remove-class-exist-2')
    expect($_newElem.hasClass('remove-class-exist-1')).toEqual(true)
    $_newElem.addClass('remove-class-exist-2')
    $_newElem.addClass('remove-class-exist-3')
    $_newElem.removeClass('remove-class-exist-4')
    expect($_newElem.hasClass('remove-class-exist-1')).toEqual(true)
    expect($_newElem.hasClass('remove-class-exist-2')).toEqual(true)
    expect($_newElem.hasClass('remove-class-exist-3')).toEqual(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should remove single existing class */
  it('should remove single existing class', function() {
    $_(document.body).append('<div class=remove-class-single-1></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass('remove-class-single-1')).toEqual(true)
    $_newElem.removeClass('remove-class-single-1')
    expect($_newElem.hasClass('remove-class-single-1')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should remove existing classes */
  it('should remove argument class if it exists', function() {
    $_(document.body).append('<div class="remove-class-1 remove-class-2 remove-class-3"></div>')
    var $_newElem = document.body.$_.lastChild()
    expect($_newElem.hasClass('remove-class-1')).toEqual(true)
    $_newElem.removeClass('remove-class-1')
    expect($_newElem.hasClass('remove-class-1')).toEqual(false)
    expect($_newElem.hasClass('remove-class-2')).toEqual(true)
    $_newElem.removeClass('remove-class-2')
    expect($_newElem.hasClass('remove-class-2')).toEqual(false)
    expect($_newElem.hasClass('remove-class-3')).toEqual(true)
    $_newElem.removeClass('remove-class-3')
    expect($_newElem.hasClass('remove-class-3')).toEqual(false)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should refuse arguments with trailing or beginning space */
  it('should refuse class names with trailing or beginning space', function() {
    $_(document.body).append('<div class=remove-class-space-1></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.removeClass('remove-class-space-1 ')
    expect($_newElem.hasClass('remove-class-space-1')).toEqual(true)
    $_newElem.removeClass(' remove-class-space-1')
    expect($_newElem.hasClass('remove-class-space-1')).toEqual(true)
    $_newElem.removeClass(' remove-class-space-1 ')
    expect($_newElem.hasClass('remove-class-space-1')).toEqual(true)
    $_newElem.addClass('remove-class-space-2').addClass('remove-class-space-3')
    $_newElem.removeClass('remove-class-space-2 ')
    expect($_newElem.hasClass('remove-class-space-2')).toEqual(true)
    $_newElem.removeClass(' remove-class-space-2')
    expect($_newElem.hasClass('remove-class-space-2')).toEqual(true)
    $_newElem.removeClass(' remove-class-space-2 ')
    expect($_newElem.hasClass('remove-class-space-2')).toEqual(true)
    $_newElem.removeClass('remove-class-space-3 ')
    expect($_newElem.hasClass('remove-class-space-3')).toEqual(true)
    $_newElem.removeClass(' remove-class-space-3')
    expect($_newElem.hasClass('remove-class-space-3')).toEqual(true)
    $_newElem.removeClass(' remove-class-space-3 ')
    expect($_newElem.hasClass('remove-class-space-3')).toEqual(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

  /** Should refuse arguments with space within */
  it('should refuse space separated class names', function() {
    $_(document.body).append('<div class="remove-class-within-1 remove-class-within-2"></div>')
    var $_newElem = document.body.$_.lastChild()
    $_newElem.removeClass('remove-class-within-1 remove-class-within-2')
    expect($_newElem.hasClass('remove-class-within-1')).toEqual(true)
    expect($_newElem.hasClass('remove-class-within-2')).toEqual(true)
    $_newElem.removeClass('class-within-1 remove-class-within')
    expect($_newElem.hasClass('remove-class-within-1')).toEqual(true)
    expect($_newElem.hasClass('remove-class-within-2')).toEqual(true)
    $_newElem.element.parentNode.removeChild($_newElem.element)
  })

})
