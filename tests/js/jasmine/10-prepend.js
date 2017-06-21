describe('prepend', function() {

  /** Should add all html only at the beginning */
  it('should add new elements at the beginning', function() {
    var firstChild = $_(document.body).firstChild()
    $_(document.body).prepend('<p id=prepend-begin-abc>xyz</p>')
    var e1 = document.getElementById('prepend-begin-abc')
    expect(e1).not.toBeNull()
    expect($_(e1).previous()).toBeNull()
    expect(firstChild.previous().element).toEqual(e1)
    e1.parentNode.removeChild(e1)
  })

  /** Should add all html in the given order */
  it('should add new elements in the given order', function() {
    var firstChild = $_(document.body).firstChild()
    $_(document.body).prepend('<p id=prepend-order-abc>xyz</p><div id=prepend-order-def></div><img id=prepend-order-ghi>')
    var e1 = document.getElementById('prepend-order-abc'),
      e2 = document.getElementById('prepend-order-def'),
      e3 = document.getElementById('prepend-order-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(firstChild.previous().element).toEqual(e3)
    expect($_(e3).previous().element).toEqual(e2)
    expect($_(e2).previous().element).toEqual(e1)
    expect($_(e1).previous()).toBeNull()
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  /** Should prepend in case there were no children before */
  it('should add new elements when no children exist', function() {
    var divs = document.getElementsByTagName('div'),
      empty = null
    for (var i = 0; i < divs.length; ++i) {
      if (!divs[i].childNodes.length) {
        empty = divs[i]
        break
      }
    }
    expect(empty).not.toBeNull()
    $_(empty).prepend('<p id=prepend-empty-abc>xyz</p><div id=prepend-empty-def></div><img id=prepend-empty-ghi>')
    var e1 = document.getElementById('prepend-empty-abc'),
      e2 = document.getElementById('prepend-empty-def'),
      e3 = document.getElementById('prepend-empty-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect($_(empty).firstChild().element).toEqual(e1)
    expect($_(empty).firstChild().next().element).toEqual(e2)
    expect($_(empty).lastChild().element).toEqual(e3)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  /** Should take care of IE < 8 issues with table, tbody, thead, tr */
  it('should work around IE <= 8 issues with table related tags', function() {
    $_(document.body).prepend('<table id=prepend-table123></table>')
    var table = document.getElementById('prepend-table123')
    if (!table) return
    expect(table).not.toBeNull()
    $_(table).prepend('<thead id=prepend-thead123></thead>')
    var thead = document.getElementById('prepend-thead123')
    $_(table).prepend('<tbody id=prepend-tbody123></tbody>')
    var tbody = document.getElementById('prepend-tbody123')
    if (thead) {
      $_(thead).prepend('<tr id=prepend-theadtr123></tr>')
      var thead_tr = document.getElementById('prepend-theadtr123')
      if (thead_tr) {
        $_(thead_tr).prepend('<th id=prepend-theadtrth123>abc</th>')
        var thead_tr_th = document.getElementById('prepend-theadtrth123')
        expect(thead_tr_th).not.toBeNull()
      }
    }
    if (tbody) {
      $_(tbody).prepend('<tr id=prepend-tbodytr123></tr>')
      var tbody_tr = document.getElementById('prepend-tbodytr123')
      if (tbody_tr) {
        $_(tbody_tr).prepend('<td id=prepend-tbodytrtd123>abc</td>')
        var tbody_tr_td = document.getElementById('prepend-tbodytrtd123')
        expect(tbody_tr_td).not.toBeNull()
      }
    }
    table.parentNode.removeChild(table)
  })
})
