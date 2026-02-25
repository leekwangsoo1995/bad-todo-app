# bad_layered_todo (暫定ドキュメント)

このドキュメントは初版です。  

## 1. 概要

`bad_layered_todo` は、レイヤードアーキテクチャ風に分割した Todo サンプルです。  
主な目的は、レイヤー分割と処理の流れを確認することです。

## 2. レイヤー構成

- `src/presentation/todoController.js`
  - 入出力を担当
- `src/infrastructure/todoRepository.js`
  - 永続化を担当
- `src/main.js`
  - 配線と起動を担当

## 3. 実行方法

プロジェクトルートで以下を実行します。

```bash
node bad_layered_todo/src/main.js insert "買い物する"
node bad_layered_todo/src/main.js select
node bad_layered_todo/src/main.js delete 123
```

補足:
- `insert` は1件追加
- `select` は一覧取得
- `delete` はid指定で1件削除
- 引数なし実行は `demo` モード

## 4. 処理フロー(概要)

1. `main.js` が各レイヤーを初期化
2. 実行結果をコンソール表示
