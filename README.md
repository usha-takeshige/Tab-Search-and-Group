# Chrome拡張機能：タブ検索＆グループ化ツール

## 概要
Google Chromeのブラウザで、複数のタブの中から特定の文字を検索し、その文字がヒットしたタブを一つのタブグループとしてまとめる拡張機能です。

## 主な機能
- 開いているタブから特定の文字列を検索
- ヒットしたタブを自動的にグループ化
- グループ名は検索文字列を使用
- 検索結果が0件の場合は「ヒットしませんでした」とポップアップ表示

## 利用シーン
多数のタブを開いている状態で、特定の情報が含まれているタブを探したい場合に使用します。
例えば：
- 作業中に大量のタブが開いてしまった
- 必要な情報が含まれているタブを見つけたい
- 関連する内容のタブをまとめて整理したい

## 技術仕様
- Chrome Extensions Manifest V3を使用
- 必要な権限：
  - tabs（タブの操作）
  - tabGroups（タブのグループ化）
  - host_permissions（タブ内容へのアクセス）

## 動作の流れ
1. 拡張機能のポップアップを開く
2. 検索したい文字列を入力
3. 検索ボタンをクリック
4. 該当するタブを自動的にグループ化
5. 結果をポップアップで表示 