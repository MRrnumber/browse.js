var httpHost = window.location.href.replace(/:7982.*$/, ':3005')

describe('ajax', function() {

  describe('GET', function() {

    it('should fetch an existing html file', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/test-1.html', {
          method: 'GET',
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should use nonce in the url to avoid caching', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/test-1.html', {
          method: 'GET',
          cache: false,
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            expect(url).toMatch(/test\-1.html\?_=/)
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should use nonce in the url with no parameters after ?', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/test-1.html?', {
          method: 'GET',
          cache: false,
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            expect(url).toMatch(/test\-1.html\?_=/)
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should use nonce in url having other query parameters', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/test-1.html?dummy=dummy', {
          method: 'GET',
          cache: false,
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            expect(url).toMatch(/test\-1.html\?dummy=dummy&_=/)
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should let nonce parameter be overridden', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/test-1.html?_=11048104810840', {
          method: 'GET',
          cache: false,
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            expect(url).toMatch(/test\-1.html\?_=11048104810840/)
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should timeout as per specified option if server does not respond', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/timeout?duration=1000', {
          method: 'GET',
          timeout: 400,
          success: function(response, status, url, xhr) {
            expect('success should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          },
          error: function(response, status, url, xhr) {
            expect(status).toEqual(0)
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should call error for 404 status code', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/non-existent', {
          method: 'GET',
          success: function(response, status, url, xhr) {
            expect('success should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          },
          error: function(response, status, url, xhr) {
            if(0 === status && !window.navigator.userAgent.match(/Firefox\/3.6/)) {
              expect(status).toEqual(404)
            }
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should json-parse the response if "json" format is specified', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/json', {
          method: 'GET',
          cache: false,
          format: 'json',
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            expect(response).toEqual(jasmine.any(Object))
            expect(response.x).toBeDefined()
            expect(response.y).toBeDefined()
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should json-parse the response to null for invalid json format in response, if "json" format is specified', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/bad-json', {
          method: 'GET',
          cache: false,
          format: 'json',
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            expect(response).toBeNull()
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should xml-parse the response if "xml" format is specified', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/xml', {
          method: 'GET',
          cache: false,
          format: 'xml',
          success: function(response, status, url, xhr) {
            expect(status).toEqual(200)
            expect(response.getElementsByTagName('x')).toBeDefined()
            expect(response.getElementsByTagName('x')).not.toBeNull()
            expect(response.getElementsByTagName('x').length).toEqual(1)
            expect(response.getElementsByTagName('y')).toBeDefined()
            expect(response.getElementsByTagName('y')).not.toBeNull()
            expect(response.getElementsByTagName('y').length).toEqual(1)
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

  })

  describe('POST', function() {

    it('should send form data without specifying content type', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/form-post', {
          method: 'POST',
          data: { x: 1, y: 2 },
          success: function(response, status, url, xhr) {
            expect(status).toEqual(201)
            expect(response).toEqual('x=1&y=2')
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should send form data when appropriate content type is specified', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/form-post', {
          method: 'POST',
          data: { x: 1, y: 2 },
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function(response, status, url, xhr) {
            expect(status).toEqual(201)
            expect(response).toEqual('x=1&y=2')
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should send json data when appropriate content type is specified', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/form-json', {
          method: 'POST',
          data: { x: 1, y: 2 },
          contentType: "application/json; charset=UTF-8",
          success: function(response, status, url, xhr) {
            expect(status).toEqual(201)
            expect(response).toEqual('{"x":1,"y":2}')
            done = true
          },
          error: function(response, status, url, xhr) {
            expect('error should not have been called').toEqual(false)
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should throw error while processing unsupported content-type', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/form-json', {
          method: 'POST',
          data: "some data",
          contentType: "text/xml",
          success: function(response, status, url, xhr) {
            expect('success should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          },
          error: function(response, status, url, xhr) {
            expect(response).toEqual('Unsupported content type text/xml')
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should throw error while processing data in case of unsupported content-type', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/form-json', {
          method: 'POST',
          data: {x: 1, y: 2},
          contentType: "text/xml",
          success: function(response, status, url, xhr) {
            expect('success should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          },
          error: function(response, status, url, xhr) {
            expect(response).toEqual('Unsupported content type text/xml')
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should call error for 400 status code caused by bad json in request body', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/form-json', {
          method: 'POST',
          data: "x=1{y=2;",
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          success: function(response, status, url, xhr) {
            expect('success should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          },
          error: function(response, status, url, xhr) {
            if(0 === status && !window.navigator.userAgent.match(/Firefox\/3.6/)) {
              expect(status).toEqual(400)
              expect(response).toEqual('{"error":"Unexpected token x"}')
            }
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

    it('should call error for 500 status code', function() {
      var done = false
      runs(function() {
        $_.ajax(httpHost + '/500', {
          method: 'POST',
          data: { x: 1, y: 2},
          contentType: 'application/json; charset=UTF-8',
          success: function(response, status, url, xhr) {
            expect('success should not have been called').toEqual(false)
            expect(response).toBeUndefined()
            done = true
          },
          error: function(response, status, url, xhr) {
            if(0 === status && !window.navigator.userAgent.match(/Firefox\/3.6/)) {
              expect(status).toEqual(500)
              expect(response).toEqual('{"error":"simulating 500"}')
            }
            done = true
          }
        })
      })
      waitsFor(function() {
        return done
      }, 'done to set true', 10000)
    })

  })

})
