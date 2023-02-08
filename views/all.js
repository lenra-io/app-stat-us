const { View } = require('@lenra/components');
const navigationService = require('../services/navigationService.js');
const views = {
  main,
  app: require('./app'),
  ...require("./components/all.js"),
  ...require("./pages/all.js"),
};

module.exports = views;


function main() {
  return View("app")
    .data(navigationService.collection, {
      "user": "@me"
    });
}