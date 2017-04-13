const constants = require('../../../shared/serverapi-constants').constants

const routes = [
  router(constants.TASK, [
    post(constants.ADD, require('./task-add.handler'))
  ])
]

function item (type = '', route = '', handlers) {
  return {
    type,
    route: route.length > 0 ? constants.SEPARATOR + route : route,
    handlers
  }
}

function router (route, handlers) {
  return item(constants.ROUTER, route, handlers)
}

function post (route, module) {
  return item(constants.POST, route, [module.handler])
}

function run (server) {
  const api = []
  createRouter('', routes, true)

  function createRouter (fullPath, subItems, isRoot) {
    const router = server.createRouter(isRoot)
    if (Array.isArray(subItems)) {
      for (let subItem of subItems) {
        if (subItem.route && subItem.type) {
          api.push(fullPath + subItem.route + ' - ' + subItem.type)
          if (subItem.type === constants.ROUTER) {
            router.use(subItem.route, createRouter(fullPath + subItem.route, subItem.handlers))
          } else if (subItem.type === constants.POST) {
            router.post(subItem.route, ...subItem.handlers)
          }
        }
      }
    }
    return router
  }
  console.log('Server API: ', api)
}

module.exports.run = run
