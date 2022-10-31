export function sucessoAndErro(titulo, mensagem) {
    const body = document.querySelector('body')
    const div = document.createElement('div')
    div.id ='containerMensagem'
    const divimg = document.createElement('div')
    if (titulo == 'Login efetuado com Sucesso!'||titulo == 'Resgistro realizado com sucesso!') {
        div.classList.add('sucesso')
    }else {
        div.classList.add('error')
    }

    const h3 = document.createElement('h3')
    h3.innerText = titulo
    divimg.append(h3)
    const saudacao = document.createElement('p')
    saudacao.innerText=mensagem 
    div.append(divimg,saudacao)
    body.appendChild(div)
}