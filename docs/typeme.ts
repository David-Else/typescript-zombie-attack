const test1 = {
  hero: {
    update() {
      console.log('updated hero in object');
    },
  },
  zombies: [
    {
      update() {
        console.log('updated zombie 1 in array of objects');
      },
    },
    {
      update() {
        console.log('updated zombie 2 in array of objects');
      },
    },
  ],
};

const caller = data => {
  Object.entries(data)
    .flatMap(({ 1: objOrArray }) => {
      if (objOrArray instanceof Array) {
        return objOrArray;
      }
      return [objOrArray];
    })
    .forEach(obj => obj.update());
};

caller(test1);
