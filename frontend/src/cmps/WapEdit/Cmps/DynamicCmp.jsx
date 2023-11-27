import { BtnCmp } from './BtnCmp'
import { ImgCmp } from './ImgCmp'
import { MapCmp } from './MapCmp'
import { MobileMenuCmp } from './mobileMenuCmp'
import { TxtCmp } from './TxtCmp'
import { FormCmp } from './FormCmp'
import { IconCmp } from './IconCmp'
import { LinkCmp } from './LinkCmp'
import { InputCmp } from './InputCmp'
import { TitleCmp } from './TitleCmp'
import { VideoCmp } from './VideoCmp'
import { CarouselCmp } from './CarouselCmp'
import { ScheduleCmp } from './ScheduleCmp'
import { ContainerCmp } from './ContainerCmp'
import { ChatCmp } from './ChatCmp'

export function DynamicCmp(props) {
  const { cmp } = props

  switch (cmp.type) {
    case 'btn':
      return <BtnCmp {...props} />
    case 'img':
      return <ImgCmp {...props} />
    case 'chat':
      return <ChatCmp {...props} />
    case 'input':
      return <InputCmp {...props} />
    case 'txt':
      return <TxtCmp {...props} />
    case 'map':
      return <MapCmp {...props} />
    case 'mobile menu':
      return <MobileMenuCmp {...props} />
    case 'form':
      return <FormCmp {...props} />
    case 'icon':
      return <IconCmp {...props} />
    case 'link':
      return <LinkCmp {...props} />
    case 'video':
      return <VideoCmp {...props} />
    case 'title':
      return <TitleCmp {...props} />
    case 'carousel':
      return <CarouselCmp {...props} />
    case 'schedule':
      return <ScheduleCmp {...props} />
    case 'container':
      return <ContainerCmp {...props} />
    default:
      return
  }
}
