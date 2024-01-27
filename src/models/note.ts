function MinimumLength(length: number): PropertyDecorator {
  return function f(target: Object, propertyKey: string | symbol) {
    let value: string;

    const getter = () => value;
    const setter = (newVal: string) => {
      if (newVal && newVal.length < length) {
        throw new Error(
          `The length of the ${String(
            propertyKey
          )} should be at least ${length} characters.`
        );
      }
      value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

export class Note {
  private _id: string;
  private _title: string;
  private _body: string;

  constructor(id: string, title: string, body: string) {
    this._id = id;
    this._title = title;
    this._body = body;
  }

  get id(): string {
    return this._id;
  }

  // @MinimumLength(4)
  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  get body(): string {
    return this._body;
  }

  set body(newBody: string) {
    this._body = newBody;
  }
}
