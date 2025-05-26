const scriptURLPost = "https://script.google.com/macros/s/AKfycbyXRNCXs3vE9rK-QD20zel1aS8O1Khw4Xkc4yGRg8Py9CoVdWAUPat-PmIYOftMPa5msQ/exec";
const form = document.forms["titip-pesan"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".alert-warning");
const container = document.querySelector("#message-box");
const scriptURLGet = "https://script.google.com/macros/s/AKfycbzEpmeB5uENrC8kRNlCWvO2yGklCVfpKWqjhZfW4uNUBNSxUTKfd1uuYKR9Bf_6KFSHvw/exec";
fetchMessage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnKirim.classList.toggle("d-none");
  btnLoading.classList.toggle("d-none");
  fetch(scriptURLPost, { method: "POST", body: new FormData(form) })
    .then((response) => { 
      form.reset();
      btnKirim.classList.toggle("d-none");
      btnLoading.classList.toggle("d-none");
      myAlert.classList.toggle("d-none");
      setTimeout(() => {
        myAlert.classList.toggle("d-none");
      }, 2000);
      fetchMessage();
    })
    .catch((error) => console.error("Error!", error.message));
});

function fetchMessage() {
  container.innerHTML = `<div class="spinner-border text-warning mt-5" style="width: 2.5rem; height: 2.5rem;" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>`;
  fetch(scriptURLGet)
    .then((resp) => resp.json())
    .then((data) => {
      maker(data);
    });
}

function maker(data) {
  let content = "";
  data.reverse().forEach((message) => {
    content += `
      <div class="col-lg-7 col-md-10 col-12">
        <div class="bubble-message d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div class="user-photo me-4">
            <img src="assets/img/user-icon.svg" width="50px" />
          </div>
          <div class="message ms-1 w-100">
            <div class="row">
              <p class="fw-bolder col">${message.nama}</p>
              <p class="text-end col">${message.status}</p>
            </div>
            <p class="mt-1">${message.pesan}</p>
          </div>
        </div>
      </div>`;
  });
  container.innerHTML = content;
}
