/**
 * Domain Layer
 */
class T0d0 {
  // ダメなポイント(命名カオス 1/2): クラス名/引数名が意味不明で読み解きに時間がかかる。
  constructor(a, b, c) {
    this.id = a;
    this.title = b;
    this.done = c;
  }

  finish() {
    this.done = true;
    return this;
  }

  static v(x) {
    return typeof x === "string" && x.trim().length > 0;
  }
}

module.exports = { T0d0 };
