describe('fadeIn', function() {

  var frameInterval = 16

  it('should complete to get a 100% opacity visible element', function() {
    var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
    var interval = 1000, done = false
    elem.opacity(0)
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(20)
        expect(obj.opacity()).toEqual(1.0)
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before = new Date()
    runs(function() {
      elem.fadeIn(interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'fadeIn callback should have been called', 3000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
    })
  })

  it('should run for a duration less than javascript frame interval', function() {
    var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
    var interval = 5, done = false
    elem.opacity(0)
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(20)
        expect(obj.opacity()).toEqual(1.0)
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before = new Date()
    runs(function() {
      elem.fadeIn(interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'fadeIn callback should have been called', 1000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
    })
  })

  it('should complete in a time close to given duration', function() {
    var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
    var interval = 1000, done = false
    elem.opacity(0)
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(20)
        expect(obj.opacity()).toEqual(1.0)
        if(window.requestAnimationFrame) {
          expect(time).toBeGreaterThan(interval-1)
          expect(time-interval).toBeLessThan(100)
        }
        else {
          if(Math.abs(time-interval) > frameInterval) {
            log('Animation overshot by more than 16ms')
          }
        }
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before = new Date()
    runs(function() {
      elem.fadeIn(interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'fadeIn callback should have been called', 3000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
    })
  })

  it('should work starting with any opacity level', function() {
    var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
    var interval = 1000, done = false
    elem.opacity(0.3)
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(20)
        expect(obj.opacity()).toEqual(1.0)
        if(window.requestAnimationFrame) {
          expect(time).toBeGreaterThan(interval-1)
          expect(time-interval).toBeLessThan(100)
        }
        else {
          if(Math.abs(time-interval) > frameInterval) {
            log('Animation overshot by more than 16ms')
          }
        }
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before = new Date()
    runs(function() {
      elem.fadeIn(interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'fadeIn callback should have been called', 3000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
    })
  })

})
