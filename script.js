let startContainer = document.getElementById("container-start");
let startButton = document.getElementById("start-button");
let quizContainer = document.getElementById("container-quiz");
let questionEl = document.getElementById("question");
let liEls = document.querySelectorAll("li");
let olEl = document.querySelector("ol");
let statusEl = document.getElementById("status");
let timeEl = document.getElementById("timer");
let score = 0;
let resultContainer = document.getElementById("container-result");
let result = document.getElementById("result");
let submitEL = document.getElementById("submitbt");
let hightScoreContainer = document.getElementById("container-hightscore");
let goBackBt = document.getElementById("goback");
let hscore = document.getElementById("hscore");
let scoreStorage = localStorage.getItem("scorek");
let clearBt = document.getElementById("clearscore");
let inputEl = document.querySelector("input");

let questions = [
                    {q: "What is the clientside programming language?", 
                     o: ["HTML", "CSS", "Javascript", "C++"],
                     a: "Javascript"
                    },
                    {q: "which of the following languages is being used in both frontend and backend?",
                     o: ["Python", "C#", "Sql", "Javascript"],
                     a: "Javascript"
                    },
                    {q: "Arrays in Javascript can be used to store _______.",
                     o: ["numbers and strings", "arrays", "boolean", "all of the above"],
                     a: "all of the above"
                    },
                    {q: "Commonly used data types DO NOT include:",
                     o: ["strings", "booleans", "alerts", "numbers"],
                     a: "alerts"
                    },
                    {q: "The condition in an if / else statement is enclosed within ____.",
                     o: ["quotes", "curly brackets", "parentheses", "square brackets"],
                     a:  "parentheses"
                    }
                ]
    
    var timerInterval;
    function setTime() {
        timeEl.textContent = '';
        var secondsLeft = questions.length*10;
        timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft ;
    
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            hideEl(quizContainer);
            result.textContent = score;
            showEl(resultContainer);
            questionEl.textContent = '';
            for(let q = 0; q < liEls.length; q++){
                liEls[q].textContent = '';
            }
        }
    
        }, 1000);
    }

    
    function statusTimer(){
        let secondeLeft = 2;
        let showAnswer = setInterval(function(){
        secondeLeft--;    

        if (secondeLeft === 0){
            statusEl.textContent = "";
        }
        },250);
    }
    

function hideEl(el){
    el.setAttribute("style", "display: none");
}
function showEl(el){
    el.setAttribute("style", "display:block");
}

function showQuestion(arr, i){
        questionEl.textContent = arr[i].q;
        for(let q = 0; q < liEls.length; q++){
            liEls[q].textContent = arr[i].o[q];
        }
        olEl.addEventListener("click", function(event){
            let clickedEl = event.target;
            if(clickedEl.textContent === arr[i].a){
                score += parseInt(timeEl.textContent);
                statusEl.textContent = "Correct!!";
                statusTimer();
            }
            else{
                score += 0;
                let timeLeft = parseInt(timeEl.textContent);
                timeEl.textContent = timeLeft > 5 ? timeLeft -5 : 0;
                statusEl.textContent = "You are incorrect";
                statusTimer();

            }
            if(i === arr.length-1){
                clearInterval(timerInterval);
                hideEl(quizContainer);
                result.textContent = score;
                showEl(resultContainer);
                
                questionEl.textContent = '';
            for(let q = 0; q < liEls.length; q++){
                liEls[q].textContent = '';
            }

            }

            if(i < arr.length-1){
                i += 1
                showQuestion(arr,i)
            }

        })

    }


startButton.addEventListener("click", function(){
    hideEl(startContainer);
    showEl(quizContainer);
    setTime();
    showQuestion(questions, 0);
    hideEl(hightScoreContainer);
})

submitEL.addEventListener("click",function(event){
    event.preventDefault;
    hideEl(resultContainer);
   
    showEl(hightScoreContainer);
//    result.textContent = scoreStorage;
    hscore.textContent += inputEl.value +" : " + score;
    localStorage.setItem("scorek",result.textContent);

   

})
goBackBt.addEventListener("click", function(){
    hideEl(hightScoreContainer);
    // hideEl(quizContainer)
    showEl(startContainer);
})

clearBt.addEventListener("click", function(){
    localStorage.clear();

    hscore.textContent = '' 
    
})
