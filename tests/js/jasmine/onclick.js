describe('onclick', function() {

  it('should attach an event handler for click event that gets called on triggering click', function() {
    var button = $_(document.body).append('<input type=submit value=abc>').lastChild()
    var spy = {
      callback: function(e) {
        log('got called')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    button.onclick(spy.callback)
    button.trigger('click')
    expect(spy.callback).toHaveBeenCalled()
    button.element.parentNode.removeChild(button.element)
  })

  it('should attach an event handler and triggered event should have params specified', function() {
    var button = $_(document.body).append('<input type=submit value=abc>').lastChild()
    var spy = {
      callback: function(e) {
        log('got called')
        expect(e.button).toEqual(1)
        expect(e.ctrlKey).toEqual(true)
        expect(e.metaKey).toEqual(true)
        expect(e.detail).toNotEqual('xyz')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    button.onclick(spy.callback)
    button.trigger('click', { button: 1, ctrlKey: true, metaKey: true, detail: 'xyz' })
    expect(spy.callback).toHaveBeenCalled()
    button.element.parentNode.removeChild(button.element)
  })

})
