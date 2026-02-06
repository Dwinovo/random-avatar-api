// Enumerations replicated from the original Vue project so backend logic can
// reuse the same identifiers without importing TypeScript code.

const WidgetType = Object.freeze({
  Face: 'face',
  Tops: 'tops',
  Ear: 'ear',
  Earrings: 'earrings',
  Eyebrows: 'eyebrows',
  Eyes: 'eyes',
  Nose: 'nose',
  Glasses: 'glasses',
  Mouth: 'mouth',
  Beard: 'beard',
  Clothes: 'clothes',
});

const WrapperShape = Object.freeze({
  Circle: 'circle',
  Square: 'square',
  Squircle: 'squircle',
});

const Gender = Object.freeze({
  Male: 'male',
  Female: 'female',
  NotSet: 'notSet',
});

const FaceShape = Object.freeze({
  Base: 'base',
});

const TopsShape = Object.freeze({
  Fonze: 'fonze',
  Funny: 'funny',
  Clean: 'clean',
  Punk: 'punk',
  Danny: 'danny',
  Wave: 'wave',
  Turban: 'turban',
  Pixie: 'pixie',
  Beanie: 'beanie',
});

const EarShape = Object.freeze({
  Attached: 'attached',
  Detached: 'detached',
});

const EarringsShape = Object.freeze({
  Hoop: 'hoop',
  Stud: 'stud',
  None: 'none',
});

const EyebrowsShape = Object.freeze({
  Up: 'up',
  Down: 'down',
  Eyelashesup: 'eyelashesup',
  Eyelashesdown: 'eyelashesdown',
});

const EyesShape = Object.freeze({
  Ellipse: 'ellipse',
  Smiling: 'smiling',
  Eyeshadow: 'eyeshadow',
  Round: 'round',
});

const NoseShape = Object.freeze({
  Curve: 'curve',
  Round: 'round',
  Pointed: 'pointed',
});

const MouthShape = Object.freeze({
  Frown: 'frown',
  Laughing: 'laughing',
  Nervous: 'nervous',
  Pucker: 'pucker',
  Sad: 'sad',
  Smile: 'smile',
  Smirk: 'smirk',
  Surprised: 'surprised',
});

const BeardShape = Object.freeze({
  Scruff: 'scruff',
  None: 'none',
});

const GlassesShape = Object.freeze({
  Round: 'round',
  Square: 'square',
  None: 'none',
});

const ClothesShape = Object.freeze({
  Crew: 'crew',
  Collared: 'collared',
  Open: 'open',
});

module.exports = {
  WidgetType,
  WrapperShape,
  Gender,
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
};
