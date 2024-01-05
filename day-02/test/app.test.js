const app = require('../src/app');

describe('Test parts of the challenge', function() {
  describe('Test part 1', function() {
    it('should return 15 for the example input', function() {
      expect(app.firstPart('./public/example.txt')).toBe(15)
    });
  });
  describe('Test part 2', function() {
    it('should return 12 for the example input', function() {
      expect(app.secondPart('./public/example.txt')).toBe(12)
    });
  });  
});