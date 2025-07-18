

//'use strict';

//import DeserializeOptions from "./model/DeserializationOptions.js";
//import SerializeOptions from "./model/SerializeOptions.js";

import {getSerializeValueWithClassName} from './utils/serializer.js';
import {deserializeFromParsedObj} from './utils/deserializer.js';


export default class ESSerializer {

   static originRequire = null;
   static isRequireIntercepted = false;
   static requiredClasses = {};

   static registeredClasses = [];

   static throwErrorIfInNonNodeEnvironment() {
  }

  /* GS GUSA
  public static interceptRequire() {
    if (this.isRequireIntercepted) {
      return;
    }

    this.isRequireIntercepted = true;

    this.throwErrorIfInNonNodeEnvironment();
    ESSerializer.originRequire = Module.prototype.require;
    Module.prototype.require = function () {
      const requiredClass = ESSerializer.originRequire.apply(this, arguments);
      const requiredClassName = requiredClass.name;
      if (!ESSerializer.requiredClasses[requiredClassName]) {
        ESSerializer.requiredClasses[requiredClassName] = requiredClass;
      }

      return requiredClass;
    };
  }
  */

   static stopInterceptRequire() {
    this.throwErrorIfInNonNodeEnvironment();
    Module.prototype.require = ESSerializer.originRequire;
    this.isRequireIntercepted = false;
  }

   static isInterceptingRequire() {
    return this.isRequireIntercepted;
  }

   static getRequiredClasses() {
    return this.requiredClasses;
  }

   static clearRequiredClasses() {
    this.requiredClasses = {};
  }

   static registerClass(classDef) {
    this.registeredClasses.push(classDef);
  }

   static registerClasses(classes) {
    this.registeredClasses = this.registeredClasses.concat(classes);
  }

   static clearRegisteredClasses() {
    this.registeredClasses = [];
  }

   static serialize(target, options) {
    return JSON.stringify(getSerializeValueWithClassName(target, options));
  }

   static deserialize(serializedText, classes, options) {
    return deserializeFromParsedObj(JSON.parse(serializedText), Object.values(this.requiredClasses).concat(this.registeredClasses).concat(classes), options);
  }
}

