import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  const jwt = app.middleware.jwt({ app })
  router.get('/', controller.home.index)
  router.get('/captcha', controller.util.captcha)

  router.group({ name: 'user', prefix: '/user' }, router => {
    const { info, register, login, updateInfo } = controller.user

    router.post('/register', register)
    router.post('/login', login)

    router.get('/info', jwt, info)
    router.put('/info', jwt, updateInfo)
  })
}
