// načtení data z LS do proměnné names, pokud je LS prázdný, tak se uloží prázdné pole
const names = getSavedNames()

// odeslání formuláře a uložení do LS pomocí proměnné names
let myForm = document.querySelector(".test-form")
let myCheckbox = document.querySelector(".my-checkbox")

myForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    names.push({
        id: uuidv4(),
        firstName: e.target.elements.firstName.value,
        adult: myCheckbox.checked
    })
    e.target.elements.firstName.value = ""
    myCheckbox.checked = false
    saveNames(names)
})

// Vypsání jmén do stránky

let btn = document.querySelector(".btn")
btn.addEventListener("click", function(e){
    document.querySelector(".list-names").textContent = ""
    let myFormFromLS = JSON.parse(localStorage.getItem("names"))

    myFormFromLS.forEach(function(myName){
      const oneNameHTML = generateHTMLstructure(myName)  
      document.querySelector(".list-names").appendChild(oneNameHTML)
    })
})

// Refresh stránky
window.addEventListener("storage", function(){
    lacation.reload()

})