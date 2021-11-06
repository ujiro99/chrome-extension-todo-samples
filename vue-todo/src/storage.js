export const Storage = {
  /**
   * Get a item from chrome local storage.
   *
   * @param {string} key of item in storage.
   */
  get: (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, function (result) {
        if (chrome.runtime.lastError != null) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[key]);
        }
      });
    });
  },

  /**
   * Set a item to chrome local storage.
   *
   * @param {string} key key of item.
   * @param {any} value item.
   */
  set: (key, value) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, function () {
        if (chrome.runtime.lastError != null) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  },

  /**
   * Remove a item in chrome local storage.
   *
   * @param {string} key key of item.
   */
  remove: (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, function () {
        if (chrome.runtime.lastError != null) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  },

  /**
   * Clear all items in chrome local storage.
   */
  clear: () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(function () {
        if (chrome.runtime.lastError != null) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  },
};
