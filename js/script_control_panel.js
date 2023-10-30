const bc = new BroadcastChannel("channel")
const scoreboard = window.open("../scoreboard.html")
let currentAnswersCount


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
    // bc.postMessage("loaded")
    // bc.onmessage = (event) => {}

    loadButtons(currentSection)
}

function loadButtons(section) {
    let answersCount = Object.keys(data[section].a).length

    // create div rows
    createHtmlELement("div",document.body, "row", "row1")

    if (answersCount > 4){
        createHtmlELement("div",document.body, "row", "row2")
    }

    createHtmlELement("div",document.body, "row", "actions")

    // create answer Buttons
    let counter = 1
    for (let a in data[section].a){
        if (counter > 4){
            createHtmlELement("button", row2, "controlBtn", "btn" + counter, "answerReveal(" + counter + ")", `<span class="number">${counter}</span>\n${a}`)
        } else {
            createHtmlELement("button", row1, "controlBtn", "btn" + counter, "answerReveal(" + counter + ")", `<span class="number">${counter}</span>\n${a}`)
        }

        counter++
    }

    // create action buttons 
    createHtmlELement("button", actions, "controlBtn", "prev", `changeSection(-1)`, "<--")
    createHtmlELement("button", actions, "controlBtn", "start", "", "start")
    createHtmlELement("button", actions, "controlBtn", "next", `changeSection(1)`, "-->")

}



function answerReveal(number){
    bc.postMessage("answer!" + number)
}

function changeSection(change){
    if ( 0 <= (currentSection + change) && (currentSection + change) < sectionsCount ){
        currentSection = currentSection + change
        bc.postMessage("change!" + change)
    }

}