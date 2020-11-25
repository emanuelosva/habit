/**
 * @fileoverview DB utilites.
 */

/**
 * Convert a snake_case string to camelCase
 * @param {string} snake - the snake case string
 */
exports.convertToCamel = (snake) => {
  return String(snake).split('_').map((str, index) => {
    if (index !== 0) return str.charAt(0).toUpperCase() + str.slice(1)
    return str
  }).join('')
}

/**
 * Convert a camelCase string to snake_case
 * @param {string} camel - the camle case string
 */
exports.convertToSnakeCase = (camel) => {
  return camel.replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((str) => str.toLocaleLowerCase())
    .join('_')
}
