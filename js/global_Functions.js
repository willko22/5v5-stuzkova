function createHtmlELement(element, parrent, classes, ids, onClick, txt) {

    let newElement = document.createElement(element)
        newElement.setAttribute("class", classes)
        newElement.setAttribute("id", ids)
        newElement.setAttribute("onClick", onClick)

    if (txt)
        newElement.innerHTML = txt

    
    if (parrent)
        return parrent.appendChild(newElement)
    else
     return newElement
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