import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { useHover } from '../../../hooks/useHover'

export function CarouselCmpEditable({ cmp: { cmps }, activeCmpId, handleElClick }) {
  const { hoverHandlers, isHovered } = useHover()

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
    <Carousel infinite={true} autoPlay={true} autoPlaySpeed={2000} transitionDuration={500} responsive={responsive}>
      {cmps.map(cmp => (
        <img
          key={cmp._id}
          style={cmp.style}
          alt='carousel-img'
          {...hoverHandlers}
          src={cmp.info.imgUrl}
          onClick={ev => handleElClick(ev, cmp)}
          className={`${cmp.className} ${isHovered ? 'hover' : ''} ${
            activeCmpId === cmp._id ? 'active-cmp' : ''
          }`.trim()}
        />
      ))}
    </Carousel>
  )
}
