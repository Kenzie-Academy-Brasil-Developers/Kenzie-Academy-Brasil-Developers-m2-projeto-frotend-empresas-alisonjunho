import { listaHome, listaHomeSetor } from "../../scripts/requestHomePage.js";
import { percorreLista, optionList } from "../../scripts/homeDom.js";
import { directHome } from '../../scripts/direcionamentoHome.js'
async function optList() {
        const arrayList = await listaHome()
        optionList(arrayList)
    } optList()

async function listaItes() {
    const arrayList = await listaHome()
    percorreLista(arrayList)
} listaItes()

async function verificaOptin() {
    const geralList = await listaHome()
    const ul = document.querySelector('#listPrinc')
    const select = document.querySelector('#optHome')
    select.addEventListener('click', async () => {
        const value = select.value
        if (value == 'Selecionar Setor') {
            ul.innerHTML = ''
            percorreLista(geralList)
        } else {
            ul.innerHTML = ''
            const filtro = await listaHomeSetor(value)
            percorreLista(filtro)
        }

    })

} verificaOptin()

function abreFechahome() {
    const nav = document.querySelector('.endClose')
    const img = document.querySelector('.imgMobile')
    img.addEventListener('click', () => {
        const imgSrc = img.src
        if (imgSrc == 'http://127.0.0.1:5500/assepts/img/icones/Vector.png') {
            img.src = './assepts/img/icones/Vector (1).png'
            nav.id = 'open'
        } else {
            img.src = './assepts/img/icones/Vector.png'
            nav.id = ''
        }
    })
} abreFechahome()
// direcionamento de paginas
directHome()