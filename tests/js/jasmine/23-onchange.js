describe('onchange', function() {

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
