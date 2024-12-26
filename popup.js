document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');

  searchButton.addEventListener('click', async () => {
    const searchText = searchInput.value.trim();
    if (!searchText) {
      showResult('検索文字列を入力してください', 'error');
      return;
    }

    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const matchedTabs = [];

      // 各タブのコンテンツを検索
      for (const tab of tabs) {
        try {
          const [result] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (searchText) => {
              const bodyText = document.body.innerText.toLowerCase();
              return bodyText.includes(searchText.toLowerCase());
            },
            args: [searchText]
          });

          if (result.result) {
            matchedTabs.push(tab);
          }
        } catch (err) {
          console.warn(`Tab ${tab.id} could not be searched:`, err);
          // chrome:// や edge:// などの特殊なページはスキップ
          continue;
        }
      }

      if (matchedTabs.length === 0) {
        showResult('ヒットしませんでした', 'error');
        return;
      }

      // タブのグループ化
      const tabIds = matchedTabs.map(tab => tab.id);
      const group = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(group, {
        title: searchText,
        collapsed: false
      });

      showResult(`${matchedTabs.length}件のタブをグループ化しました`, 'success');
    } catch (error) {
      console.error('Error:', error);
      showResult('エラーが発生しました', 'error');
    }
  });

  function showResult(message, type) {
    resultDiv.textContent = message;
    resultDiv.className = `result-message ${type}`;
    setTimeout(() => {
      resultDiv.textContent = '';
      resultDiv.className = 'result-message';
    }, 3000);
  }
}); 