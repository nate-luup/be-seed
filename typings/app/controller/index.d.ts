// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
    user: ExportUser;
    util: ExportUtil;
  }
}
