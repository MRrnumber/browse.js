describe('onchange', function() {

  it('should attach an event handler for change event that gets called on triggering change', function() {
    var text = $_(document.body).append('<input type=text>').lastChild()
    var spy = {
      callback: function(e) {
        log('got called')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    text.onchange(spy.callback)
    text.trigger('change')
    expect(spy.callback).toHaveBeenCalled()
    text.element.parentNode.removeChild(text.element)
  })

})
