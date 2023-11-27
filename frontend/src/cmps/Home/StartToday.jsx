import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function StartToday() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      0.5,
      { opacity: 0, y: 50, ease: 'elastic' },
      {
        opacity: 1,
        y: 0,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.start-today-section',
          start: 'top bottom',
          end: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section className='start-today-section'>
      <div ref={sectionRef} className='start-today-content'>
        <h1 className='start-today-title'>Tomorrow’s success starts today.</h1>
        <p className='start-today-subtitle'>
          Join thousands of people deploying hunderds of thousands of applications effortlessly with
          Weex builder
        </p>
        <NavLink to='/wap'>
          <button>
            <span className='button-content'>Get Started</span>
          </button>
        </NavLink>
      </div>
    </section>
  )
}
