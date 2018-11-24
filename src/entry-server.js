/* eslint-disable */
import createApp from './main'
import { INITIAL_BASE_ACTION } from '@/store/modules'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()
  store.dispatch(INITIAL_BASE_ACTION, context)
  router.push(context.url)
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) {
      return reject({ code: 404 })
    }
    Promise.all(matchedComponents.map(Component => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      context.state = store.state
      resolve(app)
    }).catch(reject)
  }, reject)
})