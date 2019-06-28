interface Hiscore {
  name: string;
  score: number;
}

interface Hiscores extends Array<Hiscore> {}

const hiscores: Hiscores = [
  {
    name: 'david',
    score: 50,
  },
  {
    name: 'nathan',
    score: 100,
  },
  {
    name: 'frank',
    score: 150,
  },
  {
    name: 'bill',
    score: 200,
  },
  {
    name: 'gigabot',
    score: 250,
  },
];

// example HOW do we make this work?

// interface Example {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

console.log(JSON.stringify(hiscores));

async function api<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}

export async function testFetch() {
  console.log(await api('https://jsonplaceholder.typicode.com/todos/1'));
}
