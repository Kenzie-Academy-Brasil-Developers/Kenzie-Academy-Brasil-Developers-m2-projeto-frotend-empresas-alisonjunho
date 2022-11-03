import { requestNovoDepartamento, allUser, requestAllDepartamento,requestContratação, requestDemissão,requestDelete , requestEditDepartamento ,requestEditUserAdmin , requestDeletUser} from "./requisicoes.js"
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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
    })
}
async function usuarioDempregados() {
    const lista = await allUser()
    const users = lista.filter((element) => element.department_uuid == null)
    users.forEach((item) => {
      if(item.username!='ADMIN'){
        const selec = document.querySelector('.selecopt')
        selec.insertAdjacentHTML('beforeend', `
    <option value="${item.uuid}">${item.username}</option>
    `)
      }
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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function ModalDelete(objeto){
    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend',`
    <div class="containerModal">
        <div class="modalDelete">
            <span class="desisto">X</span>
            <h3>Realmente deseja deletar o Departamento <strong>${objeto.name}</strong> e demitir seus funcionários?</h3>
            <button id='${objeto.uuid}' class="delet">Confirmar</button>
        </div>
    </div>
    `)
    const btnclose = document.querySelector('.desisto')
    btnclose.addEventListener('click',(event)=>{
        event.path[2].remove()
    })
    const btn =document.querySelector('.delet')
    btn.addEventListener('click',(eve)=>{
        const idDelete =eve.target.id
        requestDelete(idDelete)
        eve.path[2].remove()
        setTimeout(()=>{window.location.reload()},5000)
    })

}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function modalEditDepartamento(objeto){
    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend',`
    <div class="containerModal">
    <div class="modalEditDepartamento">
        <button class="closedModal">X</button>
        <div>
            <h2>Editar Departamento</h2>
            <textarea class='valueText' name="description">${objeto.description}</textarea>
            <button id='${objeto.uuid}' class="salvar">Salvar alterações</button>
        </div>
    </div>
</div>`
)
const btnClose = document.querySelector('.closedModal')
btnClose.addEventListener('click',(event)=>{
    event.path[2].remove()
})
const btnSalvar = document.querySelector('.salvar')
btnSalvar.addEventListener('click',(event)=>{
    const valueDescription = document.querySelector('.valueText')
    const idEdit = document.querySelector('.salvar')
    requestEditDepartamento(idEdit.id,valueDescription.value)
   event.path[3].remove()
})
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function modalEditUser(id){
    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend',`
    <div class="containerModal">
    <div class="modalEditUser">
        <button class="fecharEdit">X</button>
        <div>
            <h2>Editar usuário</h2>
            <select class="modalidade" name="kind_of_work" id="">
                <option value="Selecionar modalidade de trabalho">Selecionar modalidade de trabalho</option>
                <option value="home office">Home office</option>
                <option value="presencial">Presencial</option>
                <option value="hibrido">Hibrido</option>
            </select>
            <select class="nivel" name="professional_level" id="">
                <option value="Selecionar nível Profissional">Selecionar nível Profissional</option>
                <option value="estágio">Estágio</option>
                <option value="júnior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="sênior">Sênior</option>
            </select>
            <button id='${id}' class="edit" >Editar</button>
        </div>
    </div>
</div>
    `)
    const btnClose = document.querySelector('.fecharEdit')
    btnClose.addEventListener('click',(event)=>{
        event.path[2].remove()
    })
    const editandoUser= document.querySelector('.edit')
    const valueModalidade = document.querySelector('.modalidade')
    const valueNivel = document.querySelector('.nivel')
    const array=[]
    editandoUser.addEventListener('click',(event)=>{
        const idDelet = editandoUser.id
        if(valueModalidade.value=='Selecionar modalidade de trabalho'){
            array[valueModalidade.name]=''
        }else{
            array[valueModalidade.name]=valueModalidade.value
        }
        if(valueNivel.value=='Selecionar nível Profissional'){
            array[valueNivel.name]=''
        }else{
            array[valueNivel.name]=valueNivel.value
        }
        requestEditUserAdmin(idDelet,array)
        event.path[3].remove()
    })
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function modalDeleteUser(objet){
    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend',`
    <div class="containerModal">
    <div class="divmodalDeleteUser">
        <button class="closeDelete">X</button>
        <div>
            <h2>Realmente desejar remover o usuário <strong>${objet.username}</strong></h2>
            <button id='${objet.uuid}' class="delete">Deletar</button>
        </div>
    </div>
</div>
</body>
    `)
    const btnClose = document.querySelector('.closeDelete')
    btnClose.addEventListener('click',(event)=>{
        event.path[2].remove()
    })
    const btnDelete = document.querySelector('.delete')
    btnDelete.addEventListener('click',(event)=>{
        requestDeletUser(btnDelete.id)
        event.path[3].remove()
    })
}