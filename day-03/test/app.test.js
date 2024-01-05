const app = require('../src/app');

describe('Test parts of the challenge', function() {
  describe('Test part 1', function() {
    it('should return 157 for the example input', function() {
      expect(app.firstPart('./public/example.txt')).toBe(157)
    });
  });
  describe('Test part 2', function() {
    it('should return 70 for the example input', function() {
      expect(app.secondPart('./public/example.txt')).toBe(70)
    });
  });  
});