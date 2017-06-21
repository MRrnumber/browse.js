describe('browse', function() {

  /** Test: Wrap a non HTMLElement node */
  it('should return null for a non-HTMLElement node', function() {
    // the DOM element being accessed below is a Text node
    expect($_("String")).toBe(null)
  })

  /** Test: Wrap body element and check its internal browse structure */
  it('should return a valid object for body element', function() {
    expect($_(document.body)).toBeTruthy()
    expect($_(document.body).element).toBeTruthy()
    expect($_(document.body).element.tagName.toLowerCase()).toEqual('body')
  })

  /** Test: Once an element has been wrapped it must have an '$_' member */
  it('should create the $_ member', function() {
    expect(document.body.$_).toBeTruthy()
    expect(document.body.$_.element).toBeTruthy()
    expect(document.body.$_.element).toEqual(document.body)
  })

  /** Test: Wrapping a browse.js wrapper should return null */
  it('should return null for a browse.js wrapper', function() {
    expect($_($_(document.body))).toBeNull()
  })
})
