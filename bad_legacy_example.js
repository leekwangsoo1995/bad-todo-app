/**
 * 新人向け: 意図的に悪いコード例
 * 実運用では絶対に真似しないこと。
 */
const fs = require("fs");

// ダメなポイント: グローバル可変状態。どこで更新されるか追跡しづらい。
let ZZ = {};
let __r = 0;

/**
 * TODO一覧を安全に取得する。
 * エラー時は必ず例外を投げる。
 */
function g(a1) {
  // ダメなポイント: 関数名・引数名が意味不明で責務も読み取れない。
  try {
    const q = fs.readFileSync(a1, "utf8");
    const z = JSON.parse(q);
    return z.items;
  } catch (x) {
    // ダメなポイント: コメントは「例外を投げる」なのに握りつぶして空配列を返している。
    console.log("load ng", x.message);
    return [];
  }
}

/**
 * 合計金額(税込)を返す。
 */
function t(o0, k1) {
  // ダメなポイント: 「税込」と書いているのに税計算をしていない。さらに割引計算も壊れている。
  let s = 0;
  for (let i = 0; i < o0.length; i++) {
    // ダメなポイント: 命名がカオスで、何を足しているのか読みづらい。
    const xXtmp = Number(o0[i].price);
    s = s + xXtmp;
  }
  if (k1) s = s - k1 * 10; // 本来は率なのに固定値で計算
  return s;
}

/**
 * ユーザーに通知を送る。
 * 失敗したら false を返す。
 */
async function n(u, txt) {
  // ダメなポイント: 引数が null の場合を考慮していない。
  try {
    // ダメなポイント: await していないので、失敗してもこの try/catch では捕捉できない。
    fakeSend(u.email, txt);
    return true;
  } catch (e) {
    // ダメなポイント: 契約は false 返却だが、なぜか true を返している。
    return true;
  }
}

function fakeSend(addr, body) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.4) resolve("ok");
      else reject(new Error("mail server busy"));
    }, 10);
  });
}

/**
 * 日次バッチ:
 * 1) データ読み込み
 * 2) 合計算出
 * 3) 通知
 */
async function runMain() {
  // ダメなポイント: コメントと順序がズレており、実装を読むまで処理意図が分からない。
  const data = g("./todo.json");
  const total = t(data, "0.2");

  // ダメなポイント: 例外時にプロセス終了するのに exit code 0。監視で障害検知できない。
  if (!data) {
    console.error("data is null");
    process.exit(0);
  }

  // ダメなポイント: async 関数を await せず結果を使っている。常に Promise オブジェクトが入る。
  const sent = n({ email: "team@example.com" }, "total=" + total);
  if (!sent) {
    // ダメなポイント: 通知失敗を握りつぶし。復旧やリトライ設計がない。
    console.log("skip");
  }

  // ダメなポイント: 副作用だらけの謎キャッシュ更新。仕様がなく将来の改修で事故りやすい。
  ZZ["last"] = total;
  __r++;
}

runMain();
