const {
  WidgetType,
  WrapperShape,
  FaceShape,
  TopsShape,
  EarShape,
  EarringsShape,
  EyebrowsShape,
  EyesShape,
  NoseShape,
  MouthShape,
  BeardShape,
  GlassesShape,
  ClothesShape,
  Gender,
} = require('./enums');

const NONE = 'none';

const AVATAR_LAYER = Object.freeze({
  [WidgetType.Face]: { zIndex: 10 },
  [WidgetType.Ear]: { zIndex: 102 },
  [WidgetType.Earrings]: { zIndex: 103 },
  [WidgetType.Eyebrows]: { zIndex: 70 },
  [WidgetType.Eyes]: { zIndex: 50 },
  [WidgetType.Nose]: { zIndex: 60 },
  [WidgetType.Glasses]: { zIndex: 90 },
  [WidgetType.Mouth]: { zIndex: 100 },
  [WidgetType.Beard]: { zIndex: 105 },
  [WidgetType.Tops]: { zIndex: 80 },
  [WidgetType.Clothes]: { zIndex: 110 },
});

const COMMON_COLORS = [
  '#6BD9E9',
  '#FC909F',
  '#F4D150',
  '#E0DDFF',
  '#D2EFF3',
  '#FFEDEF',
  '#FFEBA4',
  '#506AF4',
  '#F48150',
  '#48A99A',
  '#C09FFF',
  '#FD6F5D',
];

const BACKGROUND_GRADIENTS = [
  'linear-gradient(45deg, #E3648C, #D97567)',
  'linear-gradient(62deg, #8EC5FC, #E0C3FC)',
  'linear-gradient(90deg, #ffecd2, #fcb69f)',
  'linear-gradient(120deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(-135deg, #fccb90, #d57eeb)',
];

const SETTINGS = Object.freeze({
  gender: [Gender.Male, Gender.Female],

  wrapperShape: Object.values(WrapperShape),
  faceShape: Object.values(FaceShape),
  topsShape: Object.values(TopsShape),
  earShape: Object.values(EarShape),
  earringsShape: Object.values(EarringsShape),
  eyebrowsShape: Object.values(EyebrowsShape),
  eyesShape: Object.values(EyesShape),
  noseShape: Object.values(NoseShape),
  glassesShape: Object.values(GlassesShape),
  mouthShape: Object.values(MouthShape),
  beardShape: Object.values(BeardShape),
  clothesShape: Object.values(ClothesShape),

  commonColors: COMMON_COLORS,
  skinColors: ['#F8D9CE', '#F9C9B6', '#DEB3A3', '#C89583', '#9C6458'],
  backgroundColor: [...COMMON_COLORS, ...BACKGROUND_GRADIENTS, 'transparent'],
  borderColor: [...COMMON_COLORS, 'transparent'],
});

module.exports = {
  AVATAR_LAYER,
  SETTINGS,
  NONE,
};
