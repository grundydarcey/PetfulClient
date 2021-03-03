import API_ENDPOINT from './config';

const queueInformation = {
  getFirstCat() {
    return fetch(`${API_ENDPOINT}/cats`)
      .then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error))
  }
}