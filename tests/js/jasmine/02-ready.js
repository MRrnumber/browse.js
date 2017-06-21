describe('ready', function() {

  it('should help detect completion of document loading', function() {
    var flag = false
    runs(function() {
      $_.ready(function() {
        expect(window.document).toBeDefined()
        expect(document.body).toBeDefined()
        expect(document.documentElement).toBeDefined()
        flag = true
      })
    })
    waitsFor(function() {
      return flag
    }, "tests readiness flag", 100)
  })

})
