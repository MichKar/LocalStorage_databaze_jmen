let nameID = location.hash.substring(1)
let names = getSavedNames()

let searchedName = names.find(function (oneObject) {
    return oneObject.id === nameID
})

document.querySelector("#editedName").value = searchedName.firstName

let changingForm = document.querySelector("#changing-form")

changingForm.addEventListener("submit", function (e) {
    e.preventDefault()

    searchedName.firstName = e.target.elements.changingName.value
    saveNames(names)
})

// změny na dalších záložkách
window.addEventListener("storage", function (e) {
    console.log(e)

    if (e.key === "names") {
        names = JSON.parse(e.newValue)
    }

    let searchedName = names.find(function (oneObject) {
        return oneObject.id === nameID
    })

    document.querySelector("#editedName").value = searchedName.firstName
})