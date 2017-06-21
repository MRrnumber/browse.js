describe('append', function() {

  /** Should add all html only at the end */
  it('should add new elements at the end', function() {
    var lastChild = $_(document.body).lastChild()
    $_(document.body).append('<p id=append-end-abc>xyz</p>')
    var e1 = document.getElementById('append-end-abc')
    expect(e1).not.toBeNull()
    expect($_(e1).next()).toBeNull()
    expect(lastChild.next().element).toEqual(e1)
    e1.parentNode.removeChild(e1)
  })

  /** Should add all html in the given order */
  it('should add new elements in the given order', function() {
    var lastChild = $_(document.body).lastChild()
    $_(document.body).append('<p id=append-order-abc>xyz</p><div id=append-order-def></div><img id=append-order-ghi>')
    var e1 = document.getElementById('append-order-abc'),
      e2 = document.getElementById('append-order-def'),
      e3 = document.getElementById('append-order-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(lastChild.next().element).toEqual(e1)
    expect($_(e1).next().element).toEqual(e2)
    expect($_(e2).next().element).toEqual(e3)
    expect($_(e3).next()).toBeNull()
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  /** Should append in case there were no children before */
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
    $_(empty).append('<p id=append-empty-abc>xyz</p><div id=append-empty-def></div><img id=append-empty-ghi>')
    var e1 = document.getElementById('append-empty-abc'),
      e2 = document.getElementById('append-empty-def'),
      e3 = document.getElementById('append-empty-ghi')
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
    $_(document.body).append('<table id=append-table123></table>')
    var table = document.getElementById('append-table123')
    if (!table) return
    expect(table).not.toBeNull()
    $_(table).append('<thead id=append-thead123></thead>')
    var thead = document.getElementById('append-thead123')
    $_(table).append('<tbody id=append-tbody123></tbody>')
    var tbody = document.getElementById('append-tbody123')
    if (thead) {
      $_(thead).append('<tr id=append-theadtr123></tr>')
      var thead_tr = document.getElementById('append-theadtr123')
      if (thead_tr) {
        $_(thead_tr).append('<th id=append-theadtrth123>abc</th>')
        var thead_tr_th = document.getElementById('append-theadtrth123')
        expect(thead_tr_th).not.toBeNull()
      }
    }
    if (tbody) {
      $_(tbody).append('<tr id=append-tbodytr123></tr>')
      var tbody_tr = document.getElementById('append-tbodytr123')
      if (tbody_tr) {
        $_(tbody_tr).append('<td id=append-tbodytrtd123>abc</td>')
        var tbody_tr_td = document.getElementById('append-tbodytrtd123')
        expect(tbody_tr_td).not.toBeNull()
      }
    }
    table.parentNode.removeChild(table)
  })
})
