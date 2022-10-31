function domList (item){
    const editHora = item.opening_hours.slice(0,2)
    const ul = document.querySelector('#listPrinc')
    ul.insertAdjacentHTML('beforeend',`
    <li>
         <h2>${item.name}</h2>
         <p>${editHora} horas</p>
         <button>${item.sectors.description}</button>
    </li>
    `)
}
export function percorreLista(lista){
    lista.forEach((element)=>domList(element))
}
export function optionList(item){
    const newArray = []
    item.forEach((destruct)=>{
        const categ =destruct.sectors.description
        if(!newArray.includes(categ)){
            newArray.push(categ)
        }
    })
    newArray.forEach((element)=>{
        const select = document.querySelector('#optHome')
        select.insertAdjacentHTML('beforeend',`
        <option value="${element}">${element}</option>
        `)
    })
}