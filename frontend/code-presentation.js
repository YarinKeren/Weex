// רֵקוּרְסִיָּה - היא תופעה שכל מופע שלה מכיל מופע נוסף שלה, כך שהיא מתרחשת ומשתקפת בשלמותה בתוך עצמה שוב ושוב.

// Recursive search in wap for cmp with given id

function replaceCmpInWap(updatedCmp, { cmps }) {
  if (!cmps) return
  const cmpIndex = cmps.findIndex(childCmp => childCmp._id === updatedCmp._id)
  if (cmpIndex !== -1) cmps.splice(cmpIndex, 1, updatedCmp)
  else cmps.forEach(childCmp => replaceCmpInWap(updatedCmp, childCmp))
}

// Nested rendering of cmps

export function ContainerCmp({ cmp }) {
  const { style, className, cmps } = cmp

  return (
    <div style={style} className={className}>
      {cmps.map(nestedCmp => (
        <DynamicCmp cmp={nestedCmp} key={nestedCmp._id} />
      ))}
    </div>
  )
}

//Button cmp rendering

export function BtnCmp({ cmp }) {
  const { style, className, info } = cmp

  return (
    <button href={info.href} className={className} style={style}>
      {info.txt}
    </button>
  )
}

//Dynamic rendering of cmps

