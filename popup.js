'use restrict';

//Avoid sync error when call the get() function of Chrome's storage API
chrome.storage.sync.get(['Words_list'], function(result){
    if (result.Words_list === undefined){
        chrome.storage.sync.set({Words_list: []});
    }
});


let content_form = document.getElementById("user input");
let content_list = document.getElementById("Banned Words");

//fetch data from chrome storage
chrome.storage.sync.get(['Words_list'], function(result){
    try {
        for (const word of result.Words_list) {
            let div = document.createElement("div");
            let text = document.createTextNode(word);
            let span = document.createElement("span");
            let span_text = document.createTextNode("x");
            span.setAttribute("class", "close");
            
            // adding onclick event to the cross
            span.addEventListener("click", function(){
                //function for removing element from both the chrome storage and the list
                function removebyid(elementId){
    
                    let element = document.getElementById(elementId);
                    element.parentNode.removeChild(element);
                    chrome.storage.sync.get(['Words_list'], function(data){
                        let index = data.Words_list.indexOf(elementId);
                        data.Words_list.splice(index, 1);
                        chrome.storage.sync.set({Words_list: data.Words_list});
                    });
    
                }
                removebyid(word);
            });
    
            div.setAttribute("class", "list");
            div.setAttribute("id", word);
            span.appendChild(span_text);
            div.appendChild(text);
            div.appendChild(span);
            content_list.appendChild(div);
        }
    } catch (error) {}
});


//submit user input data to chrome storage API
content_form.onsubmit = function(){    
    //sychronize the data in the storage
    let bannedword = document.getElementById("BannedWords").value;

    if(bannedword !== ""){

        chrome.storage.sync.get(['Words_list'], function(result){
            //Maximum available number of slots for words to be blocked is 10
            if(result.Words_list.length < 10){
                result.Words_list.push(bannedword);
            }

            //remove extra content
            for(let i = 0; i < result.Words_list.length - 1; i++){
                for(let j = i + 1; j < result.Words_list.length; j++){
                    if(result.Words_list[j] === result.Words_list[i]){
                        result.Words_list.splice(j, 1);
                    }
                }
            }

            chrome.storage.sync.set({Words_list: result.Words_list});
        });
    }
};

