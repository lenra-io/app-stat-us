'use strict'
// Views

module.exports = async () => {
  return {
    views: require('./views/all'),
    listeners: require('./listeners/all'),
    rootView: 'main'
  }
}