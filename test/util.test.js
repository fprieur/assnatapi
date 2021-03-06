var sut = require(process.env.ASSNAT_COV ? '../lib-cov/util' : '../lib/util'),
  expect = require('expect.js')

describe('util', function() {
  
  describe('.extend', function() {
    it('should be a function', function() {
      expect(sut.extend).to.be.a('function')
    })

    it('should return null if the destination object is null', function() {
      expect(sut.extend(null, {a:true})).to.be(null)
    })

    it('should not alter the destination if the source is null', function() {
      expect(sut.extend({}, null)).to.be.eql({})
    })

    it('should copy properties of the source to the destination', function() {
      var dest = sut.extend({}, {a: true})
      expect(dest).to.have.key('a')
      expect(dest.a).to.be.ok()
    })

    it('should copy properties of multiple sources to the destination', function() {
      var dest = sut.extend({}, {a: true}, {b: 1}, {c: 'a'})
      expect(dest).to.have.key('a')
      expect(dest).to.have.key('b')
      expect(dest).to.have.key('c')
      expect(dest.a).to.be.ok()
      expect(dest.b).to.be(1)
      expect(dest.c).to.be('a')
    })

    it('should override an existing properties with the latest source', function() {
      var dest = sut.extend({a: 'a'}, {a: 'b'}, {a: 'c'})
      expect(dest).to.have.key('a')
      expect(dest.a).to.be('c')
    })
  })

  describe('.normalizeCriteria', function() {
    it('should be a function', function() {
      expect(sut.normalizeCriteria).to.be.a('function')
    })

    it('should return null if criteria is null', function() {
      expect(sut.normalizeCriteria(null)).to.be(null)
    })

    it('should return null if spec is null', function() {
      expect(sut.normalizeCriteria({}, null)).to.be(null)
    })

    it('should return empty object if spec is empty', function() {
      expect(sut.normalizeCriteria({a: true, b: false}, {})).to.be.eql({})
    })

    it('should return properties set to true in spec, ignoring others', function() {
      expect(sut.normalizeCriteria({a: true, b: false}, {b: true})).to.be.eql({b: false})
    })

    it('should return a property as true if it is "1"', function() {
      expect(sut.normalizeCriteria({a: '1'}, {a: {isBoolean: true}})).to.be.eql({a: true})
    })

    it('should return a property as true if it is "true"', function() {
      expect(sut.normalizeCriteria({a: 'true'}, {a: {isBoolean: true}})).to.be.eql({a: true})
    })

    it('should return a property as false if it is "2"', function() {
      expect(sut.normalizeCriteria({a: '2'}, {a: {isBoolean: true}})).to.be.eql({a: false})
    })

    it('should return a property as true if it is "2" and trueValues contains "2"', function() {
      expect(sut.normalizeCriteria({a: '2'}, {a: {isBoolean: true, trueValues: ["2"]}})).to.be.eql({a: true})
    })

    it('should return a property as false if it is "true" and **falseValues** contains "true"', function() {
      expect(sut.normalizeCriteria({a: 'true'}, {a: {isBoolean: true, falseValues: ["true"]}})).to.be.eql({a: false})
    })

    it('should return the value as is if no star is used with wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: 'test'}, {a: {wrapInRegex: true}})).to.be.eql({a: 'test'})
    })

    it('should return an unescaped string as is if no star and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: '/test[-]$'}, {a: {wrapInRegex: true}})).to.be.eql({a: '/test[-]$'})
    })

    it('should return the value as regex if start star and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: '*test'}, {a: {wrapInRegex: true}}).a.toString()).to.be('/test$/i')
    })

    it('should return the value as regex if end star and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: 'test*'}, {a: {wrapInRegex: true}}).a.toString()).to.be('/^test/i')
    })

    it('should return the value as regex if both stars and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: '*test*'}, {a: {wrapInRegex: true}}).a.toString()).to.be('/test/i')
    })

    it('should return an escaped string if start star and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: '*/test[-]$'}, {a: {wrapInRegex: true}}).a.toString()).to.be('/\\/test\\[\\-\\]\\$$/i')
    })

    it('should return an escaped string if end star and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: '/test[-]$*'}, {a: {wrapInRegex: true}}).a.toString()).to.be('/^\\/test\\[\\-\\]\\$/i')
    })

    it('should return an escaped string if both stars and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: '*/test[-]$*'}, {a: {wrapInRegex: true}}).a.toString()).to.be('/\\/test\\[\\-\\]\\$/i')
    })

    it('should escape middle stars when stars and wrapInRegex', function() {
      expect(sut.normalizeCriteria({a: '*/te*st[-]$*'}, {a: {wrapInRegex: true}}).a.toString()).to.be('/\\/te\\*st\\[\\-\\]\\$/i')
    })

    it('should return an object with the mapTo property', function() {
      expect(sut.normalizeCriteria({a: 'toto'}, {a: {mapTo: 'b'}})).to.be.eql({b: 'toto'})
    })

    it('should return an object with the mapTo property and value reversed', function() {
      expect(sut.normalizeCriteria({a: '1'}, {a: {mapTo: 'b', isBoolean: true, mapReverseValue: true}})).to.be.eql({b: false})
    })

    it('should return an object with the mapTo property and value not reversed', function() {
      expect(sut.normalizeCriteria({a: '1'}, {a: {mapTo: 'b', isBoolean: true, mapReverseValue: false}})).to.be.eql({b: true})
    })
  })

  describe('.getSortObject', function() {
    it('should be a function', function() {
      expect(sut.getSortObject).to.be.a('function')
    })

    it('should return null if qs is null', function() {
      expect(sut.getSortObject(null)).to.be(null)
    })

    it('should return null if qs has no "sort" property', function() {
      expect(sut.getSortObject({nosort: true})).to.be(null)
    })

    it('should return null if sort is empty', function() {
      expect(sut.getSortObject({sort: ''})).to.be(null)
    })

    it('should return an object with sort field = 1', function() {
      expect(sut.getSortObject({sort: 'a'})).to.be.eql({a: 1})
    })

    it('should return an object with multiple sort fields comma-separated', function() {
      expect(sut.getSortObject({sort: 'a,b,c'})).to.be.eql({a: 1, b: 1, c: 1})
    })

    it('should make a minus-prefixed field a descending sort', function() {
      expect(sut.getSortObject({sort: 'a,-b,-c'})).to.be.eql({a: 1, b: -1, c: -1})
    })
  })

  describe('.getLimitValue', function() {
    it('should be a function', function() {
      expect(sut.getLimitValue).to.be.a('function')
    })

    it('should return the default value if qs is null', function() {
      expect(sut.getLimitValue(null)).to.be(sut.DEFAULT_LIMIT)
    })

    it('should ignore invalid numbers', function() {
      expect(sut.getLimitValue({limit: 'a2d2'})).to.be(sut.DEFAULT_LIMIT)
    })

    it('should limit to the maximum default value', function() {
      expect(sut.getLimitValue({limit: '123456'})).to.be(sut.DEFAULT_LIMIT)
    })

    it('should use the provided value', function() {
      expect(sut.getLimitValue({limit: '10'})).to.be(10)
    })
  })

  describe('.getSkipValue', function() {
    it('should be a function', function() {
      expect(sut.getSkipValue).to.be.a('function')
    })

    it('should return null|undefined if qs is null', function() {
      expect(sut.getSkipValue(null)).to.not.be.ok()
    })

    it('should ignore invalid numbers', function() {
      expect(sut.getSkipValue({skip: 'wfwef'})).to.not.be.ok()
    })

    it('should use the provided value', function() {
      expect(sut.getSkipValue({skip: '7'})).to.be(7)
    })
  })

  describe('.buildOptionsObject', function() {
    it('should be a function', function() {
      expect(sut.buildOptionsObject).to.be.a('function')
    })

    it('should only return limit if qs is null', function() {
      expect(sut.buildOptionsObject(null)).to.be.eql({limit: sut.DEFAULT_LIMIT})
    })

    it('should return limit and skip if skip != 0', function() {
      expect(sut.buildOptionsObject({limit: '10', skip: '5'})).to.be.eql({limit: 10, skip: 5})
    })

    it('should return limit and sort', function() {
      expect(sut.buildOptionsObject({limit: '10', sort: 'a,-b,c'})).to.be.eql({limit: 10, sort: {a:1, b:-1,c:1}})
    })

    it('should return the whole thing, ignoring other properties', function() {
      expect(sut.buildOptionsObject({limit: '10', skip: '5', sort: 'a,-b,c', toto: '4'})).to.be.eql({limit: 10, skip: 5, sort: {a:1, b:-1,c:1}})
    })
  })

  describe('.escapeForRegex', function() {
    it('should be a function', function() {
      expect(sut.escapeForRegex).to.be.a('function')
    })

    it('should escape a simple string', function() {
      expect(sut.escapeForRegex('[not(a.reg$exp)]!')).to.be('\\[not\\(a\\.reg\\$exp\\)\\]!')
    })

    it('should escape the whole bunch of characters', function() {
      expect(sut.escapeForRegex('[-/\\^$*+?.()|[]{}]')).to.be('\\[\\-\\/\\\\\\^\\$\\*\\+\\?\\.\\(\\)\\|\\[\\]\\{\\}\\]')
    })

    it('should return untouched if nothing to escape', function() {
      expect(sut.escapeForRegex('test')).to.be('test')
    })

    it('should return null if null', function() {
      expect(sut.escapeForRegex(null)).to.be(null)
    })
  })
})
