// Funcke načítající  data z LS - ošetření, pokud data v LS nejsou
const getSavedNames = function () {
    const myNames = localStorage.getItem("names")

    if (myNames !== null) {
        return JSON.parse(myNames)
    } else {
        return []
    }
}

// Funcke pro použití při odeslání formuláře, ukládá do LS jméno z formuláře
const saveNames = function (oneName) {
    localStorage.setItem("names", JSON.stringify(oneName))
}

// Generování HTML struktury (tlačítko + jméno), kterou umístíme do stránky po kliknutí na tlačítko Vypiš.
const generateHTMLstructure = function (oneName) {
    const newDiv = document.createElement("div")
    const newLink = document.createElement("a")
    const button = document.createElement("button")

    button.textContent = "Vymazat jméno"
    newDiv.appendChild(button)

    button.addEventListener("click", function (e) {
        removeName(names, oneName.id)
        saveNames(names)
        toListAgain()
    })

    newLink.textContent = ` ${oneName.firstName}`
    if (oneName.adult === true) {
        newLink.classList.add("adult")
    } else {
        newLink.classList.add("no-adult")
    }

    newLink.setAttribute("href", `/edit.html#${oneName.id}`)

    newDiv.appendChild(newLink)
    return newDiv
}

// Podle ID najdeme index dného jména a pomocí splice ho odstaníme
let removeName = function (ourNames, id) {
    const index = ourNames.findIndex(function (nameWantToCheck) {
        return nameWantToCheck.id === id
    })

    if (index > -1) {
        ourNames.splice(index, 1)
    }
}

// Pokud smažeme nějaké jméno z LS, tak tato fce zabezpečí opětovné vypsání LS bez smazaných jmen

const toListAgain = function () {
    document.querySelector(".list-names").innerHTML = ""

    let newData = getSavedNames()

    newData.forEach(function (onlyOneName) {
        const newContent = generateHTMLstructure(onlyOneName)

        document.querySelector(".list-names").appendChild(newContent)
    })
}