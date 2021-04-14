/* eslint-disable no-param-reassign */
/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function getRandomInt(min=1, max=999999) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
