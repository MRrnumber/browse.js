describe('append', function() {

  it('should create a new element as last child', function() {
    var lastChild = $_(document.body).lastChild()
    document.body.$_.append('<p id=append-end-abc>xyz</p>')
    var e1 = document.getElementById('append-end-abc')
    expect(e1).not.toBeNull()
    expect(document.body.$_.lastChild()).not.toEqual(lastChild)
    expect(document.body.$_.lastChild()).toEqual(e1.$_)
    expect(lastChild.next()).toEqual(e1.$_)
    expect(e1.$_.next()).toBeNull()
    e1.parentNode.removeChild(e1)
  })

  it('should create new elements in given order', function() {
    var lastChild = $_(document.body).lastChild()
    document.body.$_.append('<p id=append-order-abc>xyz</p><div id=append-order-def></div><img id=append-order-ghi>')
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
    expect(document.body.$_.lastChild()).toEqual(e3.$_)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  it('should create new elements inside an empty element', function() {
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
    expect(empty.$_.firstChild().element).toEqual(e1)
    expect($_(e1).next().element).toEqual(e2)
    expect(empty.$_.lastChild().element).toEqual(e3)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  it('should create new elements inside an non-empty element', function() {
    var divs = document.getElementsByTagName('div'),
      notEmpty = null
    for (var i = 0; i < divs.length; ++i) {
      if (divs[i].childNodes.length) {
        notEmpty = divs[i]
        break
      }
    }
    expect(notEmpty).not.toBeNull()
    var lastChild = $_(notEmpty).lastChild()
    notEmpty.$_.append('<p id=append-notEmpty-abc>xyz</p><div id=append-notEmpty-def></div><img id=append-notEmpty-ghi>')
    var e1 = document.getElementById('append-notEmpty-abc'),
      e2 = document.getElementById('append-notEmpty-def'),
      e3 = document.getElementById('append-notEmpty-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(lastChild.next().element).toEqual(e1)
    expect(e1.$_.next().element).toEqual(e2)
    expect(notEmpty.$_.lastChild().element).toEqual(e3)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  it('should fail with table tags in some browsers', function() {
    $_(document.body).append('<table id=append-table123></table>')
    var table = document.getElementById('append-table123')
    expect(table).not.toBeNull()
    $_(table).append('<thead id=append-thead123></thead>')
    $_(table).append('<tbody id=append-tbody123></tbody>')
    var thead = document.getElementById('append-thead123')
    var tbody = document.getElementById('append-tbody123')
    if(!thead||!tbody) table.parentNode.removeChild(table)
    expect(thead).not.toBeNull()
    expect(tbody).not.toBeNull()
    $_(thead).append('<tr id=append-theadtr123></tr>')
    $_(tbody).append('<tr id=append-tbodytr123></tr>')
    var thead_tr = document.getElementById('append-theadtr123')
    var tbody_tr = document.getElementById('append-tbodytr123')
    if(!thead_tr||!tbody_tr) table.parentNode.removeChild(table)
    expect(thead_tr).not.toBeNull()
    expect(tbody_tr).not.toBeNull()
    $_(thead_tr).append('<th id=append-theadtrth123>abc</th>')
    $_(tbody_tr).append('<td id=append-tbodytrtd123>abc</td>')
    var thead_tr_th = document.getElementById('append-theadtrth123')
    var tbody_tr_td = document.getElementById('append-tbodytrtd123')
    if(!thead_tr_th||!tbody_tr_td) table.parentNode.removeChild(table)
    expect(thead_tr_th).not.toBeNull()
    expect(tbody_tr_td).not.toBeNull()
    table.parentNode.removeChild(table)
  })
})
