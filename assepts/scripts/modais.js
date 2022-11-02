import { requestNovoDepartamento } from "./requisicoes.js"
export function modalCriaDepartamento(lista) {
    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend', `
    <div class="containerModal">
        <div class="modal">
            <div>
                <h2>Criar departamento</h2>
                <button class="fechar">X</button>
            </div>
            <form class='dados'>
                <input type="text" name="name" id="" placeholder="Nome do departamento">
                <input type="text" name="description" id="" placeholder="Descrição">
                <select name='company_uuid'  class="options">
                    <option value="Selecionar empresa">Selecionar empresa</option>
                </select>
                <button class="novodepartamento">Criar departamento</button>
            </form>
        </div>
    </div>`)
    optionModalDinamico(lista)
    function fecharMmodal() {
        const btnClose = document.querySelector('.fechar')
        btnClose.addEventListener('click', (eve) => {
            eve.path[3].remove()
        })
    }fecharMmodal()
    function criaDepartamento(){
    const array=[]
    const btnDados = document.querySelector('.novodepartamento')
    const form = document.querySelector('.dados')
    const trans = [...form.elements]
    btnDados.addEventListener('click', (event) => {
        event.preventDefault()
        trans.forEach((element) => {
            if (element.tagName == 'INPUT' ||element.tagName=='SELECT' && element.value != '') {
               array[element.name]=element.value
            }
        })
        event.path[3].remove()
        requestNovoDepartamento(array)
    })
    }criaDepartamento()
}

function optionModalDinamico(dados){
    dados.forEach((element)=>{
        const select = document.querySelector('.options')
    select.insertAdjacentHTML('beforeend',`
    <option value="${element.uuid}">${element.name}</option>
    `)
    })

}