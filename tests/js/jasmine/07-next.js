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
    var pivot = $_(document.body).firstChild()
    var next = pivot.next()
    expect(next).toBeDefined()
    expect(next).not.toBeNull()
    var expectedNext = pivot.element.nextSibling
    while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType) {
      expectedNext = expectedNext.nextSibling
    }
    expect(next.element).toEqual(expectedNext)
  })

  /** Should return a valid element in case there is a sibling */
  it('should return valid next element sibling with a non-HTMLElement node in between', function() {
    var pivot = $_(document.body).firstChild()
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, pivot.element.nextSibling)
    var next = pivot.next()
    expect(next).toBeDefined()
    expect(next).not.toBeNull()
    var expectedNext = pivot.element.nextSibling
    while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType) {
      expectedNext = expectedNext.nextSibling
    }
    expect(next.element).toEqual(expectedNext)
    dummy.parentNode.removeChild(dummy)
  })

})
