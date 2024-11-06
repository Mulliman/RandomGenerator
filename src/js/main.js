function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getLines(input){
    var lines = input.split('\n');
    var array = [];
    for(var i = 0;i < lines.length;i++){
        array.push(lines[i]);
    }
    
    return array;
}

function getRandomQuote(quotes){
    return quotes[Math.floor(Math.random() * quotes.length)];
}

var newQuoteButton = document.getElementById("NewQuoteButton");
var quoteHeading = document.getElementById("Quote");

var fileUrl = getParameterByName("url");
var quotes = [];

if(fileUrl){
    //fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(fileUrl)}`)
    fetch(fileUrl)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.')
        })
        .then(function (json) {
                    quotes = getLines(json.contents);
                    quoteHeading.innerText = getRandomQuote(quotes);
                })
        .catch((error) => {
            alert("Error getting file.")
        });
    
    newQuoteButton.addEventListener("click", function(){
        quoteHeading.innerText = getRandomQuote(quotes);
    });
} else {
    quoteHeading.innerText = "Add the URL of a text document to get started. Each item should be on a new line.";
    newQuoteButton.style = "display:none;"
}

var goToButton = document.getElementById("GoToButton");
var textFileBox = document.getElementById("TextFileBox");

if(fileUrl){
    textFileBox.value = fileUrl;
}

goToButton.addEventListener("click", function(){
    var url = "/?url=" + encodeURIComponent(textFileBox.value);
    window.location.href = url;
});
