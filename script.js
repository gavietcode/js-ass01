// "use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("bmi-btn");

const petArr = [];
// Dữ liệu được nhập vào
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: "?",
  date: new Date(2023, 4, 6),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  bmi: "?",
  date: new Date(2023, 4, 6),
};

petArr.push(data1);
petArr.push(data2);

// Bắt sự kiện Click vào nút "Submit"
// Lấy dữ liệu từ các Form Input

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date(),
  };
  // console.log(data);

  const validate = validateData(data);
  // console.log(validate);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
});

// Validate dữ liệu
// -- Nếu hợp lệ thì thực thi
// -- Nếu không hợp lệ thì báo lỗi - cảnh báo
function validateData(data) {
  // Các trường nhập dữ liệu phải có dữ liệu

  // Khai báo biến flag - cờ hiệu.
  let isValidate = true;

  // trim() xóa khoảng trắng đầu cuối văn bản
  // if (data.id === "") Dùng cái này sẽ không đúng với space - khoảng trắng vẫn nhận
  // Xóa Khoảng trắng đầu cuối văn bản = ''
  if (data.id.trim() === "") {
    alert("Please input for id...");
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert("Please input for name...");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Please input for age...");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Please input for weight...");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Please input for length...");
    isValidate = false;
  }

  // Kiểm tra xem có bị trùng id hay không.
  let petArrLength = petArr.length;
  for (let i = 0; i < petArrLength; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique...");
      isValidate = false;
      break;
    }
  }

  // Tuổi từ 1->15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }

  // Cân nặng 1->15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }

  // Dài từ 1->100
  if (data.length < 1 || data.length > 100) {
    alert("Weight must be between 1 and 100!");
    isValidate = false;
  }

  // Chọn loại chó hay mèo
  if (data.type === "Select Type") {
    alert("Please Select Type!");
    isValidate = false;
  }

  // Chọn giống loài cho thú cưng
  if (data.breed === "Select Breed") {
    alert("Please Select Breed!");
    isValidate = false;
  }

  // Đúng trả lại true
  return isValidate;
}

// Thêm thú cưng vào danh sách
// Hiển thị danh sách thú cưng
renderTableData(petArr);
function renderTableData(petArr) {
  // Giá trị ban đầu sẽ trống
  tableBodyEl.innerHTML = "";
  let petArrLength = petArr.length;
  for (let i = 0; i < petArrLength; i++) {
    const row = document.createElement("tr"); // Tạo thẻ tr
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td> 
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} Kg </td>
    <td>${petArr[i].length} Cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>

    <td>${petArr[i].bmi}</td>
    
    <td>${petArr[i].date.getDate()}/${petArr[i].date.getMonth()}/${petArr[
      i
    ].date.getFullYear()}</td>
    <td>
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
</td>`;
    tableBodyEl.appendChild(row);
  }
}

// Xóa các dữ liệu nhập trong Form Input
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Xóa phần tử theo id
function deletePet(petId) {
  let isDelete = confirm("Are you sure?");
  let petArrLength = petArr.length;
  for (let i = 0; i < petArrLength; i++) {
    if (petId === petArr[i].id) {
      petArr.splice(i, 1);
      renderTableData(petArr);
    }
  }
}

// Hiển thị thú cứng có sức khỏe
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    // Hiển thị thú cưng khẻo mạnh và nút bấm có text: "Show All Pet"
    const healthyPetArr = [];
    let petArrLength = petArr.length;
    for (let i = 0; i < petArrLength; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        // Thêm thứ cưng khẻo mạnh vào danh sách.
        healthyPetArr.push(petArr[i]);
      }
    }

    // Kết thúc for sẽ show thú cưng khỏe mạnh ra.
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    // Hiển thị toàn bộ thú cưng và "Show Healthy Pet"
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// Tính toán BMI
calculateBmiBtn.onclick = function () {
  // Duyệt mảng và tính toán. sau đó show ra
  let petArrLength = petArr.length;
  for (let i = 0; i < petArrLength; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }
  renderTableData(petArr);
};
