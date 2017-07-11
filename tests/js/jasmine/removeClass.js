describe('removeClass', function() {

  it('should throw error for null class argument', function() {
    $_(document.body).append('<div class=remove-class-null></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.removeClass(null)}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-null')).toBe(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for empty class argument', function() {
    $_(document.body).append('<div class=remove-class-empty></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.removeClass('')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-empty')).toBe(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should remove nothing for valid class argument when no classes exist', function() {
    $_(document.body).append('<div></div>')
    var el = document.body.$_.lastChild()
    el.removeClass('remove-class-none-1')
    expect(el.getClass()).toEqual('')
    el.element.parentNode.removeChild(el.element)
  })

  it('should remove nothing for valid non-existing argument class', function() {
    $_(document.body).append('<div class=remove-class-exist-1></div>')
    var el = document.body.$_.lastChild()
    el.removeClass('remove-class-exist-2')
    expect(el.hasClass('remove-class-exist-1')).toEqual(true)
    el.addClass('remove-class-exist-2')
    el.removeClass('remove-class-exist-4')
    expect(el.hasClass('remove-class-exist-1')).toEqual(true)
    expect(el.hasClass('remove-class-exist-2')).toEqual(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should remove single existing class', function() {
    $_(document.body).append('<div class=remove-class-single-1></div>')
    var el = document.body.$_.lastChild()
    expect(el.hasClass('remove-class-single-1')).toEqual(true)
    el.removeClass('remove-class-single-1')
    expect(el.hasClass('remove-class-single-1')).toEqual(false)
    el.element.parentNode.removeChild(el.element)
  })

  it('should remove exisiting argument classes', function() {
    $_(document.body).append('<div class="remove-class-1 remove-class-2 remove-class-3"></div>')
    var el = document.body.$_.lastChild()
    expect(el.hasClass('remove-class-1')).toEqual(true)
    el.removeClass('remove-class-1')
    expect(el.hasClass('remove-class-1')).toEqual(false)
    expect(el.hasClass('remove-class-2')).toEqual(true)
    el.removeClass('remove-class-2')
    expect(el.hasClass('remove-class-2')).toEqual(false)
    expect(el.hasClass('remove-class-3')).toEqual(true)
    el.removeClass('remove-class-3')
    expect(el.hasClass('remove-class-3')).toEqual(false)
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for class names with trailing or beginning space', function() {
    $_(document.body).append('<div class=remove-class-space-1></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.removeClass('remove-class-space-1 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-1')).toEqual(true)
    expect(function(){el.removeClass(' remove-class-space-1')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-1')).toEqual(true)
    expect(function(){el.removeClass(' remove-class-space-1 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-1')).toEqual(true)
    el.addClass('remove-class-space-2').addClass('remove-class-space-3')
    expect(function(){el.removeClass('remove-class-space-2 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-2')).toEqual(true)
    expect(function(){el.removeClass(' remove-class-space-2')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-2')).toEqual(true)
    expect(function(){el.removeClass(' remove-class-space-2 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-2')).toEqual(true)
    expect(function(){el.removeClass('remove-class-space-3 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-3')).toEqual(true)
    expect(function(){el.removeClass(' remove-class-space-3')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-3')).toEqual(true)
    expect(function(){el.removeClass(' remove-class-space-3 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-space-3')).toEqual(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for class names with spaces in between', function() {
    $_(document.body).append('<div class="remove-class-within-1 remove-class-within-2"></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.removeClass('remove-class-within-1 remove-class-within-2')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-within-1')).toEqual(true)
    expect(el.hasClass('remove-class-within-2')).toEqual(true)
    expect(function(){el.removeClass('class-within-1 remove-class-within')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('remove-class-within-1')).toEqual(true)
    expect(el.hasClass('remove-class-within-2')).toEqual(true)
    el.element.parentNode.removeChild(el.element)
  })

})
