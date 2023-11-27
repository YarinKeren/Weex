import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollToPlugin)

export function HeroSection() {
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const homeLogosRef = useRef(null)
  const logosRef = useRef(null)
  const btnsRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (
      titleRef.current &&
      taglineRef.current &&
      homeLogosRef.current &&
      logosRef.current &&
      btnsRef.current &&
      imgRef.current
    ) {
      // Instances of SplitType
      const titleText = new SplitType(titleRef.current)
      const taglineText = new SplitType(taglineRef.current)
      const homeLogosTitle = new SplitType(homeLogosRef.current)

      // Animation for .char elements
      gsap.to('.char', {
        y: 0,
        stagger: 0,
        delay: 0,
        duration: 0.5,
        ease: 'power2.in',
      })

      // Animation for buttons
      gsap.fromTo(btnsRef.current, 0.5, { opacity: 0, y: 60 }, { opacity: 1, y: 0, delay: 0.6, ease: 'power2.out' })

      // Animation for image
      gsap.fromTo(imgRef.current, 0.8, { opacity: 0, y: 50 }, { opacity: 1, y: 0, delay: 0.3, ease: 'power2.out' })
    }

    // Animation for home logos
    gsap.fromTo(logosRef.current, 0.8, { opacity: 0, y: 50 }, { opacity: 1, y: 0, delay: 1, ease: 'power2.out' })
  }, [])

  const handleOurServicesClick = () => {
    const target = document.getElementById('our-services')
    if (target) {
      const targetOffset = target.offsetTop
      const targetHeight = target.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = targetOffset - windowHeight / 2 + targetHeight / 2

      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: scrollY,
          autoKill: true,
        },
        ease: 'power2.inOut',
      })
    }
  }

  return (
    <div className='home-page-hero'>
      <div className='header-hero'>
        <h1 ref={titleRef} className='home-hero-title'>
          Build beautiful and fast webapps with Weex
        </h1>
        <p ref={taglineRef} className='home-hero-tagline'>
          We've got about 20+ years worth of collective knowledge to be able to build scalable, optimized websites &
          enterprise-grade web applications
        </p>
        <div ref={btnsRef} className='header-hero-btns'>
          <button onClick={handleOurServicesClick} className='home-hero-btn first'>
            <a> Our Services</a>
          </button>
          <NavLink to='/wap'>
            <button className='home-hero-btn second'>Get started</button>
          </NavLink>
        </div>
      </div>
      <div className='hero-img-logo'>
        <div className='hero-platform-img'>
          <img
            ref={imgRef}
            src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698327428/Weex-home-hero_fmobbj.png'
            alt='platform-img'
          />
        </div>
        <div className='scroll-down-icon'></div>
        <div className='logos-container'>
          <p ref={homeLogosRef} className='home-logos-title'>
            Loved by 1k+ of the most product-forward companies
          </p>
          <div ref={logosRef} className='home-logos-top-grid'>
            <img src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698354251/ebay_amvwct.png' alt='ebay-logo' />
            <img
              src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698354252/fedex_mnjisj.png'
              alt='fedex-logo'
            />
            <img
              src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698354251/hooli_wg6yq1.png'
              alt='hooli-logo'
            />
            <img
              src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698354253/ember_djjpfa.png'
              alt='ember-logo'
            />
          </div>
          <div className='home-logos-bottom-grid'>
            <img src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698354251/dhl_sbgk31.png' alt='dhl-logo' />
            <img
              src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698354251/amazon-pay_k52d1h.png'
              alt='amazon-pay-logo'
            />
            <img
              src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698354251/cpanel_ehnpbp.png'
              alt='cpanel-logo'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
