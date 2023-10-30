function displayHydrationData() {
  fetch("/hidratacao")
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("hydration-list");
      list.innerHTML = "";

      data.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Data: ${entry.data}, Quantidade (ml): ${entry.quantidade}, Nome: ${entry.nome}`;
        list.appendChild(listItem);
      });
    })
    .catch((error) => console.error(error));
}

document
  .getElementById("hydration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const data = document.getElementById("data").value;
    const quantidade = document.getElementById("quantidade").value;
    const nome = document.getElementById("nome").value;

    fetch("/hidratacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, quantidade, nome }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        displayHydrationData();
      })
      .catch((error) => console.error(error));
  });

displayHydrationData();
