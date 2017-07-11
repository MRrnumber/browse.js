describe('style', function() {

  function log() {
    if(window.console && window.console.log) {
      if(window.console.log.apply) {
        window.console.log.apply(window.console, arguments)
      }
      else {
        var message = Array.prototype.join.call(arguments, ' ')
        window.console.log(message)
      }
    }
  }

  function checkUnitSupport(val, unit) {
    if('auto' === val || 0 === parseInt(val)) {
      log('browser does not support "' + unit + '" unit')
      return false
    }
    return true
  }

  it('should return null if no property is specified', function() {
    expect($_(document.body).style()).toBeNull()
  })

  it('should provide style properties', function() {
    $_(document.body).append('<div id=test-style style=margin-left:4px;width:8px;border-top-style:solid></div>')
    var last = $_(document.body).lastChild()
    expect(last.style('margin-left')).toEqual('4px')
    expect(last.style('width')).toEqual('8px')
    expect(last.style('border-top-style')).toEqual('solid')
    last.element.parentNode.removeChild(last.element)
  })

  it('should set a given style property', function() {
    $_(document.body).append('<div id=test-style></div>')
    var last = $_(document.body).lastChild()
    last.style('margin-left', '4px')
    last.style('width', '8px')
    last.style('border-top-style', 'solid')
    expect(last.style('margin-left')).toEqual('4px')
    expect(last.style('width')).toEqual('8px')
    expect(last.style('border-top-style')).toEqual('solid')
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute ch unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:4ch></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'ch')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute cm unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:4cm></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'cm')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute mm unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:4mm></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'mm')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute in unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:2in></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'in')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute pt unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:4pt></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'pt')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute pc unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:4pc></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'pc')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute em unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=font-size:14px><div id=test-style-child style=font-size:1em></div></div>')
    var last = $_(document.body).lastChild()
    var child = last.firstChild()
    var fontSize = child.style('font-size')
    if(!checkUnitSupport(fontSize, 'em')) return
    expect(fontSize).toMatch(/^[\d\.]+px/)
    expect(parseInt(fontSize)).toEqual(14)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute ex unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=font-size:14px;height:4ex></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'ex')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute % unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:50px><div id=test-style-child style=height:10%></div></div>')
    var last = $_(document.body).lastChild()
    var child = last.firstChild()
    var height = child.style('height')
    if(!checkUnitSupport(height, '%')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute vh unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:10vh></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'vh')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute vw unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=height:10vw></div>')
    var last = $_(document.body).lastChild()
    var height = last.style('height')
    if(!checkUnitSupport(height, 'vw')) return
    expect(height).toMatch(/^[\d\.]+px/)
    expect(parseInt(height)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

  it('should compute rem unit measurements into px', function() {
    $_(document.body).append('<div id=test-style style=font-size:2rem></div>')
    var last = $_(document.body).lastChild()
    var fontSize = last.style('font-size')
    if(!checkUnitSupport(fontSize, 'rem')) return
    expect(fontSize).toMatch(/^[\d\.]+px/)
    expect(parseInt(fontSize)).toBeGreaterThan(0)
    last.element.parentNode.removeChild(last.element)
  })

})
