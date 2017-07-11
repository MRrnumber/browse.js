describe('onkeyup', function() {

  it('should attach an event handler for keyup event that gets called on triggering keyup', function() {
    var text = $_(document.body).append('<input type=text>').lastChild()
    var spy = {
      callback: function(e) {
        log('got called')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    text.onkeyup(spy.callback)
    text.trigger('keyup')
    expect(spy.callback).toHaveBeenCalled()
    text.element.parentNode.removeChild(text.element)
  })

  it('should attach an event handler and triggered event should have params specified', function() {
    var text = $_(document.body).append('<input type=text>').lastChild()
    var spy = {
      callback: function(e) {
        log('got called')
        expect(parseInt(e.keyCode||e.charCode||e.code)).toEqual(2)
        expect(e.shiftKey).toEqual(true)
        expect(e.location).toEqual(1)
        expect(e.view).toNotEqual('xyz')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    text.onkeyup(spy.callback)
    text.trigger('keyup', { code: 2, keyCode: 2, charCode: 2, shiftKey: true, location: 1, view: 'xyz' })
    expect(spy.callback).toHaveBeenCalled()
    text.element.parentNode.removeChild(text.element)
  })

})
