class Hero1 {
  constructor(public point: [number, number]) {}
}

class Monster1 {
  constructor(public words: 'wooooo!', public otherStuff: true) {}
}

const simpleFact = <T extends { new (...args: any[]): any }>(
  classToCreate: T,
  numberOf: number,
  ...args: ConstructorParameters<T>
): T[] => [...Array(numberOf)].map(() => new classToCreate(...args));

let result2 = simpleFact(Hero1, 2, [13, 20]); //?
let result3 = simpleFact(Monster1, 2, 'wooooo!', true); // it should take a string and boolean, not this!

// Utility type to model a class constructor. TS is completely structurally typed,
// so a constructor is anything that can be new-ed, possibly with arguments.
// https://mariusschulz.com/blog/typing-functions-in-typescript#object-type-literals-with-call-or-construct-signatures
type ClassConstructor<T> = new (...args: any[]) => T;

// Returns an array of class instances
function create<
  InstanceType,
  ConstructorType extends ClassConstructor<InstanceType>
>(
  ClassToInstantiate: ConstructorType,
  numberOf: number,
  // Note that args must be non-nullable, otherwise you'd be allowed to
  // pass in undefined when a class constructor requires parameters.
  args: ConstructorParameters<ConstructorType>,
): InstanceType[] {
  const characters: InstanceType[] = [];

  for (let index = 0; index < numberOf; index += 1) {
    characters.push(new ClassToInstantiate(...args));
  }

  return characters;
}

////// Demo

class example {
  public constructor(public position: number) {}
  AMethod() {}
}

const x = create(example, 5, [123]); // OK
const y = create(example, 5, ['hello']); // Error
