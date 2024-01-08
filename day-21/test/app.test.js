const app = require('../src/app');

describe('Test parts of the challenge', function() {
  describe('Test part 1', function() {
    it('should return 152 for the example input', function() {
      expect(app.firstPart('./public/example.txt')).toBe(152);
    });
  });
  describe('Test part 2', function() {
    it('should return 301 for the example input', function() {
      expect(app.secondPart('./public/example.txt')).toBe(301);
    });
  });  
});