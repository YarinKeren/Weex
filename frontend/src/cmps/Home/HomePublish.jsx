import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HomePublish() {
  const headlinePublicRef = useRef(null)
  const imgLeftRef = useRef(null)
  const imgRightRef = useRef(null)

  useEffect(() => {
    const headlinePublic = headlinePublicRef.current
    const imgLeft = imgLeftRef.current
    const imgRight = imgRightRef.current

    gsap.fromTo(
      headlinePublic,
      0.7,
      { opacity: 0, y: 50, ease: 'power2.out' },
      {
        opacity: 1,
        y: 0,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.publish-headline',
          start: 'top bottom',
          end: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      imgLeft,
      0.8,
      { opacity: 0, x: -150, ease: 'power2.out' },
      {
        opacity: 1,
        x: 0,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.publish-image-left',
          start: 'top bottom',
          end: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      imgRight,
      0.8,
      { opacity: 0, x: 150, ease: 'power2.out' },
      {
        opacity: 1,
        x: 0,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.publish-image-right',
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section className='home-publish-section'>
      <div className='publish-headline'>
        <h1 ref={headlinePublicRef}>Design, Publish, Done.</h1>
        <div className='publish-taglines'>
          <p>Just design...</p>
          <img
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1699149885/arrow-right-pixelmator_kqq46k.png'
            alt='arrow-right'
            className='publish-icon'
          />
          <p>and publish 🚀</p>
        </div>
      </div>
      <div className='publish-wrapper'>
        <div className='publish-image-left'>
          <img
            ref={imgLeftRef}
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504206/publish-left_oop6oa.jpg'
            alt='publish-left-img'
          />
        </div>
        <div className='publish-image-right'>
          <img
            ref={imgRightRef}
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504205/publish-right_yirhcp.jpg'
            alt='publish-right-img'
          />
        </div>
      </div>
    </section>
  )
}
