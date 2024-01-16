const app = require('../src/app');

describe('Test parts of the challenge', function() {

  describe('Test part 1', function() {
    describe('Test example', function() {
      it('should return 13 for the example input', function() {
        expect(app.firstPart('./public/example.txt')).toBe(13);
      });
    });
  });
  describe('Test part 2', function() {
    describe('Test example', function() {
      it('should return 140 for the example input', function() {
        expect(app.secondPart('./public/example.txt')).toBe(140);
      });
    });
  });  
});