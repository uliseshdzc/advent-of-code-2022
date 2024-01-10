const app = require('../src/app');

describe('Test parts of the challenge', function() {

  describe('Test part 1', function() {
    describe('Test example', function() {
      it('should return 13 for the example input', function() {
        expect(app.firstPart('./public/example-1.txt')).toBe(13);
      });
    });
  });
  describe('Test part 2', function() {
    describe('Test example 1', function() {
      it('should return 1 for the example input', function() {
        expect(app.secondPart('./public/example-1.txt')).toBe(1);
      });
    });
    describe('Test example 2', function() {
      it('should return 36 for the example input', function() {
        expect(app.secondPart('./public/example-2.txt')).toBe(36);
      });
    });    
  });  
});