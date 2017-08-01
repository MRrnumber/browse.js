describe('fadeOut', function() {

  var frameInterval = 16

  it('should complete to get a 0% opacity invisible element', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:10px>').lastChild()
    var interval = 1000, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(0)
        expect(obj.opacity()).toEqual(0)
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

  it('should run for a duration less than javascript frame interval', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:10px>').lastChild()
    var interval = 5, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(0)
        expect(obj.opacity()).toEqual(0)
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
    var interval = 1000, done = false
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(0)
        expect(obj.opacity()).toEqual(0)
        if(window.requestAnimationFrame) {
          expect(time).toBeGreaterThan(interval-1)
          expect(time-interval).toBeLessThan(200)
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

  it('should work starting with any opacity level', function() {
    var elem = $_(document.body).append('<div style=background-color:black;height:10px>').lastChild()
    var interval = 1000, done = false
    elem.opacity(0.65)
    var spy = {
      callback: function(obj) {
        var after = new Date(),
          time = after.getTime() - before.getTime()
        log('time taken (ms)', time)
        expect(obj).toEqual(elem)
        expect(obj.element.offsetHeight).toEqual(0)
        expect(obj.opacity()).toEqual(0)
        if(window.requestAnimationFrame) {
          expect(time).toBeGreaterThan(interval-1)
          expect(time-interval).toBeLessThan(200)
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
