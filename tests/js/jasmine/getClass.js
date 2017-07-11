describe('getClass', function() {

  it('should return empty class list string for no classes case', function() {
    expect($_(document.body).getClass()).toEqual('')
  })

  it('should return single class string for element with one class', function() {
    $_(document.body).append('<div class=test-get-class id=get-class-div></div>')
    var elem = document.getElementById('get-class-div')
    expect($_(elem).getClass()).toEqual('test-get-class')
    elem.parentNode.removeChild(elem)
  })

  it('should return multiple class string for element with multiple classes', function() {
    $_(document.body).append('<div class="test-get-class-1 test-get-class-2 test-get-class-3" id=get-class-div></div>')
    var elem = document.getElementById('get-class-div')
    expect($_(elem).getClass()).toEqual('test-get-class-1 test-get-class-2 test-get-class-3')
    elem.parentNode.removeChild(elem)
  })

})
