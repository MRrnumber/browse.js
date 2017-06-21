describe('after', function() {

  /** inserting after html or body should not be allowed */
  it('should not allow inserting after html or body', function() {
    $_(document.body).after('<div id=after-body>xyz</div>')
    expect(document.getElementById('after-body')).toBeNull()
    $_(document.documentElement).after('<div id=after-html>xyz</div>')
    expect(document.getElementById('after-html')).toBeNull()
  })

  /** should insert new elements in proper order */
  it('should insert new elements in the given order', function() {
    var div = document.getElementsByTagName('div')[0]
    $_(div).after('<div id=after-order-div></div><p id=after-order-p></p><ul id=after-order-ul></ul>')
    var e1 = document.getElementById('after-order-div'),
      e2 = document.getElementById('after-order-p'),
      e3 = document.getElementById('after-order-ul')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(div.$_.next().element).toEqual(e1)
    expect($_(e1).next().element).toEqual(e2)
    expect($_(e2).next().element).toEqual(e3)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  /** should be able to insert right at the end */
  it('should insert new elements after last child', function() {
    var last = $_(document.body).lastChild()
    last.after('<div id=after-last-div></div><p id=after-last-p></p>')
    var e1 = document.getElementById('after-last-div'),
      e2 = document.getElementById('after-last-p')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(last.next().element).toEqual(e1)
    expect($_(e1).next().element).toEqual(e2)
    expect(document.body.$_.lastChild().element).toEqual(e2)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
  })
})
