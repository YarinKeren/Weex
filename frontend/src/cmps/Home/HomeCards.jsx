import { ElectricBolt, Accessibility, Security, AdsClick, Dashboard } from '@mui/icons-material'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HomeCards() {
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)

  useEffect(() => {
    if (card1Ref.current && card2Ref.current) {
      const card1 = card1Ref.current
      const card2 = card2Ref.current

      gsap.fromTo(
        card1,
        0.8,
        { opacity: 0, x: 200, ease: 'elastic' },
        {
          opacity: 1,
          x: 0,
          delay: 0.1,
          scrollTrigger: {
            trigger: '.home-cards-section',
            start: 'top bottom',
            end: 'top bottom',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        card2,
        0.8,
        { opacity: 0, x: -200, ease: 'elastic' },
        {
          opacity: 1,
          x: 0,
          delay: 0.3,
          scrollTrigger: {
            trigger: '.home-cards-section',
            start: 'top bottom',
            end: 'top bottom',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  return (
    <section className='home-cards-section'>
      <div ref={card1Ref} className='home-cards-top'>
        <div className='home-card'>
          <div className='card-content'>
            <div className='card-image'>
              <ElectricBolt />
            </div>
            <div className='card-info'>
              <h2>Faster than light</h2>
              <p>Weex is designed for performance so your site loads faster.</p>
            </div>
          </div>
        </div>
        <div className='home-card greyer-card'>
          <div className='card-content'>
            <div className='card-image'>
              <Accessibility />
            </div>
            <div className='card-info'>
              <h2>Accessible for everyone</h2>
              <p>There's no need to be an expert in order to make an inclusive website.</p>
            </div>
          </div>
        </div>
        <div className='home-card'>
          <div className='card-content'>
            <div className='card-image'>
              <Security />
            </div>
            <div className='card-info'>
              <h2>Enterprise-grade security</h2>
              <p>We keep your site and visitors’ data protected, 24/7.</p>
            </div>
          </div>
        </div>
      </div>
      <div ref={card2Ref} className='home-cards-bottom' id='our-services'>
        <div className='home-card forth'>
          <div className='card-content'>
            <div className='card-image'>
              <AdsClick />
            </div>
            <div className='card-info'>
              <h2>Live cursors</h2>
              <p>Add live cursors to make people feel as if they were together in the same room.</p>
            </div>
          </div>
        </div>
        <div className='home-card fifth'>
          <div className='card-content'>
            <div className='card-image'>
              <Dashboard />
            </div>
            <div className='card-info'>
              <h2>Professional Dashboard</h2>
              <p> manage your business, get data and control your website in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
