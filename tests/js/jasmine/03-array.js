describe('Array', function() {

  /** Test: forEach method must exist on an array as browse.js adds it */
  it('should have forEach method', function() {
    var array = []
    expect(array.forEach).toBeDefined()
    expect(typeof(array.forEach)).toEqual('function')
  })

  /** Test: every method must exist on an array as browse.js adds it */
  it('should have every method', function() {
    var array = []
    expect(array.every).toBeDefined()
    expect(typeof(array.every)).toEqual('function')
  })

  /** Test: indexOf method must exist on an array as browse.js adds it */
  it('should have indexOf method', function() {
    var array = []
    expect(array.indexOf).toBeDefined()
    expect(typeof(array.indexOf)).toEqual('function')
  })

  /** Test: remove method must exist on an array as browse.js adds it */
  it('should have remove method', function() {
    var array = []
    expect(array.remove).toBeDefined()
    expect(typeof(array.remove)).toEqual('function')
  })

  /** Test: observe that forEach works */
  it('forEach method should loop through all elements', function() {
    var array = [1, 2, 3]
    array.forEach(function(val, idx, arr) {
      arr[idx] = val + 1
      return 1 // try to break out
    })
    expect(array).toEqual([2, 3, 4])
  })

  /** Test: observe that every works until false is returned */
  it('every method should loop through all elements until falsy result', function() {
    var array = [1, 2, 3]
    array.every(function(val, idx, arr) {
      arr[idx] = val + 1
      return (arr[idx] % 2 ? false : true)
    })
    expect(array).toEqual([2, 3, 3])
  })

  /** Test: observe that indexOf works */
  it('indexOf method should return correct index', function() {
    var array = [1, 2, 2, 3]
    expect(array.indexOf(2)).toEqual(1)
    expect(array.indexOf(4)).toEqual(-1)
  })

  /** Test: observe that remove works */
  it('remove method should remove expected members', function() {
    var array = [1, 2, 4, 2, 3]
    array.remove(3)
    expect(array).toEqual([1, 2, 4, 2])
    array.remove(1)
    expect(array).toEqual([2, 4, 2])
    array.remove(2)
    expect(array).toEqual([4, 2])
    array.remove(4, 2)
    expect(array).toEqual([])
    array = [1, 3]
    array.remove(3, 3)
    expect(array).toEqual([1])
  })

})
