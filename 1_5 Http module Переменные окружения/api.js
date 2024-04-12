module.exports = class {
  constructor(baseUrl, key) {
    this.baseUrl = baseUrl;
    this.key = key;
  }

  #http = require("http");

  /**
   * @param {string} location
   * @return {Promise<import("./types.d.ts").TResponse>}
   * */
  getCurrent(location) {
    const url = new URL("v1/current.json", this.baseUrl);

    url.searchParams.set("key", this.key);
    url.searchParams.set("q", location);
    url.searchParams.set("lang", "ru");

    return new Promise((response, reject) => {
      this.#http
        .get(url, (res) => {
          const { statusCode, statusMessage } = res;
          if (statusCode >= 404) {
            reject({ statusCode, statusMessage });
            return;
          }
          res.setEncoding("utf-8");
          let rowData = "";
          res.on("data", (chunk) => {
            rowData += chunk;
          });
          res.on("end", () => {
            const data = JSON.parse(rowData);
            if (data.error) {
              reject(data.error);
            }
            response(data);
          });
        })
        .on("error", (e) => {
          reject(e);
        });
    });
  }
};
