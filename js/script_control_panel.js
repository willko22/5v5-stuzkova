const bc = new BroadcastChannel("channel")
// const scoreboard = window.open("../scoreboard.html")
let currentAnswersCount
let currentSection = 0

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
            createHtmlELement("button", row2, "controlBtn", "btn" + counter, "test(" + counter + ")", counter + ". " + a)
        } else {
            createHtmlELement("button", row1, "controlBtn", "btn" + counter, "test(" + counter + ")", counter + ". " + a)
        }

        counter++
    }

    // create action buttons 
    createHtmlELement("button", actions, "controlBtn", "prev", "", "<--")
    createHtmlELement("button", actions, "controlBtn", "start", "", "start")
    createHtmlELement("button", actions, "controlBtn", "next", "", "-->")

}

function test(number){
    console.log(number)
}