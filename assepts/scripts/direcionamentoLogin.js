export function directLogin (){
    const nav = document.querySelector('.endClose')
    nav.addEventListener('click',(event)=>{
        const click =event.target.innerText
        if(click== 'Home'){
          return  window.location.replace('../../../index.html')
        }if(click== 'Cadastro'){
            return window.location.replace('../registro/index.html')
        }
    })
}