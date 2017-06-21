describe('before', function() {

  /** inserting before html or body should not be allowed */
  it('should not allow inserting before html or body', function() {
    $_(document.body).before('<div id=before-body>xyz</div>')
    expect(document.getElementById('before-body')).toBeNull()
    $_(document.documentElement).before('<div id=before-html>xyz</div>')
    expect(document.getElementById('before-html')).toBeNull()
  })

  /** should insert new elements in proper order */
  it('should insert new elements in the given order', function() {
    var div = $_(document.body).lastChild().element
    $_(div).before('<div id=before-order-div></div><p id=before-order-p></p><ul id=before-order-ul></ul>')
    var e1 = document.getElementById('before-order-div'),
      e2 = document.getElementById('before-order-p'),
      e3 = document.getElementById('before-order-ul')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(div.$_.previous().element).toEqual(e3)
    expect($_(e3).previous().element).toEqual(e2)
    expect($_(e2).previous().element).toEqual(e1)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  /** should be able to insert right at the beginning */
  it('should insert new elements before first child', function() {
    var first = $_(document.body).firstChild()
    first.before('<div id=before-first-div></div><p id=before-first-p></p>')
    var e1 = document.getElementById('before-first-div'),
      e2 = document.getElementById('before-first-p')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(first.previous().element).toEqual(e2)
    expect($_(e2).previous().element).toEqual(e1)
    expect(document.body.$_.firstChild().element).toEqual(e1)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
  })

})
