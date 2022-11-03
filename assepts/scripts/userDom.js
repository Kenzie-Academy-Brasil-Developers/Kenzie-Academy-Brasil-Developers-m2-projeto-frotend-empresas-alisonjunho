import { requestEditUser, requestTodosMesmoDepartamento } from "./requisicoes.js"
export function informacaoUser(user){
     let departamento = user.kind_of_work
     if(departamento==null){
        departamento=''
     }
     const section = document.querySelector('.infoUser')
     section.insertAdjacentHTML('beforeend',`<div>
     <h2>${user.username.toUpperCase()}</h2>
    <div>
        <p>Email: ${user.email}</p>
        <p>${user.professional_level}</p>
        <p>${departamento}</p>
    </div>
</div>
<img class="imgEdit" src="../../img/icones/Vector (2).png" alt="icone caneta">
    `)
    const btnImg = document.querySelector('.imgEdit')
    btnImg.addEventListener('click',()=>{
        modalEdit()
    })
}
function modalEdit(){
    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend',`
    <div class="modalEdit">
    <div>
        <div>
            <h2>Editar Perfil</h2>
            <button class="close" >X</button>
        </div>
        <form>
            <input type="text" name="name" id="" placeholder="Seu nome">
            <input type="text" name="email" id="" placeholder="Seu e-mail">
            <input type="password" name="password" id="" placeholder="Sua senha">
            <button class='edit'>Editar perfil</button>
        </form>
    </div>
</div>
    
    `)
    const btnClose = document.querySelector('.close')
    btnClose.addEventListener('click',(event)=>{
        event.path[3].remove()
    })
    let array=[]
    let edit={}
    const btnEdit = document.querySelector('.edit')
    const form = document.querySelector('form')
    const dadosValue = [...form.elements]
    btnEdit.addEventListener('click', async(event)=>{
        event.preventDefault()
        dadosValue.forEach((element)=>{
            array[element.name]=element.value
            edit={
                username: array.name,
                password: array.password,
                email: array.email,
            }
        })
        requestEditUser(edit)
        event.path[3].remove()
        setTimeout(()=>{window.location.reload()},5000)
    })
}
export async function sectionCompani(id){
    const todosAmigos = await requestTodosMesmoDepartamento()
    const listaUL =todosAmigos[0].users
    const titulo = document.querySelector('.tituloDom')
    titulo.innerText =`${todosAmigos[0].name}`
    listaUL.forEach((element)=>{
   if(element.uuid!=id){
    const sec = document.querySelector('.lista')
    sec.insertAdjacentHTML('beforeend',`
    <li>
        <p>${element.username}</p>
        <p class="ex">${element.professional_level}</p>
    </li>
    `)
   }
    }) 
}