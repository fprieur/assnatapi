/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['router/index.js']) {
  _$jscoverage['router/index.js'] = [];
  _$jscoverage['router/index.js'][1] = 0;
  _$jscoverage['router/index.js'][7] = 0;
}
_$jscoverage['router/index.js'][1]++;
var bizRoutes = require("./business"), depRoutes = require("./deputies"), assRoutes = require("./assets"), intRoutes = require("./interventions");
_$jscoverage['router/index.js'][7]++;
module.exports = bizRoutes.concat(depRoutes.concat(assRoutes.concat(intRoutes)));
_$jscoverage['router/index.js'].source = ["var bizRoutes = require('./business'),","  depRoutes = require('./deputies'),","  assRoutes = require('./assets'),","  intRoutes = require('./interventions')","","// Combine all routes","module.exports = bizRoutes.concat(depRoutes.concat(assRoutes.concat(intRoutes)))"];
