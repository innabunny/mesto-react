class Api {
  constructor({url, headers}) {
    this._baseUrl = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error (`Ошибка загрузки данных ${res.status}`));
    }
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkResponse(res));
  }

  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers});
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {method: 'GET', headers: this._headers});
  }

  addCard(item) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    });
  }

  editUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  putLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    });
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: '2ca56f07-fcb4-4986-82c9-567bd5155cbe',
    'Content-Type': 'application/json'
  }
})