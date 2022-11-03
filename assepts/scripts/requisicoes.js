import { sucessoAndErro } from "./toast.js"
const url = 'http://localhost:6278'
function token() {
  const dadosStorage = JSON.parse(localStorage.getItem('token'))
  if (dadosStorage) {
    return dadosStorage
  }
} token()

export async function requestLogin(user) {
  try {
    const conteudo = {
      email: user.email,
      password: user.password
    }
    const estrutura = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conteudo),
    }
    const request = await fetch(`${url}/auth/login`, estrutura)
    const requestJson = await request.json()
    const requestToken = requestJson.token
    const trans = JSON.stringify(requestToken)
    if (request.ok) {
      localStorage.setItem('token', trans)
      sucessoAndErro('Login efetuado com Sucesso!', 'Você será direcionado para a pagina')
      requestAdminAndUser()
    } else {
      sucessoAndErro('Falha no Login', 'Verifique os dados e tente novamente!')
    }
  } catch (error) {
    sucessoAndErro('Falha no Login', 'Verifique os dados e tente novamente!')
  }
}
export async function requestRegister(newUser) {
  try {
    const novouser = {
      username: newUser.nome,
      password: newUser.password,
      email: newUser.email,
      professional_level: newUser.professional_level,
    }
    const estrutura = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novouser)
    }
    const request = await fetch(`${url}/auth/register`, estrutura)
    if (request.ok) {
      sucessoAndErro('Resgistro realizado com sucesso!', 'Você será direcionado para a pagina de login')
      setTimeout(() => { window.location.replace('../login/index.html') }, 5000)
    } else {
      sucessoAndErro('Virús Cavalo de Tróia!', 'Verifique os dados e Tente Novamente')
    }
  } catch (erro) {
    sucessoAndErro('Virús Cavalo de Tróia!', 'Verifique os dados e Tente Novamente')
  }
}
export async function requestUserInfo() {
  const estrutura = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/users/profile`, estrutura)
  const requestJson = await request.json()
  return requestJson
}
export async function requestTodosMesmoDepartamento(){
  const estrutura={
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/users/departments/coworkers`,estrutura)
  const requestJson = await request.json()
  return requestJson
}
export async function requestEditUser(edit) {
  try {
    const estrutura = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token()}`
      },
      body: JSON.stringify(edit),
    }
    const request = await fetch(`${url}/users`, estrutura)
    const requestJson = await request.json()
    if (request.ok) {
      sucessoAndErro('Dado(s) atualizado com sucesso', 'Continue navegando na página!')
    } else {
      sucessoAndErro('Falha ao salvar Dados', `${requestJson.error}`)
    }
  } catch (error) {
    sucessoAndErro('Falha ao salvar Dados', `${requestJson.error}`)

  }
}
export async function requestAdminAndUser() {
  const estrutura = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/auth/validate_user`, estrutura)
  const requestJson = await request.json()
  if (!requestJson.is_admin) {
    setTimeout(() => { window.location.replace('../UsuarioPage/index.html') }, 5000)
  } else {
    setTimeout(() => { window.location.replace('../adminPage/index.html') }, 5000)
  }
}
export async function requestVerificaçãoPagina() {
  const estrutura = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/auth/validate_user`, estrutura)
  const requestJson = await request.json()
  return requestJson
}
export async function requestAllDepartamento() {
  const estrutura = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/departments`, estrutura)
  const requestJson = await request.json()
  return requestJson
}
export async function requestAdminFilterDepartamento(id) {
  const estrutura = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/departments/${id}`, estrutura)
  const requestJson = await request.json()
  return requestJson
}
export async function allUser() {
  const estrutura = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/users`, estrutura)
  const requestJson = await request.json()
  return requestJson
}
export async function requestAllEmpresas() {
  const estrutura = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const request = await fetch(`${url}/companies`, estrutura)
  const requestJson = await request.json()
  return requestJson
}
export async function requestNovoDepartamento(objeto) {
  try {
    const nvoObjeto = {
      name: objeto.name,
      description: objeto.description,
      company_uuid: objeto.company_uuid,
    }
    const estrutura = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token()}`
      },
      body: JSON.stringify(nvoObjeto)
    }
    const request = await fetch(`${url}/departments`, estrutura)
    const requestJson = await request.json()
    if (request.ok) {
      sucessoAndErro('Departamento criado com Sucesso', 'A pagina Será atualizada')
      setTimeout(() => { window.location.reload() }, 5000)
    } else {
      sucessoAndErro('Fala ao adicionar departamento', `${requestJson.error}`)
    }
  } catch (error) {
    sucessoAndErro('Fala ao adicionar departamento', `${requestJson.error}`)
  }
}
export async function requestContratação(user) {
  try {
    const funcionario = {
      user_uuid: user[0],
      department_uuid: user[1]
    }
    const estrutura = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token()}`
      },
      body: JSON.stringify(funcionario)
    }
    const request = await fetch(`${url}/departments/hire`, estrutura)
    const requestJson = await request.json()
    if (request.ok) {
      sucessoAndErro('Usuário Contratado!', `Parabens pela nova contratação!`)
      setTimeout(()=>{window.location.reload()},5000)
    } else {
      sucessoAndErro('Falha na Contratação', `${requestJson.error}`)
    }

  } catch (error) {
    sucessoAndErro('Falha na Contratação', `${requestJson.error}`)
  }
}
export async function requestDemissão(id) {
  try {
    const estrutura = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token()}`
      }
    }
    const request = await fetch(`${url}/departments/dismiss/${id}`, estrutura)
    if (request.ok) {
      sucessoAndErro('Funcionário Demitido!', 'Funcionário não faz mais parte de nenhum departamento!')
      setTimeout(()=>{window.location.reload()},5000)
    } else {
      sucessoAndErro('Falha na demissão', 'Funcionário não faz parte de nenhum departamento!')
    }
  } catch (error) {
    sucessoAndErro('Falha na demissão', 'Funcionário não faz parte de nenhum departamento!')
  }

}
export async function requestDelete(id) {
try{
  const estrutura = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/departments/${id}`,estrutura)
  if(request.ok){
    sucessoAndErro('Departamento Excluído com sucesso','O departamento não faz mais parte do banco de Dados')
  }else{
    sucessoAndErro('Falha ao excluir Departamento','O departamento não faz parte do banco de dados!')
  }
}catch(error){
  sucessoAndErro('Falha ao excluir Departamento','O departamento não faz parte do banco de dados!')
}
}
export async function requestEditDepartamento(id,description){
 try{
  const novaDescrição={
    description:description,
  }
  const estrutura={
    method: 'PATCH',
    headers:{
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token()}`
    },
    body: JSON.stringify(novaDescrição)
  }
  const request = await fetch(`${url}/departments/${id}`,estrutura)
  if(request.ok){
    sucessoAndErro('Descrição alterada com Sucesso','A pagina será atualizada!')
    setTimeout(()=>{window.location.reload()},5000)
  }else{
    sucessoAndErro('Falha ao salvar alterações','Verifique os dados e tente novamente')
  }

 }
 catch(error){
  console.log(error)
 }

}
export async function requestEditUserAdmin(id,edit){
try{
  const objet ={
    kind_of_work:edit.kind_of_work,
    professional_level:edit.professional_level,
  }
  const estrutura ={
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    },
    body: JSON.stringify(objet)
  }
  const request = await fetch(`${url}/admin/update_user/${id}`,estrutura)
  if(request.ok){
    sucessoAndErro('Alteração realizada com Sucesso','Usuario Atualizado,Obrigado!')
    setTimeout(()=>{window.location.reload()},5000)
  }else{
    sucessoAndErro('Falha ao tentar alterar dados','Verifique os campos e tente novamente')
  }
}
catch(error){
  sucessoAndErro('Falha ao tentar alterar dados','Verifique os campos e tente novamente')
}
}
export async function requestDeletUser(id){
try{
  const estrutura={
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token()}`
    }
  }
  const request = await fetch(`${url}/admin/delete_user/${id}`,estrutura)
  if(request.ok){
    sucessoAndErro('Usuário excluído com sucesso!','O usuario não faz mais parte do banco de dados')
    setTimeout(()=>{window.location.reload()},5000)
  }else{
    sucessoAndErro('Falha na solicitação','Usuário não está no bando de dados')
  }
}
catch(error){
  sucessoAndErro('Falha na solicitação','Usuário não está no bando de dados')
}
}