export function DynamicCmp(props) {
  const { cmp } = props

  switch (cmp.type) {
    case 'btn':
      return <BtnCmp {...props} />
    case 'img':
      return <ImgCmp {...props} />
    case 'input':
      return <InputCmp {...props} />
    case 'txt':
      return <TxtCmp {...props} />
    case 'map':
      return <MapCmp {...props} />
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

// Data model

const dataModel = {
  name: 'Car Specialist',
  description: 'Landing Page',
  theme: 'wap-5-theme',
  originalTheme: 'wap-5-theme',
  imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698505373/carspecial_yz2qhn.jpg',
  mobileImgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698524535/carmobile_du9jga.png',
  owner: {
    _id: '6547ca0ec90ea308d8073df7',
    fullname: 'Admin',
    email: 'admin',
    password: 'admin',
    imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
  },
  isPublished: false,
  cmps: [
    {
      _id: '1y284har8089f89sdnin',
      type: 'container',
      name: 'simple-chat',
      theme: 'chat-5-theme',
      imgUrl: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1674689963/chat-cmp_hcvevc.png',
      className: 'simple-chat-container',
      style: {},
      cmps: [
        {
          _id: 'sUpErDuPeRmshdjafui11',
          type: 'chat',
          style: {},
          className: 'simple-chat-class',
          cmps: [
            {
              _id: 'fsdf43yhhjgf879i76jgh3g45g5h',
              type: 'btn',
              name: 'open-chat',
              info: {
                txt: 'Chat',
              },
              style: {},
              className: 'open-chat-btn',
            },
            {
              _id: '832r7fbsdf78dfvt23cvsdf',
              type: 'img',
              name: 'chat-icon',
              info: {
                url: 'https://res.cloudinary.com/yaronshapira-com/image/upload/v1674600456/man_1_arrdyn.png',
              },
              style: {},
              className: 'chat-icon',
            },
            {
              _id: 'gdjkhsfs7sd6r3453g278bf843gbf78fbf7843h78f',
              type: 'title',
              name: 'chat-title',
              info: {
                txt: 'Support',
              },
              style: {},
              className: 'chat-title',
            },
            {
              _id: 'ghfjdgfdhgd99y4bgih43gdfg43',
              type: 'input',
              name: 'chat-input',
              info: {
                placeholder: 'Type your message here...',
              },
              style: {},
              className: 'chat-input',
            },
          ],
        },
      ],
    },
    {
      _id: 'R8T9Y7U5I6',
      type: 'container',
      name: 'car-nav',
      theme: 'wap-5-theme',
      imgUrl: '',
      className: 'car-nav',
      style: {},
      createdBy: {
        _id: 'H5G6F4D3S2',
        fullname: '',
        imgUrl: '',
      },
      cmps: [
        {
          type: 'link',
          _id: 'Z2X3C4V5B6',
          info: { txt: 'HOME', href: '#home' },
          style: {},
          className: 'car-nav-link1',
        },
        {
          type: 'link',
          _id: 'Q1W2E3R4T5',
          info: { txt: 'SERVICES', href: '#about' },
          style: {},
          className: 'car-nav-link2',
        },
        {
          type: 'link',
          _id: 'L0K9J8H7G6',
          info: { txt: 'ABOUT US', href: '#services' },
          style: {},
          className: 'car-nav-link3',
        },
        {
          type: 'link',
          _id: 'M5N4B3V2C1',
          info: { txt: 'CONTACT', href: '#contact' },
          style: {},
          className: 'car-nav-link4',
        },
      ],
    },
    {
      _id: 'M1V2T3K4J5',
      type: 'container',
      name: 'car-hero',
      theme: 'wap-5-theme',
      imgUrl: '',
      className: 'car-hero',
      style: {},
      createdBy: {
        _id: 'E2S3R4T5G6',
        fullname: '',
        imgUrl: '',
      },
      cmps: [
        {
          type: 'container',
          _id: 'U6N5O4P3L2',
          style: {},
          className: 'car-hero-div-1',
          cmps: [
            {
              type: 'txt',
              _id: 'F3W2Q1Z0X9',
              info: { txt: 'JADE & ANDY' },
              style: {},
              className: 'car-hero-div-txt1',
            },
            {
              type: 'txt',
              _id: 'B2C3D4E5F6',
              info: { txt: 'VINTAGE CAR SPECIALIST' },
              style: {},
              className: 'car-hero-div-txt2',
            },
          ],
        },
        {
          type: 'container',
          _id: 'I7Y6K5M4N3',
          style: {},
          className: 'car-hero-div-2',
          cmps: [
            {
              type: 'img',
              _id: 'O1P2A3S4D5',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698501983/ua81ugbj1owgoodbjuvc.png',
              },
              style: {},
              className: 'car-hero-div-2-img1',
            },
            {
              type: 'img',
              _id: 'G5F4R3T2Y1',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698501790/elscz6zacrmj4o7896nd.png',
              },
              style: {},
              className: 'car-hero-div-2-img2',
            },
            {
              type: 'img',
              _id: 'L9K8H7J6V5',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698501790/xineghuu8ft0rnexs9n5.png',
              },
              style: {},
              className: 'car-hero-div-2-img3',
            },
          ],
        },
      ],
    },
    {
      _id: 'H8jZ3Q',
      type: 'container',
      name: 'car-section',
      theme: 'wap-5-theme',
      imgUrl: '',
      className: 'car-section',
      style: {},
      createdBy: {
        _id: 'Z5tL1m',
        fullname: '',
        imgUrl: '',
      },
      cmps: [
        {
          type: 'title',
          _id: 'W1pV7d',
          info: { txt: 'SERVICES' },
          style: {},
          className: 'car-section-title',
        },
        {
          type: 'container',
          _id: 'N4hX2s',
          style: {},
          className: 'car-section-div1',
          cmps: [
            {
              type: 'img',
              _id: 'O2rK9b',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698593574/dvluijmgpyssvx1imbzz.png',
              },
              style: {},
              className: 'car-section-div-img1',
            },
            {
              type: 'title',
              _id: 'T6yG0l',
              info: { txt: 'REPAIR' },
              style: {},
              className: 'car-section-div-title1',
            },
            {
              type: 'txt',
              _id: 'E3vB5c',
              info: {
                txt: 'General Repairs, Specialist Repairs & Vintage Parts from the very best companies.',
              },
              style: {},
              className: 'car-section-div-txt1',
            },
          ],
        },
        {
          type: 'container',
          _id: 'I7wF4z',
          style: {},
          className: 'car-section-div2',
          cmps: [
            {
              type: 'img',
              _id: 'P8qA6x',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698596188/exur9ntdrsif1wh4frae.png',
              },
              style: {},
              className: 'car-section-div-img2',
            },
            {
              type: 'title',
              _id: 'U9sH1k',
              info: { txt: 'UPHOLSTERY' },
              style: {},
              className: 'car-section-div-title2',
            },
            {
              type: 'txt',
              _id: 'D2tM3y',
              info: {
                txt: 'A Range of Fabrics, Including Vintage Leathers, & Wide Variety of Colors',
              },
              style: {},
              className: 'car-section-div-txt2',
            },
          ],
        },
        {
          type: 'container',
          _id: 'F5nJ8u',
          style: {},
          className: 'car-section-div3',
          cmps: [
            {
              type: 'img',
              _id: 'G4oL2v',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698593574/msxpda86wblkmz0odzzs.png',
              },
              style: {},
              className: 'car-section-div-img3',
            },
            {
              type: 'title',
              _id: 'Y1bW9e',
              info: { txt: 'PAINTWORK' },
              style: {},
              className: 'car-section-div-title3',
            },
            {
              type: 'txt',
              _id: 'R0cQ6a',
              info: { txt: 'Spray paint, Custom Stencilling & Variety of Custom Made Artwork' },
              style: {},
              className: 'car-section-div-txt3',
            },
          ],
        },
      ],
    },
    {
      _id: 'VTs31L',
      type: 'container',
      name: 'car-section-2',
      theme: '',
      imgUrl: '',
      className: 'car-section-2',
      style: {},
      createdBy: {
        _id: '',
        fullname: '',
        imgUrl: '',
      },
      cmps: [
        {
          type: 'title',
          _id: 'car-section-2-title',
          info: { txt: 'OUR WORK' },
          style: {},
          className: 'car-section-2-title',
        },
        {
          type: 'txt',
          _id: 'car-section-2-txt1',
          info: {
            txt: "A collection of cars we've renovated with passion",
          },
          style: {},
          className: 'car-section-2-txt1',
        },
        {
          type: 'container',
          _id: 'car-section-2-div',
          style: {},
          className: 'car-section-2-div',
          cmps: [
            {
              type: 'img',
              _id: 'car-section-div-img1',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698673171/uztnomwgwxmluxc1ecwt.jpg',
              },
              style: {},
              className: 'car-section-div-img1',
            },
            {
              type: 'img',
              _id: 'car-section-div-img2',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698673171/metyucmqwe7umm3vejqj.jpg',
              },
              style: {},
              className: 'car-section-div-img2',
            },
            {
              type: 'img',
              _id: 'car-section-div-img3',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698673171/n42ylgmvq7dnbhs8pdft.jpg',
              },
              style: {},
              className: 'car-section-div-img3',
            },
            {
              type: 'img',
              _id: 'car-section-div-img4',
              info: {
                imgUrl: 'https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698673171/kislgw45sexsey42ihue.jpg',
              },
              style: {},
              className: 'car-section-div-img4',
            },
          ],
        },
      ],
    },
    {
      _id: 'BL2aT',
      type: 'container',
      name: 'car-map',
      theme: '',
      imgUrl: '',
      className: 'car-map',
      style: {},
      createdBy: {
        _id: '',
        fullname: '',
        imgUrl: '',
      },
      cmps: [
        {
          type: 'container',
          _id: 'ksadfh83',
          style: {},
          className: 'car-map-div',
          cmps: [
            {
              type: 'txt',
              _id: 'JFUBSD73',
              info: { txt: 'OUR STORE IN LONDON' },
              style: {},
              className: 'car-map-txt-1',
            },
            {
              type: 'txt',
              _id: 'ASD7423KL',
              info: { txt: 'Victoria Embarkment 75th' },
              style: {},
              className: 'car-map-txt-2',
            },
            {
              type: 'map',
              _id: 'DSASDFA21',
              className: 'car-map-container',
              info: {
                name: 'Sample Location',
                location: {
                  latitude: 51.510357,
                  longitude: -0.116773,
                },
                style: {},
              },
            },
          ],
        },
      ],
    },
  ],
}
