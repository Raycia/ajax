const url = 'https://api.github.com/users';
const main = document.getElementById('main');
let text = '';

function getUser(user) {
  fetch(`${url}/${user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      text += `<p>${data.name} possui ${data.public_repos} repositórios públicos no GitHub como ${data.login}</p>`;
      main.innerHTML = text;
      return Promise.all([data, fetch(data.avatar_url)]);
    })
    .then(([userData, avatarResponse]) => {
      return avatarResponse.blob();
    })
    .then((avatarBlob) => {
      const avatarURL = URL.createObjectURL(avatarBlob);
      text += `<img src="${avatarURL}" alt="Foto do usuário">`;
      main.innerHTML = text;
    })
    .catch((error) => console.error('Erro: ', error.message || error));
}

const userInput = document.getElementById('username');

userInput.addEventListener('focusout', function (event) {
  getUser(event.target.value);
});
