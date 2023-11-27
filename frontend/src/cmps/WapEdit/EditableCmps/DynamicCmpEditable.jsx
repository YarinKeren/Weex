import { BtnCmpEditable } from './BtnCmpEditable'
import { ImgCmpEditable } from './ImgCmpEditable'
import { MapCmpEditable } from './MapCmpEditable'
import { MobileMenuCmpEditable } from './MobileMenuCmpEditable'
import { TxtCmpEditable } from './TxtCmpEditable'
import { ChatCmpEditable } from './ChatCmpEditable'
import { FormCmpEditable } from './FormCmpEditable'
import { IconCmpEditable } from './IconCmpEditable'
import { LinkCmpEditable } from './LinkCmpEditable'
import { InputCmpEditable } from './InputCmpEditable'
import { TitleCmpEditable } from './TitleCmpEditable'
import { VideoCmpEditable } from './VideoCmpEditable'
import { CarouselCmpEditable } from './CarouselCmpEditable'
import { ScheduleCmpEditable } from './ScheduleCmpEditable'
import { ContainerCmpEditable } from './ContainerCmpEditable'

export function DynamicCmpEditable(props) {
  const { cmp } = props

  switch (cmp.type) {
    case 'map':
      return <MapCmpEditable {...props} />
    case 'mobile menu':
      return <MobileMenuCmpEditable {...props} />
    case 'txt':
      return <TxtCmpEditable {...props} />
    case 'btn':
      return <BtnCmpEditable {...props} />
    case 'img':
      return <ImgCmpEditable {...props} />
    case 'form':
      return <FormCmpEditable {...props} />
    case 'icon':
      return <IconCmpEditable {...props} />
    case 'link':
      return <LinkCmpEditable {...props} />
    case 'chat':
      return <ChatCmpEditable {...props} />
    case 'title':
      return <TitleCmpEditable {...props} />
    case 'video':
      return <VideoCmpEditable {...props} />
    case 'input':
      return <InputCmpEditable {...props} />
    case 'schedule':
      return <ScheduleCmpEditable {...props} />
    case 'carousel':
      return <CarouselCmpEditable {...props} />
    case 'container':
      return <ContainerCmpEditable {...props} />

    default:
      return null
  }
}
