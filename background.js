"user strict";

//initialize user storage
chrome.runtime.onInstall.addListener(function(){
    chrome.storage.sync.set({Words_list: []});
});