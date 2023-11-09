const bc = new BroadcastChannel("channel")
const size = "width=1920px,height=1080"
const scoreboard = window.open("./scoreboard.html", "Scoreboard",size,true)
const soundWrong = new Audio("./Audio/wrong-answer.mp3")
const soundCorrect = new Audio("./Audio/correct-answer.wav")

bc.onmessage = (event) => {

    if (event.data == "load!done")
        loadButtons(currentSection)   
}

document.addEventListener("keydown", (event) => {
    let code = event.code
    let value = event.key
    
    // next and prev section
    if (code == "ArrowLeft")
        bc.postMessage("change!-1")
    if (code == "ArrowRight")
        bc.postMessage("change!1")
    

    // change answer visibility
    if (isFinite(value)){
        value = value == 0 ? 10 : value
        bc.postMessage("answer!" + value)
    }
});


function firstLoad(){

    createHtmlELement("button", document.body, "", "startBtn", `reveal()`, `<span class="action">Start</span>`)
}

function loadButtons(section) {
    let answersCount = Object.keys(data[currentSection].a).length
    // create div rows
    createHtmlELement("div",document.body, "", "title", "", data[currentSection].q )
    createHtmlELement("div",document.body, "row", "answersBtns")
    createHtmlELement("div",document.body, "actions", "actions")

    // create answer Buttons
    let counter = 1
    for (let a in data[section].a){
        createHtmlELement("button", answersBtns, "controlBtn", "btn" + counter, "answerReveal(" + counter + ")", `<span class="number">${counter}</span>\n${a}`)
        counter++
    }

    // create action buttons 
    createHtmlELement("button", actions, "", "prev", `changeSection(-1)`, `<span class="action">&larr;</span>`)
    createHtmlELement("button", actions, "", "wrong", `wrong("+")`, `<span class="action">X</span>`)
    createHtmlELement("button", actions, "", "resetWrong", `wrong(0)`, `<span class="action">Reset</span>`)
    createHtmlELement("button", actions, "", "next", `changeSection(1)`, `<span class="action">&rarr;</span>`)

}

function changeSection(change){

    if ( 0 <= (currentSection + change) && (currentSection + change) < sectionsCount ){
        currentSection = currentSection + change
        bc.postMessage("change!" + change)
    

        let current = data[currentSection]
        let answers = current.a
        
        let answersCount = Object.keys(answers).length
        document.getElementById('title').textContent = current.q

        btnCount = document.getElementsByClassName("controlBtn").length
        let answersBtns = document.getElementById("answersBtns")

        let difference = answersCount - btnCount
        console.log(difference);
        if (btnCount < answersCount) {
            for (let i= btnCount; i <= answersCount; i++)
                createHtmlELement("button", answersBtns, "controlBtn", "btn" + i, "answerReveal(" + i + ")", `<span class="number">${i}</span>\n${Object.entries(answers)[i-1][0]}`)

        } else if (btnCount > answersCount) {
            for (let i = btnCount-1; i >= answersCount; i--){
                console.log(i);
                document.getElementById("btn" + i).remove()
        }
        }

        let c = 1
        for (let a in answers){
            let btn = document.getElementById('btn' + c)

            btn.innerHTML = `<span class="number">${c}</span>\n ${a}`     
            c ++
        } 

    }
}

function wrong(action) {
    if (action == 0){
        bc.postMessage("wrong!0")

    }
    if (action == "+"){
        soundWrong.play()
        bc.postMessage("wrong!+")
    }
}


function reveal(){
    bc.postMessage("load")
    document.getElementById("startBtn").remove()
}

function answerReveal(number){
    soundCorrect.play()
    bc.postMessage("answer!" + number)
    
}