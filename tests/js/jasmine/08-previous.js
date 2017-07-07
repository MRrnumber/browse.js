describe('previous', function() {

  /** Should return null for an elment with no siblings */
  it('should return null in case there are no siblings', function() {
    expect(typeof($_(document.documentElement).previous)).toEqual('function')
    expect($_(document.documentElement).previous()).toBeNull()
  })

  /** Should return null for an elment which is the first child */
  it('should return null in case of first child', function() {
    expect($_(document.body).firstChild().previous()).toBeNull()
  })

  /** Should return a valid element in case there is a sibling */
  it('should return valid previous element sibling', function() {
    var pivot = $_(document.body).lastChild()
    var previous = pivot.previous()
    expect(previous).toBeDefined()
    expect(previous).not.toBeNull()
    var expectedPrevious = pivot.element.previousSibling
    while (expectedPrevious && Node.ELEMENT_NODE !== expectedPrevious.nodeType) {
      expectedPrevious = expectedPrevious.previousSibling
    }
    expect(previous.element).toEqual(expectedPrevious)
  })

  /** Should return a valid element in case there is a sibling */
  it('should return valid previous element sibling with a non-HTMLElement node in between', function() {
    var pivot = $_(document.body).lastChild()
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, pivot.element)
    var previous = pivot.previous()
    expect(previous).toBeDefined()
    expect(previous).not.toBeNull()
    var expectedPrevious = pivot.element.previousSibling
    while (expectedPrevious && Node.ELEMENT_NODE !== expectedPrevious.nodeType) {
      expectedPrevious = expectedPrevious.previousSibling
    }
    expect(previous.element).toEqual(expectedPrevious)
    dummy.parentNode.removeChild(dummy)
  })
})
