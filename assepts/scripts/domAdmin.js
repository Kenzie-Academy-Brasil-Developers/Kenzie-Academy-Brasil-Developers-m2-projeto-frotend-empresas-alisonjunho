import { requestAdminFilterDepartamento, requestAllDepartamento } from "./requisicoes.js"
import { modalVisualizador } from "./modais.js"
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
    
    const  btnOlho = document.querySelectorAll('.olho')
    btnOlho.forEach((element)=>{
        element.addEventListener('click',(event)=>{
            const id= event.target.id
           const achei= departamentos.filter((encontrado)=> encontrado.uuid==id)
            modalVisualizador(achei[0])
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
    lista.forEach((element) => {
        let departamento = lista.department_uuid
        if (departamento == null) {
            departamento = ''
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
                        <img class ='caneta'src="../../img/icones/Vector (4).png" alt="icone caneta">
                        <img class="lixeira" src="../../img/icones/Vector (5).png" alt="icone lixeira">
                    </nav>
                </li>

    `)
    })
}