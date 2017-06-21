describe('next', function() {

  /** Should return null for an elment with no siblings */
  it('should return null in case there are no siblings', function() {
    expect(typeof($_(document.body).next)).toEqual('function')
    expect($_(document.body).next()).toBeNull()
  })

  /** Should return null for an elment which is the last child */
  it('should return null in case of last child', function() {
    expect($_(document.body).lastChild().next()).toBeNull()
  })

  /** Should return a valid element in case there is a sibling */
  it('should return valid next element sibling', function() {
    var next = $_(document.body).firstChild().next()
    expect(next).toBeDefined()
    expect(next).not.toBeNull()
    var expectedNext = $_(document.body).firstChild().element.nextSibling
    while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType) {
      expectedNext = expectedNext.nextSibling
    }
    expect(next.element).toEqual(expectedNext)
  })

})
