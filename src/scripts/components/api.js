let currentUserId;

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: 'fc5f532c-0391-4c7c-87f1-e53315000f78',
        'Content-Type': 'application/json'
      }
}

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
  
const updateUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
    }
      return Promise.reject(`Ошибка: ${res.status}`)
  });
} 

const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

const deleteCardFromBase = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => Promise.reject(err));
    }
    return res.json();
  });
}

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`)
  })
}

const removeLike = (cardId) => {
      return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => Promise.reject(err));
        }
        return res.json();
      });
    };

const avatarChange = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarLink })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => Promise.reject(err));
    }
    return res.json();
  });
};

export { getUserData, updateUserData, getInitialCards, addNewCard, deleteCardFromBase, addLike, removeLike, avatarChange  }