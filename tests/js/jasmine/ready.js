var readyFlag = false

var checkReady = function() {
  $_.ready(function() {
    expect(window.document).toBeDefined()
    expect(document.body).toBeDefined()
    expect(document.documentElement).toBeDefined()
    readyFlag = true
  })
}

describe('ready', function() {

  it('should help detect completion of document loading', function() {
    runs(function() {
      checkReady()
    })
    waitsFor(function() {
      return readyFlag
    }, "ready did not work", 100)
  })

})
