if (window.NodeList) {

  describe('NodeList', function() {

    /** Test: forEach method must exist on NodeList as we add it */
    it('should have forEach method', function() {
      expect(NodeList.prototype.forEach).toBeDefined()
      expect(typeof(NodeList.prototype.forEach)).toEqual('function')
    })

    /** Test: every method must exist on NodeList as we add it */
    it('should have every method', function() {
      expect(NodeList.prototype.every).toBeDefined()
      expect(typeof(NodeList.prototype.every)).toEqual('function')
    })
  })

}
