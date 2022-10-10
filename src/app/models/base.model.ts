export interface IDeserializable {
  deserialize(input: any): this;
}

export interface IModelConstructor<T extends BaseModel> {
  new(raw: any): T;
  getResourceName(): string;
  getResourceKey(): string;
}

export class BaseModel implements IDeserializable {

  constructor(raw: any = null) {
    if (raw && raw != null) {
      this.deserialize(raw);
    }
  }
  public static readonly typeName = '';
  public static readonly typeKey = '';

  public raw: any;

  public static getTypeName(): string {
    return this.typeName || this.name.toLowerCase();
  }

  public static getTypeKey(): string {
    return this.typeKey;
  }

  public static getResourceName(): string {
    return this.getTypeName();
  }

  public static getResourceKey():  string {
    return this.getTypeKey();
  }

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
