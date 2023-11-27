import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export function CarouselCmp({ cmp: { cmps } }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1030, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  }

  return (
    <Carousel
      infinite={true}
      autoPlay={true}
      // autoPlaySpeed={5000}
      // transitionDuration={5000}
      responsive={responsive}>
      {cmps.map((cmp) => (
        <img
          key={cmp._id}
          style={cmp.style}
          alt='carousel-img'
          src={cmp.info.imgUrl}
          className={cmp.className}
          onClick={(ev) => handleElClick(ev, cmp)}
        />
      ))}
    </Carousel>
  )
}
