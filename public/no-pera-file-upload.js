let noPeraFileUpload = document.querySelectorAll(".no-pera-file-upload");
let mainUrl = window.location.origin;

async function fetchData(page = 1) {
    let data = await fetch(mainUrl+`/uploads?page=${page}`);
    let res = await data.json();
    return res;
}
async function paginateNext(e) {
    let uploadModal = document.querySelector(".no-pera-file-upload-modal");
    let current_page = uploadModal.getAttribute("data-pagination-current");
    let last_page = uploadModal.getAttribute("data-pagination-last");
    let singleOrMultiple = document
        .querySelector(".no-pera-file-upload-modal")
        .getAttribute("data-no-pera-file-upload-qty");

    let nextBtn = document.querySelector("#next-btn");
    let prevBtn = document.querySelector("#prev-btn");

    if (current_page == last_page) {
        return;
    }
    let fetchD = await fetchData(parseInt(current_page) + 1);

    let img = "";

    let inputData = uploadModal.getAttribute("data-selected");

    if (inputData.length > 0) inputData = inputData.split(",");
    else inputData = [];
    fetchD?.data?.forEach((item) => {
        img += `<div class="no-pera-file-upload-modal-body-content-preview-img
${
    inputData.includes(item.id.toString())
        ? "no-pera-file-upload-modal-body-content-preview-img-active"
        : ""
}"
data-no-pera-file-upload-modal-body-content-preview-img="${
            item.id
        }" data-value="${item.id}"
data-no-pera-file-upload-preview="${singleOrMultiple}" >
<img src="${mainUrl + "/" + item.path}" alt="">
</div>`;
    });
    let preview = document.querySelector(
        ".no-pera-file-upload-modal-body-content-preview"
    );
    preview.innerHTML = img;
    uploadModal.setAttribute(
        "data-pagination-current",
        parseInt(current_page) + 1
    );
    if (parseInt(current_page) + 1 == last_page) {
        nextBtn.setAttribute("disabled", true);
    } else {
        nextBtn.removeAttribute("disabled");
    }
    prevBtn.removeAttribute("disabled");
    selectOption();
}
async function paginatePrev(e) {
    let uploadModal = document.querySelector(".no-pera-file-upload-modal");
    let current_page = uploadModal.getAttribute("data-pagination-current");
    let last_page = uploadModal.getAttribute("data-pagination-last");
    let singleOrMultiple = document
        .querySelector(".no-pera-file-upload-modal")
        .getAttribute("data-no-pera-file-upload-qty");

    let nextBtn = document.querySelector("#next-btn");
    let prevBtn = document.querySelector("#prev-btn");

    if (current_page == 1) {
        return;
    }
    let fetchD = await fetchData(parseInt(current_page) - 1);

    let img = "";
    let inputData = uploadModal.getAttribute("data-selected");

    if (inputData.length > 0) inputData = inputData.split(",");
    else inputData = [];
    fetchD?.data?.forEach((item) => {
        img += `<div class="no-pera-file-upload-modal-body-content-preview-img
${
    inputData.includes(item.id.toString())
        ? "no-pera-file-upload-modal-body-content-preview-img-active"
        : ""
}"
data-no-pera-file-upload-modal-body-content-preview-img="${
            item.id
        }"  data-value="${item.id}"
data-no-pera-file-upload-preview="${singleOrMultiple}"   >
<img src="${mainUrl + "/" + item.path}" alt="">
</div>`;
    });
    let preview = document.querySelector(
        ".no-pera-file-upload-modal-body-content-preview"
    );
    preview.innerHTML = img;
    uploadModal.setAttribute(
        "data-pagination-current",
        parseInt(current_page) - 1
    );
    if (parseInt(current_page) - 1 == 1) {
        prevBtn.setAttribute("disabled", true);
    } else {
        prevBtn.removeAttribute("disabled");
    }
    nextBtn.removeAttribute("disabled");
    selectOption();
}

