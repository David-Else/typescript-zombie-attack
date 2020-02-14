type CtorType<T> = {
  new (): T;
};

class example {
  public constructor(public position: number) {}
  AMethod() {}
}

// return array of classes with correct type
function create<T>(
  ClassToInstantiate: { new (...args): T },
  numberOf: number,
  args?: ConstructorParameters<typeof T>,
): T[] {
  const characters: T[] = [];

  for (let index = 0; index < numberOf; index += 1) {
    characters.push(new ClassToInstantiate(...args));
  }

  return characters;
}

const x = create(example, 5, [123]); // OK
const y = create(example, 5, ['hello']); // Still OK BUT should only accept number as arg

/// more stuff

class Hero {
  constructor(public point: [number, number]) {}
}

class Monster {
  constructor(public words: 'wooooo!', public otherStuff: true) {}
}

const simpleFactory = <T>(
  classToCreate: { new (...args: ConstructorParameters<typeof T>): T },
  numberOf: number,
  ...args: ConstructorParameters<typeof T>
): T[] => [...Array(numberOf)].map(() => new classToCreate(...args));

let result = simpleFactory(Hero, 2, [13, 20]); //?
let result1 = simpleFactory(Monster, 2, [13, 20]); //?
//

const simpleFactory = <T>(
  clas: { new (...args: any): T },
  numberOf: number,
  ...args: any
): T[] => [...Array(numberOf)].map(() => new clas(...args));

let result = simpleFactory(Hero, 2, [10, 20]); //?

// arrgghh

function factoryTest<T>(type: { new (name: string): T }, val: string): T {
  return new type(val);
}

class SomeClass {
  constructor(public name: string) {}
}

class SomeOtherClass {
  constructor(public age: number) {}
}

let a = factoryTest(SomeClass, 'John Doe');
console.log(a.name);
