const app = require('../src/app');

describe('Test parts of the challenge', function() {

  describe('Test part 1', function() {
    describe('Test example 1', function() {
      it('should return 7 for the example input', function() {
        expect(app.firstPart('./public/example-1.txt')).toBe(7)
      });
    });
    describe('Test example 2', function() {
      it('should return 5 for the example input', function() {
        expect(app.firstPart('./public/example-2.txt')).toBe(5)
      });
    });
    describe('Test example 3', function() {
      it('should return 6 for the example input', function() {
        expect(app.firstPart('./public/example-3.txt')).toBe(6)
      });
    });
    describe('Test example 4', function() {
      it('should return 10 for the example input', function() {
        expect(app.firstPart('./public/example-4.txt')).toBe(10)
      });
    });
    describe('Test example 5', function() {
      it('should return 11 for the example input', function() {
        expect(app.firstPart('./public/example-5.txt')).toBe(11)
      });
    });
  });

  describe('Test part 2', function() {
    describe('Test example 1', function() {
      it('should return 19 for the example input', function() {
        expect(app.secondPart('./public/example-1.txt')).toBe(19)
      });
    });
    describe('Test example 2', function() {
      it('should return 23 for the example input', function() {
        expect(app.secondPart('./public/example-2.txt')).toBe(23)
      });
    });
    describe('Test example 3', function() {
      it('should return 23 for the example input', function() {
        expect(app.secondPart('./public/example-3.txt')).toBe(23)
      });
    });
    describe('Test example 4', function() {
      it('should return 29 for the example input', function() {
        expect(app.secondPart('./public/example-4.txt')).toBe(29)
      });
    });
    describe('Test example 5', function() {
      it('should return 26 for the example input', function() {
        expect(app.secondPart('./public/example-5.txt')).toBe(26)
      });
    });
  });  
});