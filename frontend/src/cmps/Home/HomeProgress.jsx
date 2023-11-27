import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function HomeProgress() {
  const headlineRef = useRef(null)
  const taglineRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headlineRef.current,
      0.8,
      { opacity: 0, y: 50, ease: 'elastic' },
      {
        opacity: 1,
        y: 0,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.progress-headline',
          start: 'top bottom',
          end: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      taglineRef.current,
      0.8,
      { opacity: 0, y: 50, ease: 'elastic' },
      {
        opacity: 1,
        y: 0,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.progress-headline',
          start: 'top bottom',
          end: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      progressRef.current,
      0.8,
      { opacity: 0, y: 50, ease: 'elastic' },
      {
        opacity: 1,
        y: 0,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.progress-steps',
          start: 'top bottom',
          end: 'top bottom',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section className='home-progress-section'>
      <div className='progress-headline'>
        <h1 ref={headlineRef}>How it works</h1>
        <p ref={taglineRef}>Our process is simple and easy to understand</p>
      </div>
      <div ref={progressRef} className='progress-steps'>
        <div className='progress-numbers'>
          <div className='progress-number'>01</div>
          <div className='progress-number'>02</div>
          <div className='progress-number'>03</div>
        </div>
        <div className='progress-devider'></div>
        <div className='progress-text'>
          <div className='progress-text-step'>
            <h3>Choose a template</h3>
            <p>Use one of our professionally designed templates to get started.</p>
          </div>
          <div className='progress-text-step'>
            <h3>Create your website</h3>
            <p>Change the text, add your own images and customize the site however you desire.</p>
          </div>
          <div className='progress-text-step'>
            <h3>Showoff to your friends</h3>
            <p>Once you're done, publish your site and share it with whoever you want.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
