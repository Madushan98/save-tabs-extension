document.getElementById('saveTabs').addEventListener('click', () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const tabsInfo = tabs.map(tab => ({ url: tab.url, title: tab.title }));
      chrome.storage.local.get({ savedStates: [] }, (result) => {
        const savedStates = result.savedStates;
        savedStates.push(tabsInfo);
        chrome.storage.local.set({ savedStates }, () => {
          displaySavedStates();
        });
      });
    });
  });
  
  function displaySavedStates() {
    chrome.storage.local.get({ savedStates: [] }, (result) => {
      const statesList = document.getElementById('statesList');
      statesList.innerHTML = '';
      result.savedStates.forEach((state, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";
        a.textContent = `State ${index + 1}`;
        a.addEventListener('click', () => {
          state.forEach(tab => {
            chrome.tabs.create({ url: tab.url });
          });
        });
        li.appendChild(a);
        statesList.appendChild(li);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', displaySavedStates);