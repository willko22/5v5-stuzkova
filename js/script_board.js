const bc = new BroadcastChannel("channel")
let loaded = 0


bc.onmessage = (event) => {
    let msg = event.data
    
    if (msg == "load" && loaded != 1){
        updateSection(0)
        loaded = 1
        bc.postMessage("load!done")
    }

    if (msg.includes("change!")){
        changeSection(Number(msg.split("!")[1]))
    }

    if (msg.includes("answer!")) {
        let number = msg.split("!")[1]
        if (number <= currentAnswersCount) {
            // console.log(currentColor)
            newColor = document.getElementById("a" + number).style.color == "transparent" ? "black" : "transparent"
            document.getElementById("a" + number).style.color = newColor
            document.getElementById("s" + number).style.color = newColor
            // console.log(value)
        }
    }

    
}

function updateSection(pos) {
    let current = data[pos]
    let answers = current.a

    let answersCount = Object.keys(answers).length
    currentAnswersCount = answersCount

    document.getElementById('question').textContent = current.q

    let itemsCount = document.getElementsByClassName("item").length
    if (itemsCount > answersCount) {

        for (let i= answersCount+1; i <= itemsCount; i++)
            document.getElementById("i" + i).remove()
        
       
    } else if (itemsCount < answersCount) {

        for (let i= itemsCount+1; i <= answersCount; i++){
            // create item
            let item = createHtmlELement("div", wrapper, "item", "i" + i)
            // create answer
            createHtmlELement("div", item, "answer", "a" + i)
            // create score
            createHtmlELement("div", item, "score", "s" + i)
        }   
    }
    
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

function changeSection(change){ 
    if ( 0 <= (currentSection + change) && (currentSection + change) < sectionsCount ){
        currentSection += change
        updateSection(currentSection) 
    }
}