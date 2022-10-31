export function directRegistro (){
    const nav = document.querySelector('.endClose')
    nav.addEventListener('click',(event)=>{
        const click =event.target.innerText
        if(click== 'Home'){
          return  window.location.replace('../../../index.html')
        }if(click== 'Login'){
            return window.location.replace('../login/index.html')
        }
    })
}