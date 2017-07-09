describe('style', function() {

  it('should return null if no property is specified', function() {
    expect($_(document.body).style()).toBeNull()
  })

  it('should provide style properties', function() {
    $_(document.body).append('<div id=test-style style=margin-left:4px;width:8px;border-top-style:solid></div>')
    var last = $_(document.body).lastChild()
    expect(last.style('margin-left')).toEqual('4px')
    expect(last.style('width')).toEqual('8px')
    expect(last.style('border-top-style')).toEqual('solid')
    last.element.parentNode.removeChild(last.element)
  })

  it('should set a given style property', function() {
    $_(document.body).append('<div id=test-style></div>')
    var last = $_(document.body).lastChild()
    last.style('margin-left', '4px')
    last.style('width', '8px')
    last.style('border-top-style', 'solid')
    expect(last.style('margin-left')).toEqual('4px')
    expect(last.style('width')).toEqual('8px')
    expect(last.style('border-top-style')).toEqual('solid')
    last.element.parentNode.removeChild(last.element)
  })

})
