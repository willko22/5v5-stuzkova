const bc = new BroadcastChannel("channel")
const size = ""  //"width=1920px,height=1080"
const scoreboard = window.open("../scoreboard.html", "Scoreboard",size,true)


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
    // bc.postMessage("loaded")
    // bc.onmessage = (event) => {}
    createStart()
    // loadButtons(currentSection)
}

function createStart() {
    // loadButtons(0)
    createHtmlELement("button", document.body, "controlBtn", "start", `reveal()`, `<span class="action">Start</span>`)

}

function loadButtons(section) {
    let answersCount = Object.keys(data[currentSection].a).length
    // create div rows
    createHtmlELement("div",document.body, "", "title", "", data[currentSection].q )
    createHtmlELement("div",document.body, "row", "row1")

    if (answersCount > 4){
        createHtmlELement("div",document.body, "row", "row2")
    }

    createHtmlELement("div",document.body, "actions", "actions")

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
    createHtmlELement("button", actions, "controlBtn", "prev", `changeSection(-1)`, `<span class="action">&larr;</span>`)
    createHtmlELement("button", actions, "controlBtn", "next", `changeSection(1)`, `<span class="action">&rarr;</span>`)

}

function reveal(){
    bc.postMessage("load")
    document.getElementById("start").remove()
    // loadButtons(currentSection)  
}

function answerReveal(number){
    bc.postMessage("answer!" + number)
}

function changeSection(change){
    if ( 0 <= (currentSection + change) && (currentSection + change) < sectionsCount ){
        currentSection = currentSection + change
        bc.postMessage("change!" + change)
    

    let current = data[currentSection]
    let answers = current.a
    let answersCount = Object.keys(answers).length
    document.getElementById('title').textContent = current.q

    btnCount = document.getElementsByClassName("controlBtn").length -2

    if (answersCount <= 4){
        document.getElementById("row2").remove()

    } else if (answersCount > 4 )
        document.getElementById("row1").after(createHtmlELement("div","", "row", "row2"))
        
    if (btnCount < answersCount) {
        for (let i= btnCount+1; i <= answersCount; i++)
            createHtmlELement("button", row2, "controlBtn", "btn" + i, "answerReveal(" + i + ")", `<span class="number">${i}</span>\n${Object.entries(answers)[i-1][0]}`)
    }

    let c = 1
    for (let a in answers){
        let btn = document.getElementById('btn' + c)

        btn.innerHTML = `<span class="number">${c}</span>\n ${a}`     
        c ++
    } 

    }
}