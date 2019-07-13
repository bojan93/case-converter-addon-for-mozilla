var glbVar = 1;
// inserts string at index
String.prototype.insertAt = function (index, string) {
    return this.substring(0, index) + string + this.substring(index);
}

// replaces char at index
String.prototype.replaceCharAt = function (index, char) {
    return this.substring(0, index) + char + this.substring(++index);
}

const asciiOffsetForLetters = 32;

// converts camel case string to kebab case string
function convertFromCamelToKebab(camelCaseText) {
    // get indices of capital letters
    let arrayOfIndices = getIndicesOfCapitalLetters(camelCaseText);
    // convert capital to small letters
    camelCaseText = convertCapitalToSmallLetters(camelCaseText, arrayOfIndices);
    // put dashes on places of indices and return value
    return putDashesInPlaceOfIndices(camelCaseText, arrayOfIndices);
    
}

// in ascii table, capital letters greater than 64 and less than 91
function getIndicesOfCapitalLetters(camelCaseText) {
    let arr = [];
    for (let i = 0; i < camelCaseText.length; i++) {
        let codeAtIth = camelCaseText.charCodeAt(i);
        if (codeAtIth > 64 && codeAtIth < 91) {
            arr.push(i);
        }
    }
    return arr;
}

// puts dashes in string on indices provided by arr
function putDashesInPlaceOfIndices(string, arr) {
    let offset = 0;
    for (let i = 0; i < string.length; i++) {
        if (arr.includes(i)) {
            string = string.insertAt(i + offset, "-");
            offset++;
        }
    }
    return string;
}

// turns char to lower case by following http://www.asciitable.com/
function turnToLowerCase(char) {
    // TODO: Add the possibility for method to turn to either upper or lower
    // based on its case (lower or upper)
    if (char.length > 1) {
        throw new Error("Length of char can't be greater than one!")
    }
    return String.fromCharCode(asciiOffsetForLetters + char.charCodeAt(0));
}

// converts capital to small letters at indices provided in arr
function convertCapitalToSmallLetters(string, arr) {
    for (let i = 0; i < arr.length; i++) {
        let stringIndex = arr[i];
        string = string.replaceCharAt(stringIndex, turnToLowerCase(string.charAt(stringIndex)));
    }
    return string;
}

function listenForClicks(){
    document.addEventListener("click", (e) => {
        if(e.target.id === "convertButton"){    
            let inputText = document.querySelector("#input").value;
            
            document.querySelector("#output").value = convertFromCamelToKebab(inputText);
           /*
            browser.tabs.query({active:true,currentWindow:true}).then(sendMessage).catch((e) => {
                console.log("error while calling sendMessage");
            });
           */
        }
        if(e.target.id === "copyButton"){
            document.querySelector("#output").select();
            document.execCommand("copy");
            document.getSelection().removeAllRanges();
        }
    });
}

browser.tabs.executeScript({file: "/content_scripts/content_script.js"}).then(listenForClicks).catch((e) => {
    console.log("error while calling listenForClicks");
});
function sendMessage(tabs){
    console.log("sending message");
    browser.tabs.sendMessage(tabs[0].id, {content: 'hello bastardo'});
}
function convert(){
    browser.tabs.query({ active: true, currentWindow: true }).then(sendMessage);
}
