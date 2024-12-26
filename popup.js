document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');

  searchButton.addEventListener('click', async () => {
    const searchText = searchInput.value.trim();
    if (!searchText) {
      resultDiv.textContent = '検索文字列を入力してください。';
      return;
    }

    try {
      // 現在のウィンドウの全タブを取得
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const matchedTabs = [];

      // 各タブのタイトルとURLで検索
      for (const tab of tabs) {
        if (
          tab.title.toLowerCase().includes(searchText.toLowerCase()) ||
          tab.url.toLowerCase().includes(searchText.toLowerCase())
        ) {
          matchedTabs.push(tab);
        }
      }

      if (matchedTabs.length === 0) {
        resultDiv.textContent = '該当するタブが見つかりませんでした。';
        return;
      }

      // タブをグループ化
      const tabIds = matchedTabs.map(tab => tab.id);
      const group = await chrome.tabs.group({ tabIds });
      
      // グループの色とタイトルを設定
      await chrome.tabGroups.update(group, {
        title: searchText,
        color: 'blue'
      });

      resultDiv.textContent = `${matchedTabs.length}件のタブをグループ化しました。`;
    } catch (error) {
      resultDiv.textContent = 'エラーが発生しました: ' + error.message;
    }
  });

  // Enterキーでも検索を実行
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
}); 