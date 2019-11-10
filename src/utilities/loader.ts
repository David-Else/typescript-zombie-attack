export const load = {
  /**
   * =========================================================================
   * Image loader
   * =========================================================================
   */
  loadImage(filePath: string): Promise<HTMLImageElement> {
    const imageElement = new Image();
    imageElement.src = filePath;

    return new Promise<HTMLImageElement>((resolve, reject) => {
      imageElement.onload = () => resolve(imageElement);
      imageElement.onerror = reject;
    });
  },

  /**
   * =========================================================================
   * Audio loader
   * =========================================================================
   */
  loadAudio(filePath: string): Promise<HTMLAudioElement> {
    const audioElement = new Audio();
    audioElement.src = filePath;

    return new Promise<HTMLAudioElement>((resolve, reject) => {
      audioElement.oncanplaythrough = () => resolve(audioElement);
      audioElement.onerror = reject;
    });
  },

  /**
   * =========================================================================
   * JSON loader
   * =========================================================================
   */
  loadJSON<T>(request: RequestInfo): Promise<T> {
    return new Promise(resolve => {
      fetch(request)
        .then(response => response.json())
        .then(body => {
          resolve(body);
        });
    });
  },
};
