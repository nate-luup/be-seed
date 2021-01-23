import { Controller } from 'egg'

import HttpStatus from '../utils/HttpStatus'

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: HttpStatus.OK,
      data,
    }
  }
  message(message) {
    this.ctx.body = {
      code: HttpStatus.OK,
      message,
    }
  }
  error(message, code = HttpStatus.INTERNAL_SERVER_ERROR, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    }
  }
}
export default BaseController
