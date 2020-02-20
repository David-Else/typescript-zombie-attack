/**
 * =========================================================================
 * Image loader
 * =========================================================================
 */
export function loadImage(filePath: string): Promise<HTMLImageElement> {
  const imageElement = new Image();
  imageElement.src = filePath;
  // we don't seem to need to explicity type HTMLImageElement anymore
  // https://www.reddit.com/r/typescript/comments/bhlb1e/please_help_me_understand_typing_a_simple_promise/
  return new Promise<HTMLImageElement>((resolve, reject) => {
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = reject;
  });
}

/**
 * =========================================================================
 * Audio loader
 * =========================================================================
 */
export function loadAudio(filePath: string): Promise<HTMLAudioElement> {
  const audioElement = new Audio();
  audioElement.src = filePath;

  return new Promise<HTMLAudioElement>((resolve, reject) => {
    audioElement.oncanplaythrough = () => resolve(audioElement);
    audioElement.onerror = reject;
  });
}

/**
 * =========================================================================
 * JSON loader
 * =========================================================================
 */
export function loadJSON<T>(request: RequestInfo): Promise<T> {
  return new Promise(resolve => {
    fetch(request)
      .then(response => response.json())
      .then(body => {
        resolve(body);
      });
  });
}
