export function directHome (){
    const nav = document.querySelector('.endClose')
    nav.addEventListener('click',(event)=>{
        const click =event.target.innerText
        if(click== 'Login'){
          return  window.location.replace('./assepts/pages/login/index.html')
        }if(click== 'Cadastro'){
            return window.location.replace('./assepts/pages/registro/index.html')
        }
    })
}