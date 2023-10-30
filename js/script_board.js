const bc = new BroadcastChannel("channel")
let currentSection = 0

document.addEventListener("keydown", (event) => {
    let code = event.code
    let value = event.key

    // next and prev section
    if (code == "ArrowLeft"){
        prev()
    } else if (code == "ArrowRight"){
        next()
    }

    // change answer visibility

    if (isFinite(value)){
        value = value == 0 ? 10 : value
        if (value <= currentAnswersCount) {
            // console.log(currentColor)
            newColor = document.getElementById("a" + value).style.color == "transparent" ? "black" : "transparent"
            document.getElementById("a" + value).style.color = newColor
            document.getElementById("s" + value).style.color = newColor
            // console.log(value)
        }
    }
});


function firstLoad(){
    let section = data[0]
    let answersCount = Object.keys(section.a).length
    // console.log(answersCount)
    for (let i = 1; i <= answersCount; i++) {
        createItem(i)
    }

    updateSection(0)
    
}
function createItem(number) {
    // create item
    let item = createHtmlELement("div", wrapper, "item", "i" + number)

    // create answer
    createHtmlELement("div", item, "answer", "a" + number)

    // create score
    createHtmlELement("div", item, "score", "s" + number)
}


function updateItemCount(count){
    let itemsCount = document.getElementsByClassName("item").length
    if (itemsCount > count) {
        document.getElementById("i" + (itemsCount)).remove()
    } else if (itemsCount < count) {
        createItem(count)
    }

    
}

function updateSection(pos) {
    let current = data[pos]
    let answers = current.a

    let answersCount = Object.keys(answers).length
    currentAnswersCount = answersCount

    document.getElementById('question').textContent = current.q

    updateItemCount(answersCount)

    let c = 1
    for (let i in answers){
        let a = document.getElementById('a' + c)
        let s = document.getElementById('s' + c)

        a.textContent = i
        a.style.color = "transparent"

        s.textContent = answers[i]
        s.style.color = "transparent"
        
        c ++
    } 
}

function next(){
    if (currentSection < sectionsCount-1){       
        currentSection++
        updateSection(currentSection)
    }
}
function prev() {
    if (currentSection > 0){
        currentSection--
        updateSection(currentSection)
    }
}