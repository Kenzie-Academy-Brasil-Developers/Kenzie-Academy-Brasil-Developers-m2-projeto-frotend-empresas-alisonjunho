import { requestUserInfo } from "../../scripts/requisicoes.js";
import { informacaoUser, sectionCompani } from '../../scripts/userDom.js'
async function estruturaInfo() {
    const info = await requestUserInfo()
    informacaoUser(info)
}estruturaInfo()
// >>>>>>>>>>>>>>>sair da pagina
function logout(){
    const lg = document.querySelector('.Logout')
    lg.addEventListener('click',()=>{
         localStorage.removeItem('token')
        window.location.replace('../../../index.html')
    })
}logout()
// >>>>>>>>>>>>>>>>>>>>>>>. verificar quando sectionRenderizar
 async function verificarTrabalho(){
    const info = await requestUserInfo()
    const divDesempregado = document.querySelector('.desempregado')
    const divEmpregado = document.querySelector('.empregado')
    if(!info.kind_of_work){
        divDesempregado.classList.add('trueDesempregado')
        divEmpregado.classList.remove('trueEmpregado')
    
    }else{
        divDesempregado.classList.remove('trueDesempregado')
        divEmpregado.classList.add('trueEmpregado')
        // sectionCompani() precisa de uma lista

    }
 }verificarTrabalho()

 //verifica se posso ficar logadoPelo token
  function verificaTOken(){
    const token = localStorage.getItem('token')
    if(!token){
        window.location.replace('../../../index.html')
    }
  }verificaTOken()
//abre fechaUserMobile
  function abreFechaLogin() {
    const nav = document.querySelector('.endClose')
    const img = document.querySelector('.imgMobile')
    img.addEventListener('click', () => {
        const imgSrc = img.src
        if (imgSrc == 'http://127.0.0.1:5500/assepts/img/icones/Vector.png') {
            img.src = '../../img/icones/Vector (1).png'
            nav.id = 'open'
        } else {
            img.src = '../../img/icones/Vector.png'
            nav.id = ''
        }
    })
} abreFechaLogin()
