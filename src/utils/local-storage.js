const USER_KEY = "auth";

function getToken() {
  const data = localStorage.getItem(USER_KEY);
  return data;
}

function setToken(token) {
  localStorage.setItem(USER_KEY, token);
}

export { getToken, setToken };
