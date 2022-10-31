 export async function listaHome(){
    const request = await fetch(`http://localhost:6278/companies`)
    const requestJson = await request.json()
     return requestJson
 }
 export async function listaHomeSetor(setor){
    const request = await fetch(`http://localhost:6278/companies/${setor}`)
    const requestJson = await request.json()
     return requestJson
 }