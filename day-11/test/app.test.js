const app = require('../src/app');

describe('Test parts of the challenge', function() {
  describe('Test part 1', function() {
    it('should return 10605 for the example input', function() {
      expect(app.firstPart('./public/example.txt')).toBe(10605);
    });
  });
  describe('Test part 2', function() {
    it('should return 2713310158 for the example input', function() {
      expect(app.secondPart('./public/example.txt')).toBe(2713310158);
    });
  });  
});