// const score: Hiscore = {
//   name: 'test person',
//   score: 100000,
// };
// interface Hiscores extends Array<Hiscore> {}
function isHiscores(obj) {
    return (obj instanceof Array &&
        typeof obj[0] === 'object' &&
        typeof obj[0].name === 'string' &&
        typeof obj[0].score === 'number');
}
function get(url) {
    return new Request(url);
}
function post(url, body) {
    return new Request(url, { method: 'POST', body: JSON.stringify(body) });
}
async function api(request) {
    const response = await fetch(request);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}
export async function testFetch() {
    const getHiScore = await api(get('https://virtserver.swaggerhub.com/Nathan-Simmonds/zombie-scores/1.0/getScores'));
    if (isHiscores(getHiScore)) {
        console.log(`get top score ${getHiScore[0].name} ${getHiScore[0].score}`);
    }
    else
        console.log(`Error with type guard`);
    const postHiScore = await api(post('https://virtserver.swaggerhub.com/Nathan-Simmonds/zombie-scores/1.0/setScore', { name: 'example name', score: 100 }));
    if (isHiscores(postHiScore)) {
        console.log(`post top score ${postHiScore[0].name} ${postHiScore[0].score}`);
    }
    else
        console.log(`Error with type guard`);
}
//# sourceMappingURL=http-service.js.map