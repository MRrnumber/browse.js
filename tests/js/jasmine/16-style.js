describe('style', function() {

  it('should return null if no property is specified', function() {
    expect($_(document.body).style()).toBeNull()
  })

  it('should provide style properties', function() {
    $_(document.body).append('<div style=margin-left:4px;width:8px;border-top-style:solid></div>')
    var last = $_(document.body).lastChild()
    expect(last.style('margin-left')).toEqual('4px')
    expect(last.style('width')).toEqual('8px')
    expect(last.style('border-top-style')).toEqual('solid')
  })

})
