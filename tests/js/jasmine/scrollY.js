describe('scrollY', function() {

  var frameInterval = 16

  it('should work to achieve desired scroll position', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
    var interval = 1000, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect($_.getCurrY()).toEqual(100)
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before
    runs(function() {
      before = new Date()
      $_.scrollY(100, interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'scrollY callback should have been called', 3000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
      window.scrollTo(0, 0)
    })
  })

  it('should run for a duration less than javascript frame interval', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
    var interval = 5, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect($_.getCurrY()).toEqual(100)
        done = true
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    var before = new Date()
    runs(function() {
      $_.scrollY(100, interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'scrollY callback should have been called', 1000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
      window.scrollTo(0, 0)
    })
  })

  it('should complete in a time close to given duration', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
    var interval = 1000, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect($_.getCurrY()).toEqual(100)
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
    var before
    runs(function() {
      before = new Date()
      $_.scrollY(100, interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'scrollY callback should have been called', 3000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
      window.scrollTo(0, 0)
    })
  })

  it('should work from any scroll position', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
    var interval = 1000, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect($_.getCurrY()).toEqual(100)
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
    var before
    runs(function() {
      before = new Date()
      window.scrollTo(0, 500)
      $_.scrollY(100, interval, function(obj){spy.callback(obj)})
    })
    waitsFor(function() {
      return done
    }, 'scrollY callback should have been called', 3000)
    runs(function() {
      expect(spy.callback).toHaveBeenCalled()
      elem.element.parentNode.removeChild(elem.element)
      window.scrollTo(0, 0)
    })
  })

})
