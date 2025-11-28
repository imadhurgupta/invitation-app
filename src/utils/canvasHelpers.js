import { v4 as uuidv4 } from 'uuid';

export const createRect = (fabric) => {
  return new fabric.Rect({
    id: uuidv4(),
    left: 100,
    top: 100,
    fill: '#e3e3e3',
    width: 100,
    height: 100,
    rx: 8,
    ry: 8,
    objectCaching: false,
  });
};

export const createText = (fabric, textContent = 'Edit Me') => {
  return new fabric.IText(textContent, {
    id: uuidv4(),
    left: 50,
    top: 50,
    fontFamily: 'Inter',
    fill: '#1e293b',
    fontSize: 24,
    objectCaching: false,
  });
};