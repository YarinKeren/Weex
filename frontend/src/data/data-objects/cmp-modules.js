// Hero
import cosmeticHero from '../template-cmps/heros/cosmetic-hero.json'
import natureHero from '../template-cmps/heros/nature-hero.json'
import headphonesHero from '../template-cmps/heros/headphones-hero.json'
import carHero from '../template-cmps/heros/car-hero.json'
import shopifyHero from '../template-cmps/heros/shopify-hero.json'
import designerHero from '../template-cmps/heros/designer-hero.json'
import foodyHero from '../template-cmps/heros/foody-hero.json'
import startupHero from '../template-cmps/heros/startup-hero.json'
import realEstateHero from '../template-cmps/heros/real-estate-hero.json'

// Navigation
import cosmeticNav from '../template-cmps/navigations/cosmetic-nav.json'
import shopifyNav from '../template-cmps/navigations/shopify-nav.json'
import headphonesNav from '../template-cmps/navigations/headphones-nav.json'
import carNav from '../template-cmps/navigations/car-nav.json'
import designerNav from '../template-cmps/navigations/designer-nav'
import foodyNav from '../template-cmps/navigations/foody-nav.json'
import startUpNav from '../template-cmps/navigations/startup-nav.json'
import realEstateNav from '../template-cmps/navigations/real-estate-nav.json'

// Gallery
import carouselOne from '../template-cmps/gallery/carousel-one.json'
import designerGallery from '../template-cmps/gallery/designer-gallery.json'
import foodyMenu from '../template-cmps/gallery/foody-menu.json'
import carSection2 from '../template-cmps/gallery/car-section-2.json'
import headphoneGallery from '../template-cmps/gallery/headphones-gallery.json'
import startupLogos from '../template-cmps/gallery/startup-logos.json'
import realEstateGallery from '../template-cmps/gallery/real-estate-gallery.json'

// Map
import carMap from '../template-cmps/map/car-map.json'
import foodyMap from '../template-cmps/map/foody-map.json'

// Contact
import designerContact from '../template-cmps/contact/designer-contact.json'
import generalContact from '../template-cmps/contact/general-contact.json'
import coolContact from '../template-cmps/contact/cool-contact.json'

// Section
import cosmeticArticlesSection from '../template-cmps/sections/cosmetic-articles-section.json'
import natureArticlesSection from '../template-cmps/sections/nature-articles-section.json'
import shopifyPricingSection from '../template-cmps/sections/shopify-pricing-section.json'
import startupNumSection from '../template-cmps/sections/startup-num-section.json'
import portfolioReviewSection from '../template-cmps/sections/portfolio-review-section.json'
import shopifySection from '../template-cmps/sections/shopify-section.json'
import headphoneSection from '../template-cmps/sections/headphones-section.json'
import headphoneSection2 from '../template-cmps/sections/headphones-section-2.json'
import carSection from '../template-cmps/sections/car-section.json'
import designerServices from '../template-cmps/sections/designer-services.json'
import designerVideo from '../template-cmps/sections/designer-video-section.json'
import foodySection from '../template-cmps/sections/foody-section.json'
import foodySection2 from '../template-cmps/sections/foody-section-2.json'
import foodyTeam from '../template-cmps/sections/foody-team.json'
import foodyFeatures from '../template-cmps/sections/foody-features.json'
import startupSolutions from '../template-cmps/sections/startup-solutions.json'
import realEstateSection from '../template-cmps/sections/real-estate-section.json'

// Social
import designerSocial from '../template-cmps/social/designer-social.json'
import foodySocial from '../template-cmps/social/foody-social.json'
import startupSocial from '../template-cmps/social/startup-social.json'
import realEstateSocial from '../template-cmps/social/real-estate-social.json'

// Schedule
import scheduleOne from '../template-cmps/schedule/schedule-one.json'
import foodySchedule from '../template-cmps/schedule/foody-schedule.json'

// Form
import formOne from '../template-cmps/form/form-one.json'
import formTwo from '../template-cmps/form/form-two.json'
import formThree from '../template-cmps/form/form-three.json'

// Testimonial
import foodyTestimonial from '../template-cmps/testimonials/foody-testimonial.json'
import carTestimonial from '../template-cmps/testimonials/car-testimonial.json'
import startupTestimonials from '../template-cmps/testimonials/startup-testimonials.json'
import realEstateTestimonial from '../template-cmps/testimonials/real-estate-testimonials.json'

// Footer
import headphoneFooter from '../template-cmps/footers/headphone-footer.json'
import designerFooter from '../template-cmps/footers/designer-footer.json'
import foodyFooter from '../template-cmps/footers/foody-footer.json'
import realEstateFooter from '../template-cmps/footers/real-estate-footer.json'

import carFooter from '../template-cmps/footers/car-footer.json'

import startupFooter from '../template-cmps/footers/startup-footer.json'

// Chat
import simpleChat from '../template-cmps/chat/simple-chat.json'

// ! Data for cmp modules

export const cmpModules = [
  {
    name: 'Testimonial',
    category: 'testimonial',

    cmps: [startupTestimonials, realEstateTestimonial, foodyTestimonial, carTestimonial],
  },
  {
    name: 'Map',
    category: 'map',
    cmps: [carMap, foodyMap],
  },
  {
    name: 'Navigation',
    category: 'navigation',
    cmps: [
      startUpNav,
      shopifyNav,
      carNav,
      headphonesNav,
      foodyNav,
      designerNav,
      realEstateNav,
      cosmeticNav,
    ],
  },
  {
    name: 'Hero',
    category: 'hero',
    cmps: [
      startupHero,
      designerHero,
      foodyHero,
      headphonesHero,
      natureHero,
      carHero,
      cosmeticHero,
      realEstateHero,
      shopifyHero,
    ],
  },
  {
    name: 'Footer',
    category: 'footer',

    cmps: [
      headphoneFooter,
      designerFooter,
      foodyFooter,
      startupFooter,
      realEstateFooter,
      carFooter,
    ],
  },
  {
    name: 'Form',
    category: 'form',
    cmps: [formOne, formTwo, formThree],
  },
  {
    name: 'Social',
    category: 'social',
    cmps: [startupSocial, designerSocial, foodySocial, realEstateSocial],
  },
  {
    name: 'Section',
    category: 'section',
    cmps: [
      headphoneSection,
      startupSolutions,
      shopifyPricingSection,
      foodyTeam,
      designerServices,
      natureArticlesSection,
      startupNumSection,
      shopifySection,
      foodySection,
      headphoneSection2,
      carSection,
      foodySection2,
      designerVideo,
      cosmeticArticlesSection,
      portfolioReviewSection,
      foodyFeatures,
      realEstateSection,
    ],
  },
  {
    name: 'Gallery',
    category: 'gallery',
    cmps: [
      carouselOne,
      realEstateGallery,
      designerGallery,
      foodyMenu,
      carSection2,
      headphoneGallery,
      startupLogos,
    ],
  },
  {
    name: 'Contact',
    category: 'contact',
    cmps: [designerContact, generalContact, coolContact, realEstateSocial],
  },
  {
    name: 'Schedule',
    category: 'schedule',
    cmps: [scheduleOne, foodySchedule],
  },
  {
    name: 'Chat',
    category: 'chat',
    cmps: [simpleChat],
  },
]
