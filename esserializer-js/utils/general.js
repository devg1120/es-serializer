
//'use strict';

function notObject(target) {
  return target === null || typeof target !== 'object';
}

function getValueFromToStringResult(result) {
  switch (result) {
    case 'Infinity':
      return Infinity;
    case '-Infinity':
      return -Infinity;
    case 'NaN':
      return NaN;
    default:
      return null;
  }
}

function isSupportedBuiltinClass(target) {
  return [Date].indexOf(target) >= 0;
}

function isClass(target) {
  if (isSupportedBuiltinClass(target)) {
    return true;
  }

  try {
    Reflect.construct(String, [], target);
  } catch (e) {
    return false;
  }
  return true;
}

export {
  getValueFromToStringResult,
  notObject,
  isClass
};
