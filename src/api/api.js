class Api {
  /**
   * @type {string}
   */
  #baseUrl;

  /**
   * @param {string} baseUrl
   */
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async get(pathname) {
    const url = `${this.#baseUrl}/${pathname}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      return { error };
    }
  }

  async post(pathname, data = {}) {
    const url = `${this.#baseUrl}/${pathname}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      return { error };
    }
  }
}

export default Api;
