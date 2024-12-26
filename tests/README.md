# タブ検索拡張機能テスト仕様書

このディレクトリには、Chrome拡張機能のタブ検索機能をテストするためのテストファイルが含まれています。

## テストファイル一覧

1. **test1.html**
   - 基本的な日本語テストページ
   - シンプルなHTML構造
   - 主な検索キーワード：「テスト」「テストページ1」「拡張機能」

2. **test2.html**
   - 複数キーワードを含む日本語テストページ
   - 主な検索キーワード：「テスト」「サンプル」「テストページ2」
   - 検索用の別キーワードのテスト

3. **test3.html**
   - 英語および日英混在テストページ
   - 複雑なHTML構造（div, ul, li）
   - 主な検索キーワード：「test」「Test」「testing」「unit test」
   - 日英混在テキストの確認

## テストケース一覧

### 1. 日本語検索テスト

| 検索キーワード | 期待されるヒット数 | ヒットするファイル | 備考 |
|--------------|-----------------|----------------|------|
| テスト | 3件 | test1.html, test2.html, test3.html | 基本的な日本語キーワード|
| サンプル | 1件 | test2.html | 単一ファイルのみヒット |
| 拡張機能 | 1件 | test1.html | 特定の文脈での検索 |
| テストページ | 2件 | test1.html, test2.html | 複合キーワード |

### 2. 英語検索テスト

| 検索キーワード | 期待されるヒット数 | ヒットするファイル | 備考 |
|--------------|-----------------|----------------|------|
| test | 1件 | test3.html | 基本的な英語キーワード |
| Test | 1件 | test3.html | 大文字小文字の区別 |
| testing | 1件 | test3.html | 派生語の検索 |
| unit test | 1件 | test3.html | 複合語の検索 |

### 3. 構造化テスト

| テスト項目 | テストファイル | 確認内容 |
|-----------|--------------|---------|
| シンプル構造 | test1.html | 基本的なHTML要素の表示 |
| リスト構造 | test3.html | ul/liタグの正しい表示 |
| 階層構造 | test3.html | divによる区分けの表示 |
| 日英混在 | test3.html | 日本語・英語の混在テキスト |

### 4. エラーケーステスト

| 検索キーワード | 期待される結果 | 確認項目 |
|--------------|--------------|---------|
| （空文字列） | エラーメッセージ：「検索文字列を入力してください」 | 入力値の検証 |
| xyz | エラーメッセージ：「ヒットしませんでした」 | 該当なしの処理 |
| !@#$% | エラーメッセージ：「ヒットしませんでした」 | 特殊文字の処理 |

## テスト手順

1. **テスト環境の準備**
   - Chrome拡張機能をデベロッパーモードで読み込む
   - 3つのテストファイルを別々のタブで開く
   - 既存のタブグループがある場合は解除しておく

2. **テストの実行**
   - 上記のテストケース一覧の各ケースを順番に実行
   - 各テストケースで以下を確認：
     - 正しいタブがグループ化されているか
     - グループ名が検索キーワードになっているか
     - 正しいメッセージが表示されているか
     - 期待されるヒット数と実際のヒット数が一致するか

3. **追加確認項目**
   - メッセージが3秒後に自動的に消えること
   - グループが展開された状態で作成されること
   - 大文字小文字を区別せずに検索できること
   - 日英混在テキストの正しい処理

## 注意事項

1. **言語の違いについて**
   - 日本語の「テスト」と英語の「test」は別の文字列として扱われます
   - 全角・半角は区別されます
   - 日英混在テキストは両方の言語で検索可能です

2. **HTMLタグ内の検索について**
   - タイトル、本文、HTMLタグの属性値など、すべての文字列が検索対象となります
   - クラス名やID名に含まれる文字列もヒットします
   - 階層構造を持つHTML要素も正しく検索対象となります

3. **テスト実行時の注意**
   - chrome:// や edge:// などの特殊なページでは検索が機能しません
   - テスト後は作成されたタブグループを解除することを推奨します
   - 複数回のテストを行う場合は、毎回タブグループを解除してから実行してください 