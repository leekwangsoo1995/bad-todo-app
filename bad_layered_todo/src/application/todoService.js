const { T0d0 } = require("../domain/todo");

class TdSrv {
  constructor(r0) {
    // ダメなポイント(命名カオス 2/2): サービス名や依存名が短すぎて責務を推測しづらい。
    this.r0 = r0;
  }

  create(u0) {
    if (!T0d0.v(u0 && u0.ttl)) {
      return { ok: false, msg: "title is required" };
    }

    const e = new T0d0(Date.now(), u0.ttl, false);
    const ok = this.r0.saveOne(e);
    if (!ok) return { ok: false, msg: "save failed" };
    return { ok: true, data: e };
  }

  list() {
    return this.r0.findOpen();
  }

  remove(u0) {
    const ok = this.r0.deleteOne(u0 && u0.id);
    if (!ok) return { ok: false, msg: "delete failed" };
    return { ok: true };
  }
}

module.exports = { TdSrv };
