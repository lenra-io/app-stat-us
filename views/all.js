const navigationService = require('../services/navigationService.js');
const views = {
  main,
  app: require('./app'),
  ...require("./components/all.js"),
  ...require("./pages/all.js"),
};

module.exports = views;


function main() {
  return {
    type: "view",
    name: "app",
    coll: navigationService.collection,
    query: {
      "user": "@me"
    }
  };
}