import { AppHeader } from '../cmps/AppHeader'
import { HeroSection } from '../cmps/Home/HeroSection'
import { HomeCards } from '../cmps/Home/HomeCards'
import { HomePublish } from '../cmps/Home/HomePublish'
import { HomeProgress } from '../cmps/Home/HomeProgress'
import { HomeSlider } from '../cmps/Home/HomeSlider'
import { StartToday } from '../cmps/Home/StartToday'
import { ScrollToTop } from '../cmps/ScrollToTop'
import { AppFooter } from '../cmps/AppFooter'

export function HomePage() {
  return (
    <section className='weex-home-page-layout'>
      <AppHeader />
      <HeroSection />
      <HomeCards />
      <HomePublish />
      <HomeProgress />
      <HomeSlider />
      <StartToday />
      <ScrollToTop />
      <AppFooter />
    </section>
  )
}
