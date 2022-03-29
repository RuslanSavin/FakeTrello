import {getToken, setToken} from "../utils/local-storage.js";

export default class TrelloService {

  #apiBase = 'https://radiant-temple-07706.herokuapp.com'

  getResource = async (url) => {
    const res = await fetch(`${this.#apiBase}${url}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  postResource = async (url, data, jwt = '') => {
    const headers = jwt ? {'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`} : {'Content-Type': 'application/json'}
    let res = await fetch(`${this.#apiBase}${url}`, {
      method: "POST",
      headers: headers,
      body: data
    });

    if (!res.ok) {
      console.log(res)
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}, ${res.statusText}`)
    }

    return await res.json();
  };

  putResource = async (url, data) => {
    console.log('data', data)
    let res = await fetch(`${this.#apiBase}${url}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${getToken()}` },
      body: data
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }

    return await res.json();
  }

  deleteResource = async (url, data) => {
    let res = await fetch(`${this.#apiBase}${url}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: data
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }

    return await res.json();
  }

  postRegister = async (data) => {
    const res = await this.postResource('/auth/local/register', data)

    setToken(res.jwt);

    return res
  }

  postLogin = async (data) => {
    const res = await this.postResource('/auth/local', data)
    setToken(res.jwt);

    return res;
  }

  getAllCards = async () => {
    return await this.getResource("/cards");
  }

  getCard = async (id) => {
    return await this.getResource(`/cards/${id}`);
  }

  createCard = async (data) => {
    return await this.postResource('/cards', data, getToken());
  }

  updateCard = async (id, data) => {
    console.log('trello', id, data)
    return await this.putResource(`/cards/${id}`, data)
  }

  deleteCard = async (id, data) => {
    return await this.deleteResource(`/cards/${id}`, data)
  }

  getStatuses = async () => {
    return await this.getResource("/statuses");
  }
}


