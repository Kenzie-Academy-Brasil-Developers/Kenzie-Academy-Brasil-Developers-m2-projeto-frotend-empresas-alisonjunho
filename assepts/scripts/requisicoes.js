import { sucessoAndErro } from "./toast.js"
const url = 'http://localhost:6278'
function token(){
  const dadosStorage = JSON.parse(localStorage.getItem('token'))
  if(dadosStorage){
     return dadosStorage
  }
}token()

export async function requestLogin(user){
  try{
    const conteudo ={
        email:user.email,
        password:user.password
    }
    const estrutura={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(conteudo),
    }
    const request = await fetch(`${url}/auth/login`,estrutura)
    const requestJson = await request.json()
    const requestToken = requestJson.token
    const trans = JSON.stringify(requestToken)
    if(request.ok){
      localStorage.setItem('token',trans)
        sucessoAndErro('Login efetuado com Sucesso!','Você será direcionado para a pagina')
        setTimeout(()=>{window.location.replace('../UsuarioPage/index.html')},5000)
    }else{
        sucessoAndErro('Falha no Login','Verifique os dados e tente novamente!')
    }
  }catch(error){
    sucessoAndErro('Falha no Login','Verifique os dados e tente novamente!')
  }
}
export async function requestRegister(newUser){
  try{
    const novouser ={
        username: newUser.nome,
        password:newUser.password,
        email:newUser.email,
        professional_level: newUser.professional_level,
    }
    const estrutura={
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novouser)  
    }
    const request = await fetch(`${url}/auth/register`,estrutura)
    console.log(request)
    if(request.ok){
        sucessoAndErro('Resgistro realizado com sucesso!','Você será direcionado para a pagina de login')
        setTimeout(()=>{window.location.replace('../login/index.html')},5000)
    }else{
        sucessoAndErro('Virús Cavalo de Tróia!','Verifique os dados e Tente Novamente')
    }
  }catch(erro){
    sucessoAndErro('Virús Cavalo de Tróia!','Verifique os dados e Tente Novamente')
  }
}
export async function requestUserInfo(){
   const estrutura ={
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
   }
   const request = await fetch(`${url}/users/profile`,estrutura)
   const requestJson = await request.json()
  return requestJson
}
export async function requestEditUser(edit){
try{
  const estrutura = {
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    },
    body: JSON.stringify(edit),
  }
  const request= await fetch(`${url}/users`,estrutura)
  const requestJson = await request.json()
  if(request.ok){
    sucessoAndErro('Dado(s) atualizado com sucesso','Continue navegando na página!')
  }else{
    sucessoAndErro('Falha ao salvar Dados',`${requestJson.error}`)
  }
}catch(error){
  sucessoAndErro('Falha ao salvar Dados',`${requestJson.error}`)

}
}