const jwt = require('jsonwebtoken')
import HttpStatus from '../utils/HttpStatus'

module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        code: HttpStatus.USER_NOT_LOGIN,
        message: 'User not login',
      }
      return
    }
    const token = ctx.request.header.authorization.replace('Bearer ', '')
    try {
      const ret = await jwt.verify(token, app.config.jwt.secret)
      ctx.state.email = ret.email
      ctx.state.userid = ret._id
      await next()
    } catch (err) {
      console.log(err)
      if (err.name === 'TokenExpiredError') {
        ctx.body = {
          code: HttpStatus.USER_TOKEN_EXPIRED,
          message: 'TokenExpiredError',
        }
      } else {
        ctx.body = {
          code: HttpStatus.USER_INFO_INCORRECT,
          message: 'UserInfoIncorrect',
        }
      }
    }
  }
}
