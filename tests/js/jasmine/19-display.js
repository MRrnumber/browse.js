describe('hide', function() {

  it('should hide a given element', function() {
    var el = $_(document.body)
    el.hide()
    expect(el.element.offsetWidth).toEqual(0)
    el.element.style.display = ''
  })

  it('should hide a given element with a truthy display value', function() {
    var el = $_(document.body)
    el.element.style.display = 'block'
    el.hide()
    expect(el.element.offsetWidth).toEqual(0)
    expect(el.element.style.$_savedDisplay).toEqual('block')
    el.element.style.display = ''
  })

})

describe('show', function() {

  it('should show a given element', function() {
    var el = $_(document.body)
    var width = el.element.offsetWidth
    el.element.style.$_savedDisplay = ''
    el.element.style.display = 'none'
    el.show()
    expect(el.element.offsetWidth).not.toEqual(0)
    expect(el.element.offsetWidth).toEqual(width)
  })

  it('should show a given element after setting a truthy display value and hiding', function() {
    var el = $_(document.body)
    var width = el.element.offsetWidth
    el.element.style.display = 'block'
    el.hide().show()
    expect(el.element.offsetWidth).not.toEqual(0)
    expect(el.element.offsetWidth).toEqual(width)
    expect(el.element.style.$_savedDisplay).toEqual('block')
  })

})
