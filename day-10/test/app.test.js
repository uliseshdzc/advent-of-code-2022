const app = require('../src/app');

describe('Test parts of the challenge', function() {

  describe('Test part 1', function() {
    it('should return 13140 for the example input', function() {
      expect(app.firstPart('./public/example.txt')).toBe(13140);
    });
  });
});