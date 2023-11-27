import { Fragment } from 'react'
import { MapInput } from './EditorInputs/MapInput'
import { ImgInput } from './EditorInputs/ImgInput'
import { EditSizes } from './EditorInputs/EditSizes'
import { IconInput } from './EditorInputs/IconInput'
import { LinkInput } from './EditorInputs/LinkInput'
import { TextInput } from './EditorInputs/TextInput'
import { VideoInput } from './EditorInputs/VideoInput'
import { ColorInput } from './EditorInputs/ColorInput'
import { MarginInput } from './EditorInputs/MarginInput'
import { BgColorInput } from './EditorInputs/BgColorInput'
import { PaddingInput } from './EditorInputs/PaddingInput'
import { FontSizeInput } from './EditorInputs/FontSizeInput'
import { BoxShadowInput } from './EditorInputs/BoxShadowInput'
import { FontFamilyInput } from './EditorInputs/FontFamilyInput'
import { BorderColorInput } from './EditorInputs/BorderColorInput'
import { PlaceholderInput } from './EditorInputs/PlaceholderInput'
import { TextOptionsInput } from './EditorInputs/TextOptionsInput'
import { BorderRadiusInput } from './EditorInputs/BorderRadiusInput'
import { ScheduleInput } from './EditorInputs/ScheduleInput'

const editorInputCmps = {
  btn: {
    General: [TextOptionsInput, TextInput, BorderRadiusInput, FontSizeInput, FontFamilyInput, BoxShadowInput],
    Appearance: [ColorInput, BgColorInput, BorderColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  title: {
    General: [TextOptionsInput, TextInput, BorderRadiusInput, FontSizeInput, FontFamilyInput, BoxShadowInput],
    Appearance: [ColorInput, BgColorInput, BorderColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  txt: {
    General: [TextOptionsInput, TextInput, BorderRadiusInput, FontSizeInput, FontFamilyInput, BoxShadowInput],
    Appearance: [ColorInput, BgColorInput, BorderColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  img: {
    General: [ImgInput],
    Appearance: [BorderColorInput, BoxShadowInput, BorderRadiusInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  link: {
    General: [
      LinkInput,
      TextOptionsInput,
      TextInput,
      BorderRadiusInput,
      FontSizeInput,
      FontFamilyInput,
      BoxShadowInput,
    ],
    Appearance: [ColorInput, BgColorInput, BorderColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  map: {
    General: [MapInput],
    Appearance: [BorderColorInput, BoxShadowInput, BorderRadiusInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  icon: {
    General: [IconInput, BorderRadiusInput, FontSizeInput, BoxShadowInput],
    Appearance: [ColorInput, BgColorInput, BorderColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  video: {
    General: [VideoInput],
    Appearance: [BorderColorInput, BoxShadowInput, BorderRadiusInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  input: {
    General: [PlaceholderInput, BorderRadiusInput, FontSizeInput, FontFamilyInput, BoxShadowInput],
    Appearance: [ColorInput, BgColorInput, BorderColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  container: {
    General: [BorderRadiusInput, BoxShadowInput],
    Appearance: [BgColorInput, BorderColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
  schedule: {
    General: [ScheduleInput],
    Appearance: [BgColorInput],
    Layout: [EditSizes, PaddingInput, MarginInput],
  },
}

export function DynamicInputs(props) {
  const { cmp, currTab } = props
  const cmpsToRender = editorInputCmps[cmp.type]?.[currTab] || []

  return (
    <Fragment>
      {cmpsToRender.map((Component, idx) => (
        <Component {...props} key={`input-${Component.name}-${idx}`} />
      ))}
    </Fragment>
  )
}
