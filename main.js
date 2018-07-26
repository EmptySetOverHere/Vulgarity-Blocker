//count number of star required for replacement
function count(word){
    let star = ""
    for(let i = 0; i < word.length; i++){
        star += "*";
    }
    return star
}

//Word-to-word replacement
function auto_removal(){
    let textboxes = document.getElementsByClassName("selectable-text invisible-space copyable-text");
    
    chrome.storage.sync.get(['Words_list'], function(result){
        for(let textbox of textboxes){
            for(let bannedword of result.Words_list){
                let newstr = textbox.textContent.replace(bannedword, "fuck");
                textbox.innerHTML = newstr;
            }
        }
    });
}

setInterval(auto_removal, 1);
