import {getToken, setToken} from "../utils/local-storage.js";

class TrelloService {

  #apiBase = 'https://radiant-temple-07706.herokuapp.com'

  #getRequestHeaders = (withAuth = true) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (withAuth) {
      headers['Authorization'] = `Bearer ${getToken()}`;
    }

    return headers;
  }

  #throwErrorResNoOk = (res) => {
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
  }

  getResource = async (url) => {
    const res = await fetch(`${this.#apiBase}${url}`, {
      headers: this.#getRequestHeaders()
    });

    this.#throwErrorResNoOk(res);

    return await res.json();
  };

  postResource = async (url, data, withAuth = true) => {
    let res = await fetch(`${this.#apiBase}${url}`, {
      method: "POST",
      headers: this.#getRequestHeaders(withAuth),
      body: JSON.stringify(data)
    });

    this.#throwErrorResNoOk(res);

    return await res.json();
  };

  putResource = async (url, data) => {
    let res = await fetch(`${this.#apiBase}${url}`, {
      method: "PUT",
      headers: this.#getRequestHeaders(),
      body: JSON.stringify(data)
    });

    this.#throwErrorResNoOk(res);

    return await res.json();
  }

  deleteResource = async (url, data) => {
    let res = await fetch(`${this.#apiBase}${url}`, {
      method: "DELETE",
      headers: this.#getRequestHeaders(),
      body: JSON.stringify(data)
    });

    this.#throwErrorResNoOk(res);

    return await res.json();
  }

  postRegister = async (data) => {
    const res = await this.postResource('/auth/local/register', data, false)

    setToken(res.jwt);

    return res
  }

  postLogin = async (data) => {
    const res = await this.postResource('/auth/local', data, false)
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
    return await this.putResource(`/cards/${id}`, data)
  }

  deleteCard = async (id, data) => {
    return await this.deleteResource(`/cards/${id}`, data)
  }

  getStatuses = async () => {
    return await this.getResource("/statuses");
  }
}

export default new TrelloService();


