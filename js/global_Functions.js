const sectionsCount = data.length

function createHtmlELement(element, parrent, classes, ids, onClick, txt) {
    classes = classes.split("|")
    ids = ids.split("|")

    let newElement = document.createElement(element)

    for (let cls in classes) {
        newElement.setAttribute("class", classes[cls])
    }
    for (let id in ids) {
        console.log
        newElement.setAttribute("id", ids[id])
    }

    newElement.setAttribute("onClick", onClick)

    if (txt)
    newElement.innerHTML = txt

    return parrent.appendChild(newElement)
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