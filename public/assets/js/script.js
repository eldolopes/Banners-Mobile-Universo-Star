const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const bannerLink = document.querySelector("#banner-link");
const bannerName = document.querySelector("#banner-name");
const bannerType = document.querySelector("#banner-type");
const btnSave = document.querySelector("#btnSave");
const btnClose = document.querySelector("#btnClose");

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    bannerLink.value = itens[index].link;
    bannerName.value = itens[index].name;
    bannerType.value = itens[index].type;
    id = index;
  } else {
    bannerLink.value = "";
    bannerName.value = "";
    bannerType.value = "";
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.link}</td>
    <td>${item.name}</td>
    <td>${item.type}</td>
    <td class="action">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSave.onclick = (e) => {
  if (
    bannerLink.value == "" ||
    bannerName.value == "" ||
    bannerType.value == ""
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].link = bannerLink.value;
    itens[id].name = bannerName.value;
    itens[id].type = bannerType.value;
  } else {
    itens.push({
      link: bannerLink.value,
      name: bannerName.value,
      type: bannerType.value,
    });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};

btnClose.onclick = (e) => {
  e.modal("hide");
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => {
  JSON.parse(localStorage.getItem("dbfunc")) ?? [];
};
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();
