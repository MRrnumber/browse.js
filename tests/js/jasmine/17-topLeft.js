describe('topLeft', function() {

  /** should return consistent values post scrolling */
  it('should return consistent values through window scrolling', function() {
    // Jasmine dependent code below
    var div = document.getElementsByTagName('div')[26]
    var initialTL = $_(div).topLeft()
    window.scrollTo(0, 100)
    var afterScrollTL = $_(div).topLeft()
    // Windows Phone has decimal values for top/left and they are
    // off by a margin less than 1. All other platforms work with
    // simple equality checks: afterScrollTL.? = initialTL.?
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 200)
    afterScrollTL = $_(div).topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 400)
    afterScrollTL = $_(div).topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 600)
    afterScrollTL = $_(div).topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 800)
    afterScrollTL = $_(div).topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
  })

  /** should return valid values of absolute position elements */
  it('should return valid values for absolute position', function()
  {
    if(! $_.capabilities.absolutePosition) return
    $_(document.body).append('<div id=topleft-absolute style=position:absolute;top:100px;left:100px></div>')
    var $_div = document.body.$_.lastChild()
    var initialTL = $_div.topLeft()
    // Windows Phone has decimal values for top/left and they are
    // off by a margin less than 1. All other platforms work with
    // simple equality checks: afterScrollTL.? = initialTL.?
    expect(Math.abs(initialTL.top-100)).toBeLessThan(1)
    expect(Math.abs(initialTL.left-100)).toBeLessThan(1)
    window.scrollTo(0, 100)
    var afterScrollTL = $_div.topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 200)
    afterScrollTL = $_div.topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 400)
    afterScrollTL = $_div.topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 600)
    afterScrollTL = $_div.topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    window.scrollTo(0, 800)
    afterScrollTL = $_div.topLeft()
    expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
    expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    $_div.element.parentNode.removeChild($_div.element)
    window.scrollTo(0, 0)
  })

  /** should return valid values of fixed position elements */
  it('should return valid values for fixed position', function() {
    if(! $_.capabilities.fixedPosition) return
    $_(document.body).append('<div id=topleft-fixed style=position:fixed;top:100px;left:100px></div>')
    var $_div = document.body.$_.lastChild()
    var initialTL = $_div.topLeft(), afterScrollTL
    expect(initialTL.left).toEqual(100)
    $_div.element.parentNode.removeChild($_div.element)

    // When it comes to scrolling and rendering fixed elements, older
    // OS's have some huge crazy to mad issues. Various versions were
    // tried. For one version where scrollTo is put under a 0 timeout
    // handler, things work for android; but again not on others e.g.
    // iOS, winphone, opera os etc. Also, when this 0 timeout version
    // is put under runs() and waitsFor() blocks of Jasmine, things do
    // not work.
  })

})
