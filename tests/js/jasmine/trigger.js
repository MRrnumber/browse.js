describe('trigger', function() {

  it('should throw an error for unsupported event type', function() {
    expect(function(){$_(document.body).trigger('mousemove')}).toThrow(new Error('Unsupported event mousemove'))
  })

})
