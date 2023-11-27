import { useRef } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

export function HomeSlider() {
  const carouselRef = useRef(null)

  function moveToSelected(element) {
    let selected

    if (carouselRef.current) {
      if (element === 'next') {
        selected = carouselRef.current.querySelector('.selected').nextElementSibling
      } else if (element === 'prev') {
        selected = carouselRef.current.querySelector('.selected').previousElementSibling
      } else {
        selected = element
      }

      const next = selected.nextElementSibling
      const prev = selected.previousElementSibling
      const prevSecond = prev ? prev.previousElementSibling : null
      const nextSecond = next ? next.nextElementSibling : null

      selected.className = 'selected'
      if (prev) prev.className = 'prev'
      if (next) next.className = 'next'
      if (nextSecond) nextSecond.className = 'next-right-second'
      if (prevSecond) prevSecond.className = 'prev-left-second'

      if (nextSecond) {
        let elem = nextSecond.nextElementSibling
        while (elem) {
          elem.className = 'hide-right'
          elem = elem.nextElementSibling
        }
      }

      if (prevSecond) {
        let elem = prevSecond.previousElementSibling
        while (elem) {
          elem.className = 'hide-left'
          elem = elem.previousElementSibling
        }
      }
    }
  }

  return (
    <main className='home-slider-section'>
      <h1>Our templates collection</h1>
      <div className='carousel' ref={carouselRef}>
        <div className='hide-left'>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698526974/template-example2_hfqvjd.webp'
            alt='image 1'
          />
        </div>
        <div className='prev-left-second'>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698526974/template-example5_xhiszc.webp'
            alt='image 2'
          />
        </div>
        <div className='prev'>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698526974/template-example1_jokqik.webp'
            alt='image 3'
          />
        </div>
        <div className='selected'>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698526974/template-example3_pqkdsb.webp'
            alt='image 4'
          />
        </div>
        <div className='next'>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698526974/template-example4_dgmejs.webp'
            alt='image 5'
          />
        </div>
        <div className='next-right-second'>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698505373/carspecial_yz2qhn.jpg'
            alt='image 6'
          />
        </div>
        <div className='hide-right'>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504587/soundbeam_ahquqc.jpg'
            alt='image 7'
          />
        </div>
      </div>
      <div className='home-slider-buttons'>
        <button className='prev' onClick={() => moveToSelected('prev')}>
          <span className='button-content'>
            <KeyboardArrowLeft />
          </span>
        </button>
        <button className='next' onClick={() => moveToSelected('next')}>
          <span className='button-content'>
            <KeyboardArrowRight />
          </span>
        </button>
      </div>
    </main>
  )
}
