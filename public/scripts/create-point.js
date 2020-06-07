

//função para trazer os estados da API do IBGE
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then( states => {

        for( state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populateUFs()

//função para trazer as cidades da API do IBGE
function getCities() {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</options>"
    citySelect.disabled = true
    
    fetch(url)
    .then( (res) => { return res.json() })
    .then( cities => {
        for( city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
        
    } )
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities )

//Itens de Coleta
//pegar todos os li's
const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com Javascript
        //toggle adiciona ou remove, a depender do status atual do item
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)
    
    
    //verificar se existem itens selecionados
    //se SIM, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    //se já estiver selecionado,

    if( alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    
    } else {
        //se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems

}


