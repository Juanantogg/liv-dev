const doc = document.documentElement
const menu = document.getElementById('menu')
const bottonMenu = document.getElementById('botton-menu')
const navegacionPrincipal = document.getElementById('navegacion-principal')
const submenu = document.getElementById('submenu')
const nosotros = document.getElementById('nosotros')
const nosotrosItem = document.getElementById('nosotros-item')
const imagenSlider = document.querySelectorAll('.slider__imagen')
let arraySlider = Array.from(imagenSlider)
const bottonSlider = document.getElementById('botton-slider')
const arriba = document.getElementById('arriba')
const acordeon = document.getElementsByClassName('responsabilidad__acordeon')
const responsabilidadContenido = document.getElementsByClassName('responsabilidad__contenido')
const flechas = document.getElementsByClassName('responsabilidad__flecha')

const expandirMenu = () => {
  bottonMenu.classList.toggle('botton-menu__logo--cerrar')
  navegacionPrincipal.classList.toggle('navegacion-principal--extendida')
  navegacionPrincipal.classList.remove('navegacion-principal--extendida2')
  nosotrosItem.classList.remove('navegacion-principal__nosotros--giro')
  submenu.classList.remove('navegacion-principal__dos--extendida')
}

const expandirSubmenu = () => {
  nosotrosItem.classList.toggle('navegacion-principal__nosotros--giro')
  navegacionPrincipal.classList.toggle('navegacion-principal--extendida2')
  submenu.classList.toggle('navegacion-principal__dos--extendida')
}

const animacionSlide = () => {
  if (window.location.pathname === '/') {
    arraySlider.forEach((imagen, index) => {
      imagen.style.left = `${(index - 1) * 100}%`
      if (imagen.style.left === '0%') {
        imagen.style.zIndex = '10'
      }
      if (imagen.style.left === '200%') {
        imagen.style.zIndex = '-10'
      }
    })
  }
}

let intervaloSlider = setInterval(() => {
  let primerImagen = arraySlider.shift()
  arraySlider.push(primerImagen)
  animacionSlide()
}, 5000)

const cambiarImagen = () => {
  clearInterval(intervaloSlider)
  let intervaloSlider1 = setInterval(() => {
    let primerImagen = arraySlider.shift()
    arraySlider.push(primerImagen)
    animacionSlide()
    clearInterval(intervaloSlider1)
  }, 100)
  intervaloSlider = setInterval(() => {
    let primerImagen = arraySlider.shift()
    arraySlider.push(primerImagen)
    animacionSlide()
  }, 5000)
}

const subir = () => {
  let scrollStep = -window.scrollY / (500 / 3)
  let scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(500, scrollStep)
    } else clearInterval(scrollInterval)
  }, 1)
}

const bajar = (scroll) => {
  let bajar = setInterval(() => {
    doc.scrollTop += scroll / 40
    if (doc.scrollTop > scroll) {
      clearInterval(bajar)
    }
  }, 10)
}

const mostrarBotonArriba = () => {
  if (document.documentElement.scrollTop > 400 && arriba) {
    arriba.style.right = '1em'
  } else {
    arriba.style.right = '-5em'
  }
}

const mostrarFase = (index) => {
  let span = Array.from(flechas)
  let contenido = Array.from(responsabilidadContenido)

  contenido.forEach((item, i) => {
    if (i === index) {
      item.classList.toggle('responsabilidad__contenido--extendido')
      span[i].classList.toggle('responsabilidad__flecha--giro')
    } else {
      span[i].classList.remove('responsabilidad__flecha--giro')
      item.classList.remove('responsabilidad__contenido--extendido')
    }
  })

  if (!Array.from(contenido[0].classList).includes('responsabilidad__contenido--extendido') &&
      !Array.from(contenido[1].classList).includes('responsabilidad__contenido--extendido')) {
    subir()
  }

  if (window.matchMedia('(max-width: 300px)').matches &&
      Array.from(contenido[index].classList).includes('responsabilidad__contenido--extendido')) {
    bajar(490)
  } else if (window.matchMedia('(min-width: 305px)').matches &&
             window.matchMedia('(max-width: 574px)').matches &&
             Array.from(contenido[index].classList).includes('responsabilidad__contenido--extendido')) {
    bajar(430)
  } else if (window.matchMedia('(min-width: 575px)').matches &&
             window.matchMedia('(max-width: 719px)').matches &&
             Array.from(contenido[index].classList).includes('responsabilidad__contenido--extendido')) {
    bajar(380)
  } else if (window.matchMedia('(min-width: 720px)').matches &&
             window.matchMedia('(max-width: 888px)').matches &&
             Array.from(contenido[index].classList).includes('responsabilidad__contenido--extendido')) {
    bajar(550)
  } else if (window.matchMedia('(min-width: 889px)').matches &&
             Array.from(contenido[index].classList).includes('responsabilidad__contenido--extendido')) {
    bajar(470)
  }
}

menu.addEventListener('click', () => expandirMenu())
nosotros.addEventListener('click', () => expandirSubmenu())
if (bottonSlider) bottonSlider.addEventListener('click', () => cambiarImagen())
if (acordeon) Array.from(acordeon).forEach((fase, index) => fase.addEventListener('click', () => mostrarFase(index)))
window.addEventListener('scroll', () => mostrarBotonArriba())
if (arriba) arriba.addEventListener('click', () => subir())
// window.addEventListener('click', (e) => {
//   e.preventDefault()
//   if (Array.from(bottonMenu.classList).includes('botton-menu__logo--cerrar')) {
//     bottonMenu.classList.remove('botton-menu__logo--cerrar')
//   }
//   navegacionPrincipal.classList.remove('navegacion-principal--extendida')
//   navegacionPrincipal.classList.remove('navegacion-principal--extendida2')
//   nosotrosItem.classList.remove('navegacion-principal__nosotros--giro')
//   submenu.classList.remove('navegacion-principal__dos--extendida')
// })
