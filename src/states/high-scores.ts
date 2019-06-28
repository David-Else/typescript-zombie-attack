// https://app.swaggerhub.com/apis/Nathan-Simmonds/zombie-scores/1.0#/

interface Hiscore {
  name: string;
  score: number;
}

const score: Hiscore = {
  name: 'test person',
  score: 100000,
};

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

// console.log(JSON.stringify(hiscores));

async function api<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}

export async function testFetch() {
  console.log(
    await api(
      'https://virtserver.swaggerhub.com/Nathan-Simmonds/zombie-scores/1.0/getScores',
    ),
  );
}

//
//
//
//
// v2 https://www.carlrippon.com/fetch-with-async-await-and-typescript/

export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(request)
      .then(res => {
        response = res;
        return res.json();
      })
      .then(body => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const get = async <T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) },
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};
//
export const put = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) },
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

// example consuming code

export async function test123() {
  const response = await post<{ id: number }>(
    'https://virtserver.swaggerhub.com/Nathan-Simmonds/zombie-scores/1.0/setScore',
    { name: 'david123', score: 100 },
  );
  console.log(response);
}
