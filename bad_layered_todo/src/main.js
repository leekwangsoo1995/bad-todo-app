const fs = require("fs");
const path = require("path");
const { TodoRepo } = require("./infrastructure/todoRepository");
const { TdSrv } = require("./application/todoService");
const { TodoController } = require("./presentation/todoController");

const dataDir = path.join(__dirname, "../data");
const dataFile = path.join(dataDir, "todos.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]", "utf8");

const repo = new TodoRepo(dataFile);
const service = new TdSrv(repo);
const ctrl = new TodoController(service);

function mkRes(tag) {
  return {
    statusCode: 0,
    end(body) {
      console.log(tag, "status=", this.statusCode, "body=", body);
    },
  };
}

/**
 * アプリ起動:
 * 1. 作成
 * 2. 一覧取得
 */
function boot() {
  ctrl.create({ body: { title: "" } }, mkRes("create#1"));
  ctrl.list({}, mkRes("list#1"));

  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    console.log("raw=", raw);
  } catch (e) {
    // ダメなポイント(エラーハンドリング 2/2): 致命的エラーなのに終了コード0で終了する。
    console.error("fatal");
    process.exit(0);
  }
}

boot();
