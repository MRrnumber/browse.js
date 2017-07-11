describe('addClass', function() {

  it('should throw error for null class argument', function() {
    expect(function(){$_(document.body).addClass(null)}).toThrow(new Error('Expected a valid class name'))
  })

  it('should throw error for empty class argument', function() {
    expect(function(){$_(document.body).addClass('')}).toThrow(new Error('Expected a valid class name'))
  })

  it('should add a new class for element with no classes', function() {
    $_(document.body).append('<div></div>')
    var el = document.body.$_.lastChild()
    el.addClass('add-class-none-1')
    expect(el.hasClass('add-class-none-1')).toEqual(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should add a new class for element with existing classes', function() {
    $_(document.body).append('<div class=add-class-exist-1></div>')
    var el = document.body.$_.lastChild()
    el.addClass('add-class-exist-2')
    expect(el.hasClass('add-class-exist-1')).toEqual(true)
    expect(el.hasClass('add-class-exist-2')).toEqual(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should not add an existing class again', function() {
    $_(document.body).append('<div class=add-class-already-1></div>')
    var el = document.body.$_.lastChild()
    expect(el.hasClass('add-class-already-1')).toEqual(true)
    el.addClass('add-class-already-1')
    expect(el.getClass()).toEqual('add-class-already-1')
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for class arguments with trailing or beginning space', function() {
    $_(document.body).append('<div></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.addClass('add-class-space-1 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('add-class-space-1')).toEqual(false)
    expect(function(){el.addClass(' add-class-space-2')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('add-class-space-2')).toEqual(false)
    expect(function(){el.addClass(' add-class-space-3 ')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('add-class-space-3')).toEqual(false)
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for class arguments with spaces in between', function() {
    $_(document.body).append('<div></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.addClass('add-class-within-1 add-class-within-2')}).toThrow(new Error('Expected a valid class name'))
    expect(el.hasClass('add-class-within-1')).toEqual(false)
    expect(el.hasClass('add-class-within-2')).toEqual(false)
    el.element.parentNode.removeChild(el.element)
  })

})
