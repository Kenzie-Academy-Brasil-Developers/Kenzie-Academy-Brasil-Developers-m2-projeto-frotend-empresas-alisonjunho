import { requestNovoDepartamento, allUser, requestAllDepartamento,requestContratação, requestDemissão } from "./requisicoes.js"
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
    } fecharMmodal()
    function criaDepartamento() {
        const array = []
        const btnDados = document.querySelector('.novodepartamento')
        const form = document.querySelector('.dados')
        const trans = [...form.elements]
        btnDados.addEventListener('click', (event) => {
            event.preventDefault()
            trans.forEach((element) => {
                if (element.tagName == 'INPUT' || element.tagName == 'SELECT' && element.value != '') {
                    array[element.name] = element.value
                }
            })
            event.path[3].remove()
            requestNovoDepartamento(array)
        })
    } criaDepartamento()
}
function optionModalDinamico(dados) {
    dados.forEach((element) => {
        const select = document.querySelector('.options')
        select.insertAdjacentHTML('beforeend', `
    <option value="${element.uuid}">${element.name}</option>
    `)
    })

}
export async function modalVisualizador(item) {
    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend', `
    <div class="containerModal">
        <div class='modalVisual'>
            <div>
                <h2>${item.name}</h2>
                <button class="fechar" >X</button>
            </div>
            <section class="sectInfo">
                <div class="infomodal">
                    <h3>${item.description}</h3>
                    <p>${item.companies.name}</p>
                </div>
                <div class="dadosModal">
                    <select class='selecopt' name="">
                        <option value="Selecionar Usuário">Selecionar Usuário</option>
                    </select>
                    <button id='${item.uuid}' class="contratar">Contratar</button>
                </div>
            </section>
            <section class="listaModal">
                <ul class='listaDesempregados'>
                </ul>
            </section>
        </div>
    </div>
    `)
    usuarioDempregados()
    await usuarioEmpregados(item)
    const btnClose = document.querySelector('.fechar')
    btnClose.addEventListener('click', (event) => {
        event.path[3].remove()
    })
    const btnContratar = document.querySelector('.contratar')
    const valueSelect = document.querySelector('.selecopt')
    const arrayContrato=[]
    btnContratar.addEventListener('click',(event)=>{
        const idUsuario =valueSelect.value
        const idCompania=event.target.id
        arrayContrato.push(idUsuario,idCompania)
        event.path[4].remove()
        requestContratação(arrayContrato)
        setTimeout(()=>{window.location.reload()},5000)
    })
}
async function usuarioDempregados() {
    const lista = await allUser()
    const users = lista.filter((element) => element.department_uuid == null)
    users.forEach((item) => {
        const selec = document.querySelector('.selecopt')
        selec.insertAdjacentHTML('beforeend', `
    <option value="${item.uuid}">${item.username}</option>
    `)
    })
}
async function usuarioEmpregados(lista) {
    const usuarios = await allUser()
    const todosDepartamento = await requestAllDepartamento()
    const arrayContratos =[]
    usuarios.forEach((element)=>{
        if(element.department_uuid==lista.uuid){
            arrayContratos.push(element)
        }
    })
    if(arrayContratos!=''){
    arrayContratos.forEach((item) => {
        const lista = document.querySelector('.listaDesempregados')
        const name = todosDepartamento.filter((empresa) => empresa.uuid == item.department_uuid)
        lista.insertAdjacentHTML('beforeend', `
      <li>
                        <div>
                            <h3>Nome: ${item.username}</h3>
                            <p>Nível: ${item.professional_level}</p>
                            <p>Departamento: ${name[0].name}</p>
                        </div>
                        <button id='${item.uuid}' class="Desligar">Desligar</button>
                    </li>
      `)
    })
    const btnCaifora = document.querySelectorAll('.Desligar')
    btnCaifora.forEach((btn)=>{
        btn.addEventListener('click',(event)=>{
            const idUser =event.target.id
            event.path[5].remove()
            requestDemissão(idUser)
            setTimeout(()=>{window.location.reload()},5000)
        })
    })
   }else{
    const lista = document.querySelector('.listaDesempregados')
        lista.insertAdjacentHTML('beforeend', `
        <div class='horizonte'>
            <h3>Nenhum funcionário contratado nesse Departamento</h3>
        </div>
        `)

   }
}