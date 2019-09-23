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

let questions = [
                    {q:"What is the clientside programming language?", 
                     o:["HTML", "CSS", "Javascript", "C++"],
                     a:"Javascript"
                    },
                    {q:"which of the following languages is being used in both frontend and backend?",
                     o:["Python", "C#", "Sql", "Javascript"],
                     a:"Javascript"
                    },
                    {q: "Arrays in Javascript can be used to store _______.",
                     o: ["numbers and strings", "arrays", "boolean", "all of the above"],
                     a: "all of the above"

                    }
                ]
    

    function setTime() {
        var secondsLeft = questions.length*5;
        var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft ;
    
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            hideEl(quizContainer);
            result.textContent = score;
            showEl(resultContainer);
        }
    
        }, 1000);
    }

    
    function statusTimer(){
        let secondeLeft = 2;
        let showanswer = setInterval(function(){
        secondeLeft--;    
        if (secondeLeft===0){
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
                let timeLeft = parseInt(timeEl.textContent);
                timeEl.textContent = timeLeft > 5 ? timeLeft -5 : 0;
                statusEl.textContent = "You are incorrect";
                statusTimer();

            }
            if(i === arr.length-1){
                hideEl(quizContainer);
                result.textContent = score;
                showEl(resultContainer);
            }
            if(i < arr.length-1){
                showQuestion(arr,i+1)
            }
        })

    }


startButton.addEventListener("click", function(){
    hideEl(startContainer);
    showEl(quizContainer);
    setTime();
    showQuestion(questions, 0);
})

// showQuestion.length.addEventListener("click",function(){
//     showEl(result);
//     result.textContent = score;


// })