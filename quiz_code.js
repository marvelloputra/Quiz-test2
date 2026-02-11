let container_h3 = document.querySelector('.container_h3')
let container_start = document.querySelector('.start')
let container_main = document.querySelector('.main_quiz')
let start_button = document.querySelector('.start-btn')
container_main.style.display = 'none'
let answer_button = document.querySelectorAll('.answer')
let question_field = document.querySelector('.question')

function randint(min,max){
    return Math.floor(Math.random()*(max-min+1))+min 
}

let sign_array = ['+','-','*','/']
function getSign(){
    return(sign_array[randint(0,3)])
}
function shuffle(array){
    let currentIndex = array.length, randomIndex;
    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

class Question{
    constructor(){
        let a = randint(1,30)
        let b = randint(1,30)
        let sign = getSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+'){this.correct = a+b}
        else if (sign == '-'){this.correct = a-b}
        else if (sign == '*'){this.correct = a*b}
        else if (sign == '/'){this.correct = Math.floor(a/b)}
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15),
        ]
        shuffle(this.answers)
    }
    display () {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_button[i].innerHTML = this.answers[i]
        }
    }
}
let correct_answers_given = 0
let total_answers_given = 0
start_button.addEventListener('click',function(){
    correct_answers_given = 0
    total_answers_given =0

    container_start.style.display='none'
    container_main.style.display='flex'

    current_question = new Question()
    current_question.display()

    setTimeout(function() {
        container_main.style.display = 'none'
        container_start.style.display = 'flex'
        container_h3.innerHTML = 
        `You gave ${correct_answers_given} correct answers out of ${total_answers_given}. 
        Accuracy is ${Math.round(correct_answers_given * 100 / total_answers_given)}%.`
     }, 10000)
})
// current_question = new Question()
// current_question.display()
// setTimeout(function() {
// container_h3.innerHTML = 
// `You gave ${correct_answers_given} correct answers out of ${total_answers_given}. 
// Accuracy is ${Math.round(correct_answers_given * 100 / total_answers_given)}%.`
//     }, 10000)



for(let i = 0; i < answer_button.length; i += 1) {
    answer_button[i].addEventListener('click',function(){
        if (Number(answer_button[i].innerHTML) == current_question.correct){
            correct_answers_given += 1
            answer_button[i].style.background = '#00FF00'
            anime({
                targets:answer_button[i],
                background:"#FFFFFF",
                duration:500,
                delay:100,
                easing:'linear'
            })
        }else{
            answer_button[i].style.background = '#FF0000'
            anime({
                targets:answer_button[i],
                background:'#FFFFFF',
                duration:500,
                delay:100,
                easing:'linear'
            })
        }
        total_answers_given += 1

        current_question = new Question()
        current_question.display()
    })
    
    
}