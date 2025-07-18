export class Serializer
{
  constructor(types){
    this.types = types;
  }

  markRecursive(object)
  {
    // anoint each object with a type index
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1)
    {
      object['typeIndex'] = idx;

      for (let key in object)
      {
        if (object.hasOwnProperty(key) && object[key] != null)
          this.markRecursive(object[key]);
      }
    }
  }

  cleanUp(object)
  {
    if (object.hasOwnProperty('typeIndex')) {
      delete object.typeIndex;
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          //console.log(key);
          this.cleanUp(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object)
  {
    if (object.hasOwnProperty('typeIndex'))
    {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object)
      {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object)
  {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    this.cleanUp(object);
    return this.reconstructRecursive(copy);
  }

  serialize(object)
  {
    this.markRecursive(object);
    let json = JSON.stringify(object);
    this.cleanUp(object);
    return json;
  }
  deserialize(json)
  {
    let copy = JSON.parse(json);
    return this.reconstructRecursive(copy);
  }
}
