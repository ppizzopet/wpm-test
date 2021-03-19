
const words = ["trolley", "counter", "hospitality","negotiation", "routine","uniform","deputy","sheep","rescue","shatter","cutting","hot","minor","noble","attract","cultivate","separate","poor",
"swarm","genuine","clash","no","fascinate","favourite","unfair","young","freighter","process","healthy","date","solid","hit","Venus","apology","gear","help","prefer","farewell","cassette","vague","curriculum","apparatus",
"summer","burst","mail","resource","consumer","harbor","visit","machiney"];
const input = document.getElementById("inp");
const time = document.getElementById("time");
const placeholder = document.getElementById("placeholder");

var seconds = 0;
var word = "";
var wpm = 0;
var startedInterval = false;
var interval;
var listOfWords = [];

function generateToList(){
    for(let i = 0; i < 15; i++){
        listOfWords.push(words[Math.floor(Math.random() * words.length)]+" ");
    }
}

function addToList(){
    listOfWords.push(words[Math.floor(Math.random() * words.length)]+" ");
}

// From https://stackoverflow.com/questions/4075057/javascript-unfocus-a-textbox/4075072
function blurAll(){
    var tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
   }

function reset(){
    startedInterval = false;
    seconds = 0;
    listOfWords = [];
    generateToList();
    clearInterval(interval);
    time.innerHTML = "Your wpm was "+ wpm + ".";
    blurAll();
    input.value = "";
    input.style.color = "#576574";
    word = listOfWords[0];
    placeholder.innerHTML = word + listOfWords[1];
}

function checkIfEnteredWordIsCorrent(e){
    if(!startedInterval){
        startedInterval = true;
        interval = setInterval(() => {
            seconds += 1;
            time.innerHTML = 60-seconds+"s";
            if(seconds == 60){
                reset();
            }
        }, 1000);

    }
    if (e.key == word[0]){
        if(word == " " || word == ""){
            listOfWords.shift();
            word = listOfWords[0];
            wpm++;
            addToList();
            placeholder.innerHTML = word + listOfWords[1];
        }else{
            word = word.removeCharAt(1)
            if(word == " "){
                placeholder.innerHTML = "&nbsp;"+ listOfWords[1];
            }else{
                placeholder.innerHTML = word + listOfWords[1];
            }

        }
        input.value = "";
        input.style.color = "#576574";;
    }
    else{
        input.value = "";
        input.style.color = "red";
    }
}

String.prototype.removeCharAt = function (i) {
    var tmp = this.split('');
    tmp.splice(i - 1 , 1);
    return tmp.join(''); 
}

generateToList();

word = listOfWords[0];
placeholder.innerHTML = word + listOfWords[1];
input.addEventListener("keydown", checkIfEnteredWordIsCorrent);