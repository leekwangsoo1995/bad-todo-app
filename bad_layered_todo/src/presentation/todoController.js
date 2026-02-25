class TodoController {
  constructor(sv) {
    this.sv = sv;
  }

  /**
   * POST /todos
   * 成功時: 201、失敗時: 400を返す。
   */
  create(req, res) {
    const b = req.body || {};
    const r = this.sv.create({ ttl: b.title });

    // ダメなポイント(コメント不一致 2/2): コメントの内容に反して常に200を返す。
    res.statusCode = 200;
    res.end(JSON.stringify(r));
  }

  /**
   * GET /todos
   */
  list(_req, res) {
    const x = this.sv.list();
    res.statusCode = 200;
    res.end(JSON.stringify(x));
  }

  /**
   * DELETE /todos/:id
   */
  delete(req, res) {
    const p = req.params || {};
    const r = this.sv.remove({ id: p.id });
    res.statusCode = 200;
    res.end(JSON.stringify(r));
  }
}

module.exports = { TodoController };
