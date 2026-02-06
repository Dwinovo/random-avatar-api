const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const { WidgetType, WrapperShape } = require('./enums');
const { AVATAR_LAYER, NONE } = require('./constants');

const DEFAULT_SIZE = 280;
const BORDER_WIDTH = 10;

const widgetCache = new Map();

async function loadWidgetSvg(widgetType, shape) {
  if (!shape || shape === NONE) {
    return '';
  }

  const key = `${widgetType}:${shape}`;
  if (widgetCache.has(key)) {
    return widgetCache.get(key);
  }

  const filePath = path.resolve(
    __dirname,
    'assets',
    'widgets',
    widgetType,
    `${shape}.svg`
  );

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    widgetCache.set(key, raw);
    return raw;
  } catch (error) {
    // If asset is missing we fail silently and skip the layer.
    return '';
  }
}

function stripSvgWrapper(svgRaw) {
  if (!svgRaw) {
    return '';
  }

  const start = svgRaw.indexOf('>');
  const end = svgRaw.lastIndexOf('</svg>');

  if (start === -1 || end === -1) {
    return svgRaw;
  }

  return svgRaw.slice(start + 1, end);
}

function resolveBackgroundFill(color) {
  if (!color || color === 'transparent') {
    return { fill: 'none', defs: '' };
  }

  const gradientMatch = color.match(/^linear-gradient\((.+)\)$/i);
  if (!gradientMatch) {
    return { fill: color, defs: '' };
  }

  const [, gradientBody] = gradientMatch;
  const parts = gradientBody.split(',').map((part) => part.trim());
  if (parts.length < 2) {
    return { fill: color, defs: '' };
  }

  const anglePart = parts.shift();
  const colors = parts;

  const angleMatch = anglePart.match(/(-?\d+(?:\.\d+)?)deg/);
  const angleDeg = angleMatch ? parseFloat(angleMatch[1]) : 0;
  const rad = ((angleDeg - 90) * Math.PI) / 180;

  const x = Math.cos(rad);
  const y = Math.sin(rad);

  const x1 = (0.5 - x / 2).toFixed(3);
  const y1 = (0.5 - y / 2).toFixed(3);
  const x2 = (0.5 + x / 2).toFixed(3);
  const y2 = (0.5 + y / 2).toFixed(3);

  const gradientId = `bg-${crypto.randomUUID()}`;
  const stops = colors
    .map((stopColor, index) => {
      const offset =
        colors.length === 1 ? 0 : (index / (colors.length - 1)) * 100;
      return `<stop offset="${offset}%" stop-color="${stopColor}" />`;
    })
    .join('');

  const defs = `<linearGradient id="${gradientId}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops}</linearGradient>`;

  return { fill: `url(#${gradientId})`, defs };
}

function buildBackground(wrapperShape = WrapperShape.Circle, background, size) {
  const { fill, defs } = resolveBackgroundFill(background?.color);
  const strokeColor =
    background?.borderColor && background.borderColor !== 'transparent'
      ? background.borderColor
      : 'none';

  const strokeWidth = strokeColor === 'none' ? 0 : BORDER_WIDTH;
  const inset = strokeWidth / 2;

  if (wrapperShape === WrapperShape.Circle) {
    const radius = size / 2 - inset;
    return {
      defs,
      element: `<circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${fill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`,
    };
  }

  const squircleRadius = 25;
  const rx = wrapperShape === WrapperShape.Squircle ? squircleRadius : 0;

  return {
    defs,
    element: `<rect x="${inset}" y="${inset}" width="${
      size - strokeWidth
    }" height="${size - strokeWidth}" rx="${rx}" ry="${rx}" fill="${fill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`,
  };
}

async function buildAvatarContent(option, size) {
  const entries = Object.entries(option.widgets || {});
  const sorted = entries.sort(([prevType, prev], [nextType, next]) => {
    const prevLayer = prev?.zIndex ?? AVATAR_LAYER[prevType]?.zIndex ?? 0;
    const nextLayer = next?.zIndex ?? AVATAR_LAYER[nextType]?.zIndex ?? 0;
    return prevLayer - nextLayer;
  });

  let skinColor;

  const parts = await Promise.all(
    sorted.map(async ([widgetType, widget]) => {
      const svgRaw = await loadWidgetSvg(widgetType, widget?.shape);
      if (!svgRaw) {
        return '';
      }

      let fillColor = widget?.fillColor || 'transparent';
      if (widgetType === WidgetType.Face) {
        skinColor = fillColor;
      }
      if (skinColor && widgetType === WidgetType.Ear) {
        fillColor = skinColor;
      }

      const inner = stripSvgWrapper(svgRaw).replaceAll(
        '$fillColor',
        fillColor
      );

      return `<g id="vue-color-avatar-${widgetType}">${inner}</g>`;
    })
  );

  const baseViewBox = DEFAULT_SIZE / 0.7;

  return `
    <svg x="0" y="0" width="${size}" height="${size}" viewBox="0 0 ${baseViewBox} ${baseViewBox}" preserveAspectRatio="xMidYMax meet">
      <g transform="translate(100, 65)">
        ${parts.join('')}
      </g>
    </svg>
  `;
}

async function buildAvatarSvg(option, size = DEFAULT_SIZE) {
  const finalSize =
    Number.isFinite(size) && size > 0 ? Math.min(Number(size), 1024) : DEFAULT_SIZE;

  const { defs, element } = buildBackground(
    option.wrapperShape,
    option.background,
    finalSize
  );

  const content = await buildAvatarContent(option, finalSize);

  const defsBlock = defs ? `<defs>${defs}</defs>` : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${finalSize}" height="${finalSize}" viewBox="0 0 ${finalSize} ${finalSize}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  ${defsBlock}
  ${element}
  ${content}
</svg>`;
}

module.exports = {
  buildAvatarSvg,
  DEFAULT_SIZE,
};
