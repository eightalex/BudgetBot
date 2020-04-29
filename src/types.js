/**
 * @typedef {object} WebHookMonoType
 * @property {string} type
 * @property {string} data.account
 * @property {StatementItemType} data.statementItem
 */

/**
 * @typedef {object} StatementItemType
 * @property {string} id
 * @property {number} time
 * @property {string} description
 * @property {number} mcc
 * @property {number} amount
 * @property {number} operationAmount
 * @property {number} currencyCode
 * @property {number} commissionRate
 * @property {number} cashbackAmount
 * @property {number} balance
 * @property {boolean} hold
 */
