/**
 * @fileoverview DB utilites.
 */

/**
 * Convert a snake_case string to camelCase
 * @param {string} snake - the snake case string
 */
exports.convertToCamel = (snake) => {
  if (!snake) return undefined
  const snakeKeys = Object.keys(snake)
  const response = {}
  const toCamel = (snakeStr) => String(snakeStr).split('_').map((str, index) => {
    if (index !== 0) return str.charAt(0).toUpperCase() + str.slice(1)
    return str
  }).join('')
  snakeKeys.forEach((key) => {
    const camelKey = toCamel(key)
    response[camelKey] = snake[key]
  })
  return response
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

/**
 * Check if a query return a undefined valud
 * @param {any} entitie - The DB entitie
 */
exports.getOrUndefined = (entitie) => entitie === 'undefined' ? undefined : entitie
