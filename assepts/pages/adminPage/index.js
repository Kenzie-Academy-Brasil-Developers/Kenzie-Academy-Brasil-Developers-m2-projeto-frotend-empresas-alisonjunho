import { requestAllDepartamento ,allUser,requestAllEmpresas , requestVerificaçãoPagina} from "../../scripts/requisicoes.js";
import { selectonAdmin, listaDepartamento, listaUser } from "../../scripts/domAdmin.js";
import { listaHome } from "../../scripts/requestHomePage.js";
import { modalCriaDepartamento } from "../../scripts/modais.js";
// função para realizar logout
async function logout(){
    // verificando permissão para ficar na página
    const permissão = await requestVerificaçãoPagina()
    if(!permissão.is_admin){
        window.location.replace('../../../index.html')
    }
    const token=  localStorage.getItem('token')
    if(!token){
        window.location.replace('../../../index.html')
    }
    const lg = document.querySelector('.Logout')
    lg.addEventListener('click',()=>{
        localStorage.removeItem('token')
        window.location.replace('../../../index.html')
    })
}logout()
// lista de departamentos
const lista = await requestAllDepartamento()
listaDepartamento(lista)
// lista de usuarios
const listaUsuarios= await allUser()
listaUser(listaUsuarios)
async function select(){
 const lista = await listaHome()
 selectonAdmin(lista)
}select()
// funcao para criar departamento
async function novoDepartamento(){
    const empresas= await requestAllEmpresas()
    const novo = document.querySelector('.criarmodal')
    novo.addEventListener('click',()=>{
        modalCriaDepartamento(empresas)
    })
}novoDepartamento()
