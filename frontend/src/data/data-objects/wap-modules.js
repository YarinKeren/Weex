// Hero
import cosmeticHero from '../template-cmps/heros/cosmetic-hero.json'
import natureHero from '../template-cmps/heros/nature-hero.json'
import shopifyHero from '../template-cmps/heros/shopify-hero.json'
import headphonesHero from '../template-cmps/heros/headphones-hero.json'
import carHero from '../template-cmps/heros/car-hero.json'
import designerHero from '../template-cmps/heros/designer-hero.json'


// Navigation
import cosmeticNav from '../template-cmps/navigations/cosmetic-nav.json'
import shopifyNav from '../template-cmps/navigations/shopify-nav.json'
import headphonesNav from '../template-cmps/navigations/headphones-nav.json'
import carNav from '../template-cmps/navigations/car-nav.json'
import desinerNav from '../template-cmps/navigations/designer-nav.json'

// Section
import cosmeticArticlesSection from '../template-cmps/sections/cosmetic-articles-section.json'
import natureArticlesSection from '../template-cmps/sections/nature-articles-section.json'
import shopifyPricingSection from '../template-cmps/sections/shopify-pricing-section.json'
import portfolioSection from '../template-cmps/sections/portfolio-section.json'
import portfolioReviewSection from '../template-cmps/sections/portfolio-review-section.json'
import shopifySection from '../template-cmps/sections/shopify-section.json'
import headphonesSection from '../template-cmps/sections/headphones-section.json'
import headphoneSection2 from '../template-cmps/sections/headphones-section-2.json'
import carSection from '../template-cmps/sections/car-section.json'
import designerVideoSection from '../template-cmps/sections/designer-video-section.json'
import carMap from '../template-cmps/map/car-map.json'

// Social
import designerSocial from '../template-cmps/social/designer-social.json'

//Testimonial 
import carTestimonial from '../template-cmps/testimonials/car-testimonial.json'

// Gallery
import designerGallery from '../template-cmps/gallery/designer-gallery.json'
import carouselOne from '../template-cmps/gallery/carousel-one.json'
import carSection2 from '../template-cmps/gallery/car-section-2.json'
import headphonesGallery from '../template-cmps/gallery/headphones-gallery.json'

// Contact
import designerContact from '../template-cmps/contact/designer-contact.json'

// Form
import formOne from '../template-cmps/form/form-one.json'
import formTwo from '../template-cmps/form/form-two.json'
import formThree from '../template-cmps/form/form-three.json'

// Schedule
import scheduleOne from '../template-cmps/schedule/schedule-one.json'

// Footer
import headphoneFooter from '../template-cmps/footers/headphone-footer.json'
import designerFooter from '../template-cmps/footers/designer-footer.json'
import carFooter from '../template-cmps/footers/car-footer.json'

// ! Data for wap Modules

export const wapModules = [
  {
    _id: '',
    name: 'Soundbeam',
    description: 'E-Commerce',
    originalTheme: 'wap-3-theme',
    theme: 'wap-3-theme',
    imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504587/soundbeam_ahquqc.jpg',
    mobileImgUrl:
      'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698524705/headphonesmobile_1_zokai9.png',
    cmps: [headphonesNav, headphonesHero, headphonesSection, headphonesGallery, headphoneSection2, headphoneFooter],
    owner: '',
    isPublished: false,
  },
  {
    _id: '',
    name: 'Car Specialist',
    description: 'Landing Page',
    originalTheme: 'wap-5-theme',
    theme: 'wap-5-theme',
    imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698505373/carspecial_yz2qhn.jpg',
    mobileImgUrl:
      'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698524535/carmobile_du9jga.png',
    cmps: [carNav, carHero, carSection, carSection2, carTestimonial, carMap, carFooter],
    owner: '',
    isPublished: false,
  },
  {
    _id: '',
    name: 'Deltify',
    description: 'E-Commerce',
    originalTheme: 'wap-1-theme',
    theme: 'wap-1-theme',
    imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504587/deltify_k23xlj.jpg',
    mobileImgUrl:
      'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698524920/deltify_1_erqouo.png',
    cmps: [shopifyNav, shopifyHero, shopifySection, shopifyPricingSection, carouselOne],
    owner: '',
    isPublished: false,
  },
  {
    _id: '',
    name: 'Nature',
    description: 'Landing Page',
    originalTheme: 'wap-2-theme',
    theme: 'wap-2-theme',
    imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504587/nature_tv7swr.jpg',
    mobileImgUrl:
      'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698525083/nature_1_fdspgu.png',
    cmps: [natureHero, natureArticlesSection, formThree],
    owner: '',
    isPublished: false,
  },
  {
    _id: '',
    name: 'Cosmetics',
    description: 'Landing Page',
    originalTheme: 'wap-4-theme',
    theme: 'wap-4-theme',
    imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504587/cosm_el0mwn.jpg',
    mobileImgUrl:
      'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698525352/cosmetics_1_ll2psm.png',
    cmps: [cosmeticNav, cosmeticHero, cosmeticArticlesSection, formTwo],
    owner: '',
    isPublished: false,
  },
  {
    _id: '',
    name: 'Portfolio',
    description: 'Personal Website',
    originalTheme: 'wap-6-theme',
    theme: 'wap-6-theme',
    imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698504587/portf_helhlv.jpg',
    mobileImgUrl:
      'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698525273/portfolio_1_kujhnd.png',
    cmps: [portfolioSection, portfolioReviewSection],
    owner: '',
    isPublished: false,
  },
  {
    _id: '',
    name: 'web designer',
    description: 'Personal Website',
    originalTheme: 'wap-7-theme',
    theme: 'wap-7-theme',
    imgUrl:
      'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698797266/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-11-01_%D7%91-2.07.36_elkgvw.jpg',
    mobileImgUrl: '',
    cmps: [
      desinerNav,
      designerHero,
      designerSocial,
      designerVideoSection,
      designerGallery,
      scheduleOne,
      designerContact,
      formOne,
      designerFooter,
    ],
    owner: '',
    isPublished: false,
  },
]
