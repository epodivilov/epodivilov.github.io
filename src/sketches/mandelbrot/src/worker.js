import { calcColor, calcIterations, createImageData, indexToCoordinate } from './utils';

const STEPS = [0, 0.2, 0.4, 0.6, 0.8, 1];
const PALETTE = [
  [89, 14, 34, 255],
  [12, 3, 68, 255],
  [52, 137, 218, 255],
  [255, 255, 255, 255],
  [255, 210, 47, 255],
  [174, 67, 13, 255],
];

onmessage = ({ data }) => {
  const { width, height, x, y, scale, max } = data;
  const ratio = height / width;

  const result = createImageData({ width, height }, (index) => {
    const point = indexToCoordinate(index, { scale, width, height, center: { x, y }, ratio });
    const iterations = calcIterations(point, max);

    return calcColor(iterations / max, STEPS, PALETTE, 0.7) || [0, 0, 0, 255];
  });

  postMessage(result);
};
