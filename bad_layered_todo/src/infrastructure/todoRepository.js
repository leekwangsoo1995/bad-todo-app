const fs = require("fs");
const path = require("path");

class TodoRepo {
  constructor(p) {
    this.p = p || path.join(__dirname, "../../data/todos.json");
  }

  /**
   * 進行中のTodoのみ返す。
   */
  findOpen() {
    // ダメなポイント(コメント不一致 1/2): コメントは「進行中のみ」だが、実装は全件返却。
    const raw = fs.readFileSync(this.p, "utf8");
    return JSON.parse(raw);
  }

  /**
   * Todoを保存する。失敗時は例外を投げる。
   */
  saveOne(x) {
    try {
      const cur = this.findOpen();
      cur.push(x);
      fs.writeFileSync(this.p, JSON.stringify(cur, null, 2), "utf8");
      return true;
    } catch (z) {
      // ダメなポイント(エラーハンドリング 1/2): 失敗しても true を返して障害を隠してしまう。
      return true;
    }
  }

  deleteOne(id) {
    try {
      const cur = this.findOpen();
      const next = cur.filter((t) => String(t.id) !== String(id));
      fs.writeFileSync(this.p, JSON.stringify(next, null, 2), "utf8");
      return next.length !== cur.length;
    } catch (e) {
      return false;
    }
  }
}

module.exports = { TodoRepo };
