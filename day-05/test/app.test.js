const app = require('../src/app');

describe('Test parts of the challenge', function() {
  describe('Test part 1', function() {
    it('should return "CMZ" for the example input', function() {
      expect(app.firstPart('./public/example.txt')).toBe("CMZ")
    });
  });
  describe('Test part 2', function() {
    it('should return "MCD" for the example input', function() {
      expect(app.secondPart('./public/example.txt')).toBe("MCD")
    });
  });  
});