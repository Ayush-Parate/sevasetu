/**
 * Re-export auth middlewares so both
 *   require('../../middlewares/auth')           <- used by all route files
 *   require('../../middlewares/auth.middleware') <- used elsewhere
 * resolve to the same implementations.
 */
module.exports = require("./auth.middleware");