function selectOption() {
    let imagePreviewImg = document.querySelectorAll(
        ".no-pera-file-upload-modal-body-content-preview-img"
    );
    imagePreviewImg.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            let preview = item.getAttribute("data-no-pera-file-upload-preview");
            if (preview == "single") {
                imagePreviewImg.forEach((item) => {
                    item.classList.remove(
                        "no-pera-file-upload-modal-body-content-preview-img-active"
                    );
                });
                item.classList.toggle(
                    "no-pera-file-upload-modal-body-content-preview-img-active"
                );
            }
            if (preview == "multiple") {
                item.classList.toggle(
                    "no-pera-file-upload-modal-body-content-preview-img-active"
                );
            }
            let value = item.getAttribute("data-value");
            let selected = document.querySelector(".no-pera-file-upload-modal");
            let selectedValue = selected.getAttribute("data-selected");

            if (selectedValue == "" || selectedValue == null) {
                selected.setAttribute("data-selected", value);
            } else {
                selectedValue = selectedValue.split(",");
                if (preview == "single") selectedValue = [];
                if (selectedValue.includes(value.toString())) {
                    selectedValue = selectedValue.filter(
                        (item) => item != value.toString()
                    );
                    selectedValue = selectedValue.join(",");
                    selected.setAttribute("data-selected", selectedValue);
                } else {
                    selectedValue.push(value);
                    selectedValue = selectedValue.join(",");
                    selected.setAttribute("data-selected", selectedValue);
                }
            }
        });
    });
}
let openModal = async (e, singleOrMultiple) => {
    e.preventDefault();

    let modal = document.createElement("div");
    modal.setAttribute("id", "modal-no-pera-file-upload");
    modal.classList.add("modal");
    let fetchD = await fetchData(1);
    console.log(fetchD);
    let img = "";
    let inputData = e.target.value;
    if (inputData.length > 0) inputData = inputData.split(",");
    else inputData = [];
    fetchD?.data?.forEach((item) => {
        img += `<div class="no-pera-file-upload-modal-body-content-preview-img
${
    inputData.includes(item.id.toString())
        ? "no-pera-file-upload-modal-body-content-preview-img-active"
        : ""
}

"
data-value="${item.id}"

data-no-pera-file-upload-preview="${singleOrMultiple}">
                            <img src="
${mainUrl + "/" + item.path}

                            " alt="random image" class="no-pera-file-upload-modal-body-content-preview-img-img">
                        </div>`;
    });
    modal.innerHTML =
        `
<div class="no-pera-file-upload-modal"
data-pagination-current="${fetchD?.current_page}"
data-pagination-last="${fetchD?.last_page}"
data-selected="${inputData?.join(",")}"
data-no-pera-file-upload-qty="${singleOrMultiple}"
>
            <div class="no-pera-file-upload-modal-header">
                <div class="no-pera-file-upload-modal-header-title">
                    <h3>Upload File</h3>
                </div>
                <div class="no-pera-file-upload-modal-header-action">
                    <button

                    id="image-upload-btn"
                    class="no-pera-file-upload-modal-header-btn">
                        Image
                    </button>

                    <button
                    id="file-upload-btn"
                    class="no-pera-file-upload-modal-header-btn">
                    File Upload
                        </button>
                </div>
            </div>
            <div class="no-pera-file-upload-modal-body">
                <div class="no-pera-file-upload-modal-body-content ">
                    <div class="no-pera-file-upload-modal-body-content-input no-pera-none">
                    <label for="file_id" class="no-pera-file-upload-modal-body-content-input-file ">
                        <input id=file_id type="file"
                        multiple="${
                            singleOrMultiple == "single" ? false : true
                        }"


                        class="no-pera-none">
                        <span class="no-pera-file-upload-modal-body-content-input-file-span">Click to upload</span>
                    </label>
                    </div>
                    <div class="no-pera-file-upload-modal-body-content-preview">` +
        img +
        `</div>
                </div>
            </div>
            <div class="no-pera-file-upload-modal-footer">
                <div class="no-pera-file-upload-pagination">
                    <button class="no-pera-file-upload-pagination-btn"
                    id="prev-btn"
                    onclick="paginatePrev()"
                    ${fetchD?.current_page == 1 ? "disabled" : ""}
                    >
                        Prev
                    </button>
                    <button
                    id="next-btn"
                    class="no-pera-file-upload-pagination-btn"
                    ${fetchD?.last_page <= 1 ? "disabled" : ""}
                    onclick="paginateNext()"

                    >
                        Next
                    </button>
                    </div>

                <div class="no-pera-file-upload-modal-footer-btn">
                     <button

onclick="closeModal(event)"

                    class="no-pera-file-upload-modal-header-btn">
Close
</button>
                    <button
                    id="upload-btn"

                    class="no-pera-file-upload-modal-footer-btn-upload">Upload</button>
                </div>
            </div>
        </div>
`;
    document.body.appendChild(modal);

    let imageUploadBtn = document.querySelector("#image-upload-btn");
    let imageUploadInput = document.querySelector(
        ".no-pera-file-upload-modal-body-content-input"
    );
    let imagePreview = document.querySelector(
        ".no-pera-file-upload-modal-body-content-preview"
    );
    let uploadBtn = document.querySelector("#upload-btn");
    imageUploadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        imagePreview.classList.remove("no-pera-none");
        imageUploadInput.classList.add("no-pera-none");
    });
    let fileUploadBtn = document.querySelector("#file-upload-btn");
    fileUploadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        imagePreview.classList.add("no-pera-none");
        imageUploadInput.classList.remove("no-pera-none");
    });
    selectOption();
    uploadBtn.addEventListener("click", () => {
        let selected = document.querySelector(".no-pera-file-upload-modal");
        let selectedValue = selected.getAttribute("data-selected");

        e.target.value = selectedValue;
       
        closeModal();
    });
    let fileId = document.querySelector("#file_id");

    fileId.addEventListener("change", (e) => {
        let files = e.target.files;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("file[]", files[i]);
        }
        fetch("/uploads", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRF-Token": "{{ csrf_token() }}",
            },
        }).then((res) => {
            console.log(res);
        });
    });
};

let closeModal = () => {
    let modal = document.querySelector("#modal-no-pera-file-upload");
    modal.remove();
};
noPeraFileUpload.forEach((item) => {
    item.addEventListener("click", (e) => {
        let singleOrMultiple = e.target.getAttribute(
            "data-no-pera-file-upload"
        );
        openModal(e, singleOrMultiple);
    });
});
