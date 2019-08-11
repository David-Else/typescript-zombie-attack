"use strict";
// var vector = {
//   _x: 1,
//   _y: 0,
//   create(x: number, y: number) {
//     const obj = Object.create(this);
//     obj.setX(x);
//     obj.setY(y);
//     return obj;
//   },
//   setX(value: number) {
//     this._x = value;
//   },
//   getX() {
//     return this._x;
//   },
//   setY(value: number) {
//     this._y = value;
//   },
//   getY() {
//     return this._y;
//   },
//   setAngle(angle: number) {
//     const length = this.getLength();
//     this._x = Math.cos(angle) * length;
//     this._y = Math.sin(angle) * length;
//   },
//   getAngle() {
//     return Math.atan2(this._y, this._x);
//   },
//   setLength(length: number) {
//     const angle = this.getAngle();
//     this._x = Math.cos(angle) * length;
//     this._y = Math.sin(angle) * length;
//   },
//   getLength() {
//     return Math.sqrt(this._x * this._x + this._y * this._y);
//   },
//   add(v2: { getX: () => number; getY: () => number }) {
//     return vector.create(this._x + v2.getX(), this._y + v2.getY());
//   },
//   subtract(v2: { getX: () => number; getY: () => number }) {
//     return vector.create(this._x - v2.getX(), this._y - v2.getY());
//   },
//   multiply(val: number) {
//     return vector.create(this._x * val, this._y * val);
//   },
//   divide(val: number) {
//     return vector.create(this._x / val, this._y / val);
//   },
//   addTo(v2: { getX: () => number; getY: () => number }) {
//     this._x += v2.getX();
//     this._y += v2.getY();
//   },
//   subtractFrom(v2: { getX: () => number; getY: () => number }) {
//     this._x -= v2.getX();
//     this._y -= v2.getY();
//   },
//   multiplyBy(val: number) {
//     this._x *= val;
//     this._y *= val;
//   },
//   divideBy(val: number) {
//     this._x /= val;
//     this._y /= val;
//   },
// };
//# sourceMappingURL=vector-example.js.map