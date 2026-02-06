const {
  Gender,
  TopsShape,
  BeardShape,
  WidgetType,
} = require('./enums');
const { SETTINGS, AVATAR_LAYER, NONE } = require('./constants');

function pickRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function getRandomValue(arr, { avoid = [], usually = [] } = {}) {
  const avoidValues = (avoid || []).filter(Boolean);
  const filteredArr = arr.filter((item) => !avoidValues.includes(item));

  const usuallyValues = (usually || [])
    .filter(Boolean)
    .reduce((acc, cur) => acc.concat(new Array(15).fill(cur)), []);

  const finalArr = filteredArr.concat(usuallyValues);

  if (!finalArr.length) {
    return arr[pickRandomIndex(arr.length)];
  }

  return finalArr[pickRandomIndex(finalArr.length)];
}

function getRandomFillColor(colors = SETTINGS.commonColors) {
  return colors[pickRandomIndex(colors.length)];
}

function getRandomAvatarOption(presetOption = {}, useOption = {}) {
  const gender = getRandomValue(SETTINGS.gender);

  const beardList = [];
  let topList = [TopsShape.Danny, TopsShape.Wave, TopsShape.Pixie];

  if (gender === Gender.Male) {
    beardList.push(BeardShape.Scruff);
    topList = SETTINGS.topsShape.filter((shape) => !topList.includes(shape));
  }

  const beardShape = getRandomValue(beardList.length ? beardList : [NONE], {
    usually: [NONE],
  });

  const hairShape = getRandomValue(topList, {
    avoid: [useOption?.widgets?.tops?.shape],
  });
  const hairColor = getRandomFillColor();

  return {
    gender,
    wrapperShape:
      presetOption?.wrapperShape ||
      getRandomValue(SETTINGS.wrapperShape, {
        avoid: [useOption?.wrapperShape],
      }),
    background: {
      color: getRandomValue(SETTINGS.backgroundColor, {
        avoid: [
          useOption?.background?.color,
          (hairShape === TopsShape.Punk || hairShape === TopsShape.Fonze) &&
            hairColor,
        ],
      }),
      borderColor: getRandomValue(SETTINGS.borderColor, {
        avoid: [useOption?.background?.color],
        usually: [NONE],
      }),
    },
    widgets: {
      [WidgetType.Face]: {
        shape: getRandomValue(SETTINGS.faceShape),
        fillColor: getRandomValue(SETTINGS.skinColors),
      },
      [WidgetType.Tops]: {
        shape: hairShape,
        fillColor: hairColor,
      },
      [WidgetType.Ear]: {
        shape: getRandomValue(SETTINGS.earShape, {
          avoid: [useOption?.widgets?.ear?.shape],
        }),
      },
      [WidgetType.Earrings]: {
        shape: getRandomValue(SETTINGS.earringsShape, {
          usually: [NONE],
        }),
      },
      [WidgetType.Eyebrows]: {
        shape: getRandomValue(SETTINGS.eyebrowsShape, {
          avoid: [useOption?.widgets?.eyebrows?.shape],
        }),
      },
      [WidgetType.Eyes]: {
        shape: getRandomValue(SETTINGS.eyesShape, {
          avoid: [useOption?.widgets?.eyes?.shape],
        }),
      },
      [WidgetType.Nose]: {
        shape: getRandomValue(SETTINGS.noseShape, {
          avoid: [useOption?.widgets?.nose?.shape],
        }),
      },
      [WidgetType.Glasses]: {
        shape: getRandomValue(SETTINGS.glassesShape, {
          usually: [NONE],
        }),
      },
      [WidgetType.Mouth]: {
        shape: getRandomValue(SETTINGS.mouthShape, {
          avoid: [useOption?.widgets?.mouth?.shape],
        }),
      },
      [WidgetType.Beard]: {
        shape: beardShape,
        ...(beardShape === BeardShape.Scruff
          ? { zIndex: AVATAR_LAYER[WidgetType.Mouth].zIndex - 1 }
          : {}),
      },
      [WidgetType.Clothes]: {
        shape: getRandomValue(SETTINGS.clothesShape, {
          avoid: [useOption?.widgets?.clothes?.shape],
        }),
        fillColor: getRandomFillColor(),
      },
    },
  };
}

module.exports = {
  getRandomAvatarOption,
  getRandomFillColor,
  getRandomValue,
};
