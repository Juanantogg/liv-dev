if (window.location.pathname.includes('productos')) {
  const productos = Array.from(document.getElementsByClassName('slider-productos__imagen'))
  const anterior = document.getElementById('boton-anterior')
  const siguiente = document.getElementById('boton-siguiente')
  let sliderProductos

  const recorrerClases = () => {
    productos.forEach((item, index) => {
      item.style.zIndex = `${index}`
      if (index === 0) {
        item.classList.add('slider-productos__imagen--transparente')
      } else {
        item.classList.remove('slider-productos__imagen--transparente')
      }
    })
  }

  const agragarSlider = () => {
    sliderProductos = setInterval(() => {
      productos[productos.length - 1].classList.add('slider-productos__imagen--transparente')
      setTimeout(() => {
        let ultimo = productos.pop()
        productos.unshift(ultimo)
        productos[0].classList.remove('slider-productos__imagen--transparente')
        recorrerClases()
      }, 400)
    }, 5000)
  }

  const productoAnterior = () => {
    clearInterval(sliderProductos)
    let primero = productos.shift()
    productos.push(primero)
    recorrerClases()
    agragarSlider()
  }

  const productoSiguiente = () => {
    clearInterval(sliderProductos)
    let ultimo = productos.pop()
    ultimo.classList.add('slider-productos__imagen--transparente')
    productos.unshift(ultimo)
    setTimeout(() => {
      recorrerClases()
    }, 400)
    agragarSlider()
  }

  recorrerClases()
  agragarSlider()

  if (anterior) anterior.addEventListener('click', () => productoAnterior())
  if (siguiente) siguiente.addEventListener('click', () => productoSiguiente())
}
