import { requestAllDepartamento ,allUser} from "../../scripts/requisicoes.js";
import { selectonAdmin, listaDepartamento, listaUser } from "../../scripts/domAdmin.js";
import { listaHome } from "../../scripts/requestHomePage.js";
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