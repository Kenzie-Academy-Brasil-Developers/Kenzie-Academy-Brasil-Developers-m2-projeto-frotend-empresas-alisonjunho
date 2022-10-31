import { directLogin } from "../../scripts/direcionamentoLogin.js"
import { requestLogin } from '../../scripts/requisicoes.js'
//direcionamento de paginas
directLogin()
// função para abrir e fechar botoes
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

function login(){
    const userLogin=[]
    const btn  = document.querySelector('#login')
    const form = document.querySelector('.formLogin')
    const dados =[...form.elements]
    btn.addEventListener('click',(event)=>{
        event.preventDefault()
        dados.forEach((valor)=>{
            if(valor.nodeName=='INPUT' && valor.value!=''){
               userLogin[valor.name]=(valor.value)
            }
        })
        requestLogin(userLogin)
    })
}login()