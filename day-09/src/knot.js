module.exports = class Knot {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  move(direction, steps) {
    if (direction === 'R') this.x++;
    if (direction === 'L') this.x--;
    if (direction === 'U') this.y++;
    if (direction === 'D') this.y--;
  }

  followKnot(knot) {
    let horzDiff = knot.x - this.x;
    let vertDiff = knot.y - this.y;

    if (knot.x != this.x && knot.y != this.y && (Math.abs(horzDiff) == 2 || Math.abs(vertDiff) == 2)) {
      this.x += Math.sign(horzDiff);
      this.y += Math.sign(vertDiff);
      return 
    }

    if (Math.abs(horzDiff) == 2) {
      this.x += Math.sign(horzDiff);
      return
    }

    if (Math.abs(vertDiff) == 2) {
      this.y += Math.sign(vertDiff);
      return
    }
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}