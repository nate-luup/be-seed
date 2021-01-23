import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611304001769_807'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
    jwt: {
      secret: '@nate!123Abc!:',
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/be-seed',
        options: {},
      },
    },
    hashSalt: ':nate!@123',
  }
}
