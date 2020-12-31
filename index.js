const appendTable = () => {
  fetch("https://api.coincap.io/v2/assets/?limit=10")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(
          `Network request failed with response ${response.status} ${response.statusText}`
        );
      }
    })
    .then(({ data }) => {
      data.forEach((elem) => {
        const table = document.getElementById("table");
        table.className = "table";
        const row = document.createElement("tr");
        const priceUsd = Math.round(parseFloat(elem.priceUsd) * 100) / 100;
        [elem.id, elem.name, elem.symbol, priceUsd].forEach((text) => {
          const cell = document.createElement("td");
          const textNode = document.createTextNode(text);
          cell.appendChild(textNode);
          row.appendChild(cell);
        });
        table.appendChild(row);
      });
    });
};
appendTable();

const sendDataToCookies = (e) => {
  e.preventDefault();
  const term = 30;
  const input = document.getElementById("input");
  const d = new Date();
  d.setTime(d.getTime() + term * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  if (document.cookie) {
    cookiesDelete();
    document.cookie = `value=${input.value}; ${expires}`;
    console.log(document.cookie);
  } else {
    document.cookie = `value=${input.value}; ${expires}`;
  }
  document.forms[0].reset();
};

const cookiesDelete = () => {
  let cookies = document.cooki.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  }
};

document.getElementById("btn").addEventListener("click", sendDataToCookies);
