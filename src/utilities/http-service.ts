// const score: Hiscore = {
//   name: 'test person',
//   score: 100000,
// };

// const hiscores: Hiscores = [
//   {
//     name: 'david',
//     score: 50,
//   },
//   {
//     name: 'nathan',
//     score: 100,
//   },
//   {
//     name: 'frank',
//     score: 150,
//   },
//   {
//     name: 'bill',
//     score: 200,
//   },
//   {
//     name: 'gigabot',
//     score: 250,
//   },
// ];

////

interface Hiscore {
  name: string;
  score: number;
}

type Hiscores = Hiscore[];
// interface Hiscores extends Array<Hiscore> {}

function isHiscores(obj: unknown): obj is Hiscores {
  return (
    obj instanceof Array &&
    typeof obj[0] === 'object' &&
    typeof obj[0].name === 'string' &&
    typeof obj[0].score === 'number'
  );
}

function get(url: string): Request {
  return new Request(url);
}

function post<T>(url: string, body: T): Request {
  return new Request(url, { method: 'POST', body: JSON.stringify(body) });
}

async function api<T>(request: Request): Promise<T> {
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}

export async function testFetch(): Promise<void> {
  const getHiScore = await api(
    get(
      'https://virtserver.swaggerhub.com/Nathan-Simmonds/zombie-scores/1.0/getScores',
    ),
  );

  if (isHiscores(getHiScore)) {
    console.log(`get top score ${getHiScore[0].name} ${getHiScore[0].score}`);
  } else console.log(`Error with type guard`);

  const postHiScore = await api(
    post<Hiscore>(
      'https://virtserver.swaggerhub.com/Nathan-Simmonds/zombie-scores/1.0/setScore',
      { name: 'example name', score: 100 },
    ),
  );
  if (isHiscores(postHiScore)) {
    console.log(
      `post top score ${postHiScore[0].name} ${postHiScore[0].score}`,
    );
  } else console.log(`Error with type guard`);
}
