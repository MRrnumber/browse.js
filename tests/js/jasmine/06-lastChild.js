describe('lastChild', function() {

  /** Should return null for elements with no children */
  it('should return null in case there is no child', function() {
    var scriptNode = document.getElementsByTagName('script')[0]
    expect(scriptNode).not.toBeNull()
    expect(typeof($_(scriptNode).lastChild)).toEqual('function')
    expect($_(scriptNode).lastChild()).toBeNull()
  })

  /** Should return the valid last element child */
  it('should return a valid element which is last element child', function() {
    var lastChild = $_(document.body).lastChild()
    expect(lastChild).not.toBeNull()
    expect(lastChild.element).toBeDefined()
    var numChildren = document.body.childNodes.length
    var expectedLastChild = document.body.childNodes[numChildren - 1]
    while (expectedLastChild && Node.ELEMENT_NODE !== expectedLastChild.nodeType) {
      expectedLastChild = expectedLastChild.previousSibling
    }
    expect(lastChild.element).toEqual(expectedLastChild)
  })

})
