const app = require('../src/app');

describe('Test parts of the challenge', function() {
  describe('Test part 1', function() {
    it('should return 24000 for the example input', function() {
      expect(app.firstPart('./public/example.txt')).toBe(24000)
    });
  });
  describe('Test part 2', function() {
    it('should return 45000 for the example input', function() {
      expect(app.secondPart('./public/example.txt')).toBe(45000)
    });
  });  
});