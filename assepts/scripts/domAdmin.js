import { requestAdminFilterDepartamento, requestAllDepartamento,allUser } from "./requisicoes.js"
import { modalVisualizador, ModalDelete, modalEditDepartamento, modalEditUser , modalDeleteUser} from "./modais.js"
export async function listaDepartamento(lista) {
    const departamentos = await requestAllDepartamento()
    lista.forEach((element) => {
        const ul = document.querySelector('.listaDepartamentos')
        ul.insertAdjacentHTML('beforeend', `
        <li>
                    <div>
                        <h4>${element.name}</h4>
                        <p>${element.description}</p>
                        <p>${element.companies.name}</p>
                    </div>
                    <nav>
                        <img id='${element.uuid}' class="olho" src="../../img/icones/VectorOlho.png" alt="icone olho">
                        <img id='${element.uuid}' class ='caneta'src="../../img/icones/Vector (4).png" alt="icone caneta">
                        <img id='${element.uuid}' class="lixeira" src="../../img/icones/Vector (5).png" alt="icone lixeira">
                    </nav>
                </li>
        `)
    })

    const btnOlho = document.querySelectorAll('.olho')
    btnOlho.forEach((element) => {
        element.addEventListener('click', (event) => {
            const id = event.target.id
            const achei = departamentos.filter((encontrado) => encontrado.uuid == id)
            modalVisualizador(achei[0])
        })
    })
    const bntDelete = document.querySelectorAll('.lixeira')
    bntDelete.forEach((element) => {
        element.addEventListener('click', (event) => {
            const id = event.target.id
            const buscaDepartamento = departamentos.filter((kdtu)=>kdtu.uuid==id)
            ModalDelete(buscaDepartamento[0])
        })
    })
    const btnEdit = document.querySelectorAll('.caneta')
    btnEdit.forEach((element)=>{
        element.addEventListener('click',(event)=>{
            const id = event.target.id
            const editDepartamento = departamentos.filter((edit)=>edit.uuid==id)
            modalEditDepartamento(editDepartamento[0])
        })
    })
}
export function selectonAdmin(lista) {
    lista.forEach((element) => {
        const select = document.querySelector('.selectAdmin')
        select.insertAdjacentHTML('beforeend', `
        <option class='opcao' value="${element.uuid}">${element.name}</option>
        `)
    })
    const select = document.querySelector('.selectAdmin')
    const ul = document.querySelector('.listaDepartamentos')
    select.addEventListener('click', async (e) => {
        const id = e.target.value
        if (id == 'Selecionar Empresa') {
            const listaGeral = await requestAllDepartamento()
            ul.innerHTML = ''
            listaDepartamento(listaGeral)
        }
        else {
            const listF = await requestAdminFilterDepartamento(id)
            ul.innerHTML = ''
            listaDepartamento(listF)
        }
    })
}
export async function listaUser(lista) {
    const todosUsuario  = await allUser()
    const todosDepartamento = await requestAllDepartamento()
    lista.forEach((element) => {
        if (element.username != 'ADMIN') {
            let departamento = element.department_uuid
            if (element.department_uuid == null) {
                departamento = 'Desempregado'
            } else {
                const nomeDepartamento = todosDepartamento.filter((busca) => busca.uuid == departamento)
                departamento = nomeDepartamento[0].name
            }
            const ul = document.querySelector('.listaUsuario')
            ul.insertAdjacentHTML('beforeend', `
    <li>
                    <div>
                        <h4>${element.username}</h4>
                        <p>${element.professional_level}</p>
                        <p>${departamento}</p>
                    </div>
                    <nav>
                        <img id='${element.uuid}' class ='canetaUser'src="../../img/icones/Vector (4).png" alt="icone caneta">
                        <img id='${element.uuid}' class="lixeiraUser" src="../../img/icones/Vector (5).png" alt="icone lixeira">
                    </nav>
                </li>

    `)
        }
    })
   const btnEditUser=  document.querySelectorAll('.canetaUser')
   btnEditUser.forEach((element)=>{
    element.addEventListener('click',(event)=>{
        const id = event.target.id
        modalEditUser(id)
    })
   })
   const btnDelettUser=  document.querySelectorAll('.lixeiraUser')
   btnDelettUser.forEach((element)=>{
    element.addEventListener('click',(event)=>{
        const id = event.target.id
        const userClick = todosUsuario.filter((kdtu)=>kdtu.uuid==id)
        modalDeleteUser(userClick[0])
    })
   })
}