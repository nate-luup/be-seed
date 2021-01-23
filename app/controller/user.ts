import * as md5 from 'md5'
import * as jwt from 'jsonwebtoken'
import BaseController from './base'
import ErrorMessages from '../utils/ErrorMessages'
import SuccessMessages from '../utils/SuccessMessages'
const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' },
}

class UserController extends BaseController {
  async login() {
    const { ctx, app } = this
    console.log(ctx.request.body)
    const { email, captcha, passwd } = ctx.request.body
    console.log('captcha', captcha.toUpperCase())
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error(ErrorMessages.signIn.captcha)
    }

    const user = await ctx.model.User.findOne({
      email,
      passwd: md5(passwd + app.config.hashSalt),
    })
    if (!user) {
      return this.error(ErrorMessages.signIn.userInfo)
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email,
      },
      app.config.jwt.secret,
      {
        expiresIn: '100h',
      },
    )
    this.success({ token, email, nickname: user.nickname })
  }
  async register() {
    const { ctx, app } = this
    try {
      ctx.validate(createRule)
    } catch (e) {
      return this.error(ErrorMessages.signIn.payloadFormat, -1, e.errors)
    }

    const { email, passwd, captcha, nickname } = ctx.request.body

    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error(ErrorMessages.signIn.captcha)
    }
    if (await this.checkEmail(email)) {
      this.error(ErrorMessages.signIn.emailExisted)
    } else {
      const ret = await ctx.model.User.create({
        email,
        nickname,
        passwd: md5(passwd + app.config.hashSalt),
      })
      if (ret._id) {
        this.message(SuccessMessages.signIn.register)
      }
    }
  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email })
    return user
  }
  async info() {
    const { ctx } = this
    const { email } = ctx.state
    const user = await this.checkEmail(email)
    this.success(user)
  }
  async updateInfo() {
    const { ctx } = this
    const url = ctx.request.body.url

    await ctx.model.User.updateOne({ _id: ctx.state.userid }, { avatar: url })
    this.success(SuccessMessages.signIn.updateUser)
  }
}

module.exports = UserController
