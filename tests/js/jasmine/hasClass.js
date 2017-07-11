describe('hasClass', function() {

  it('should throw error for null class argument for element with no classes', function() {
    expect(function(){$_(document.body).hasClass(null)}).toThrow(new Error('Expected a valid class name'))
  })

  it('should throw error for empty string class argument for element with no classes', function() {
    expect(function(){$_(document.body).hasClass('')}).toThrow(new Error('Expected a valid class name'))
  })

  it('should return false for valid class argument for element with no classes', function() {
    expect($_(document.body).hasClass('some-class')).toEqual(false)
  })

  it('should throw error for null class argument for element with one class', function() {
    $_(document.body).append('<div class=has-class-single></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.hasClass(null)}).toThrow(new Error('Expected a valid class name'))
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for empty class argument for element with one class', function() {
    $_(document.body).append('<div class=has-class-single></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.hasClass('')}).toThrow(new Error('Expected a valid class name'))
    el.element.parentNode.removeChild(el.element)
  })

  it('should return true for existing class argument for element with one class', function() {
    $_(document.body).append('<div class=has-class-single></div>')
    var el = document.body.$_.lastChild()
    expect(el.hasClass('has-class-single')).toEqual(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for class arguments that are substrings', function() {
    $_(document.body).append('<div class="has-class-1"></div>')
    var el = document.body.$_.lastChild()
    expect(el.hasClass('has-class')).toEqual(false)
    expect(el.hasClass('class')).toEqual(false)
    expect(el.hasClass('class-1')).toEqual(false)
    el.element.parentNode.removeChild(el.element)
  })

  it('should return true for all existing class arguments for element with multiple classes', function() {
    $_(document.body).append('<div class="has-class-1 has-class-2 has-class-3"></div>')
    var el = document.body.$_.lastChild()
    expect(el.hasClass('has-class-1')).toEqual(true)
    expect(el.hasClass('has-class-2')).toEqual(true)
    expect(el.hasClass('has-class-3')).toEqual(true)
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for class arguments with trailing or beginning space', function() {
    $_(document.body).append('<div class="has-class-1 has-class-2 has-class-3"></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.hasClass(' has-class-1')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass('has-class-1 ')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass(' has-class-1 ')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass(' has-class-2')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass('has-class-2 ')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass(' has-class-2 ')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass('has-class-3 ')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass(' has-class-3')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass(' has-class-3 ')}).toThrow(new Error('Expected a valid class name'))
    el.element.parentNode.removeChild(el.element)
  })

  it('should throw error for class arguments that are substrings with at least one space', function() {
    $_(document.body).append('<div class="has-class-1 has-class-2 has-class-3"></div>')
    var el = document.body.$_.lastChild()
    expect(function(){el.hasClass('-class-1 has-class-2')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass('class-1 has-class-2 has')}).toThrow(new Error('Expected a valid class name'))
    expect(function(){el.hasClass('has-class-1 has-class-2')}).toThrow(new Error('Expected a valid class name'))
    el.element.parentNode.removeChild(el.element)
  })

})
