describe('fadeOut', function() {

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

  var frameInterval = 16

  it('should run for a duration less than javascript frame interval', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:10px>').lastChild()
    var interval = 5, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before = new Date()
    runs(function() {
      elem.fadeOut(interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'fadeOut callback should have been called', 1000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
    })
  })

  it('should complete in a time close to given duration', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:10px>').lastChild()
    var interval = 2000, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        if(window.requestAnimationFrame) {
          expect(time).toBeGreaterThan(interval)
          expect(time-interval).toBeLessThan(300)
        }
        else {
          expect(Math.abs(time-interval)).toBeLessThan(frameInterval + 1)
        }
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before = new Date()
    runs(function() {
      elem.fadeOut(interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'fadeOut callback should have been called', 3000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
    })
  })

})
