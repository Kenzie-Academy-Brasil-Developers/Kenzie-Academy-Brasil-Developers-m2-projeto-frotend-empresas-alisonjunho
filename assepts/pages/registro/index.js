import { directRegistro } from "../../scripts/direcionamentoRegistro.js"
import { requestRegister } from '../../scripts/requisicoes.js'
// direcionamento de pagina
directRegistro()
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
// funcao novo usuario

function novoResgistro(){
    const newCadastro=[]
    const form = document.querySelector('.formResgistro')
    const btn = document.querySelector('#cadastro')
   const dados = [...form.elements]
    btn.addEventListener('click',(eve)=>{
        eve.preventDefault()
     dados.forEach((element)=>{
        if(element){
            newCadastro[element.name]=element.value
        }
    })
    requestRegister(newCadastro)
    })
}novoResgistro()