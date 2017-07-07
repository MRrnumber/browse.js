describe('firstChild', function() {

  /** Should return null for elements with no children */
  it('should return null in case there is no child', function() {
    var scriptNode = document.getElementsByTagName('script')[0]
    expect(scriptNode).not.toBeNull()
    expect(typeof($_(scriptNode).firstChild)).toEqual('function')
    expect($_(scriptNode).firstChild()).toBeNull()
  })

  /** Should return the valid first element child */
  it('should return a valid element which is first element child', function() {
    var firstChild = $_(document.body).firstChild()
    expect(firstChild).not.toBeNull()
    expect(firstChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(firstChild.element).toEqual(expectedFirstChild)
  })

  /** Should return the valid first element child */
  it('should return a valid element which is first element child preceded by a non-HTMLElement node', function() {
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, document.body.childNodes[0])
    var firstChild = $_(document.body).firstChild()
    expect(firstChild).not.toBeNull()
    expect(firstChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(firstChild.element).toEqual(expectedFirstChild)
    dummy.parentNode.removeChild(dummy)
  })

})
