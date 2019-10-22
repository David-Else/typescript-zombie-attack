interface gameCharacter {
  point: [number, number];
}

class Hero implements gameCharacter {
  constructor(public point: [number, number]) {}
}

// Start with your own version of this >>>>>>>>>> https://mariusschulz.com/blog/typing-functions-in-typescript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
// https://css-tricks.com/understanding-javascript-constructors/

// Most simple example of returning a class without instantiation

const simple = <T>(cl: T) => cl;

/// When we try to return an instantiated class we get an error

const errorOne = <T>(cl: T) => new cl(); // Cannot use 'new' with an expression whose type lacks a call or construct signature.

/// Adding a constructor signiture gets rid of error, but now we are returning a type of any
// the extends keyword tells typescript that the type must at least include the referenced type
// and in this case it is
// The type Constructor<T> is an alias for the construct signature that describes a type which
// can construct objects of the generic type T and whose constructor function accepts an arbitrary number of parameters of any type

const missingType = <T extends { new (...args: any[]): any }>(cl: T) =>
  new cl();

const missingTypeWorking = <T extends { new (...args: any[]): any }>(
  cl: T,
  ...args: ConstructorParameters<T>
) => new cl(...args);

const lalala = missingTypeWorking(Hero, [10,10])

// Now we have a working function to return an instantiated class in a type safe way

const correctType = <T extends { new (...args: any[]): any }>(cl: T): T =>
  new cl();

// Lets make a utility class so we can use this constructor signiture type again

type Constructor<T> = new (...args: any[]) => T;

// or
// or is it?! https://www.typescriptlang.org/docs/handbook/interfaces.html#class-types
interface construky<T> {
  new (...args: any[]): T;
}

// Note that T is constrained to be compatible with Constructor, that is, the type must be able to construct something.
const correctTypeWithUtilityError = <T extends Constructor<T>>(cl: T): T =>
  new cl(); // // Argument of type 'typeof Hero' is not assignable to parameter of type 'Constructor<typeof Hero>'. Property 'prototype' is missing in type 'Hero' but required in type 'typeof Hero'.

// To correct that we need to ????

const correctTypeWithUtilityNoError = <
  InstanceType,
  ConstructorType extends Constructor<InstanceType>
>(
  cl: ConstructorType,
): InstanceType => new cl();

///

let result666 = simple(Hero); // typeof Hero
let result667 = errorOne(Hero); // // Cannot use 'new' with an expression whose type lacks a call or construct signature.
let result668 = missingType(Hero); // returns any
let result669 = correctType(Hero); // returns any
let result670 = correctTypeWithUtilityError(Hero); // Argument of type 'typeof Hero' is not assignable to parameter of type 'Constructor<typeof Hero>'. Property 'prototype' is missing in type 'Hero' but required in type 'typeof Hero'.
let result671 = correctTypeWithUtilityNoError(Hero); // Why unknown?

interface RegExpConstructor {
  // Call signatures
  (pattern: RegExp): RegExp;
  (pattern: string, flags?: string): RegExp;

  // Construct signatures
  new (pattern: RegExp): RegExp;
  new (pattern: string, flags?: string): RegExp;

  // ...
}

// Using the call signature
const digitsPattern1 = RegExp('^\\d+$'); //?

// Using the construct signature
const digitsPattern2 = new RegExp('^\\d+$'); //?
