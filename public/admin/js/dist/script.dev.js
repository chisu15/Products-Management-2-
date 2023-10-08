"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Button Status
var buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {
  var url = new URL(window.location.href);
  buttonsStatus.forEach(function (button) {
    button.addEventListener("click", function () {
      var status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams["delete"]("status");
      }

      window.location.href = url.href;
    });
  });
} // End Button Status
// Form Search


var formSearch = document.querySelector("#form-search");

if (formSearch) {
  var _url = new URL(window.location.href);

  formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    var keyword = e.target.elements.keyword.value;

    if (keyword) {
      _url.searchParams.set("keyword", keyword);
    } else {
      _url.searchParams["delete"]("keyword");
    }

    window.location.href = _url.href;
  });
} // End Form Search
// Pagination


var buttonsPagination = document.querySelectorAll("[button-pagination]");

if (buttonsPagination) {
  var _url2 = new URL(window.location.href);

  buttonsPagination.forEach(function (button) {
    button.addEventListener("click", function () {
      var page = button.getAttribute("button-pagination");

      _url2.searchParams.set("page", page);

      window.location.href = _url2.href;
    });
  });
} // End Pagination
// Checkbox Multi


var checkboxMulti = document.querySelector("[checkbox-multi]");

if (checkboxMulti) {
  var inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  var inputsId = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", function () {
    if (inputCheckAll.checked) {
      inputsId.forEach(function (input) {
        input.checked = true;
      });
    } else {
      inputsId.forEach(function (input) {
        input.checked = false;
      });
    }
  });
  inputsId.forEach(function (input) {
    input.addEventListener("click", function () {
      var countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
} // End Checkbox Multi
// Form Change Multi


var formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", function (e) {
    e.preventDefault();
    var checkboxMulti = document.querySelector("[checkbox-multi]");
    var inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
    var typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      var isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");

      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      var ids = [];
      var inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputsChecked.forEach(function (input) {
        var id = input.value;

        if (typeChange == "change-position") {
          var position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push("".concat(id, "-").concat(position));
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
} // End Form Change Multi
// Show Alert


var showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  var time = parseInt(showAlert.getAttribute("data-time"));
  var closeAlert = showAlert.querySelector("[close-alert]");
  setTimeout(function () {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", function () {
    showAlert.classList.add("alert-hidden");
  });
} // End Show Alert
// Upload Image


var uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  var uploadImageInput = document.querySelector("[upload-image-input]");
  var uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", function (e) {
    var file = e.target.files[0];

    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
} // End Upload Image
// Sort


var sort = document.querySelector("[sort]");

if (sort) {
  var _url3 = new URL(window.location.href);

  var sortSelect = sort.querySelector("[sort-select]");
  var sortClear = sort.querySelector("[sort-clear]"); // Sắp xếp

  sortSelect.addEventListener("change", function (e) {
    var value = e.target.value;

    var _value$split = value.split("-"),
        _value$split2 = _slicedToArray(_value$split, 2),
        sortKey = _value$split2[0],
        sortValue = _value$split2[1];

    console.log(sortKey);
    console.log(sortValue);

    _url3.searchParams.set("sortKey", sortKey);

    _url3.searchParams.set("sortValue", sortValue);

    window.location.href = _url3.href;
  }); // Xóa sắp xếp

  sortClear.addEventListener("click", function () {
    _url3.searchParams["delete"]("sortKey");

    _url3.searchParams["delete"]("sortValue");

    window.location.href = _url3.href;
  }); // Thêm selected cho option

  var sortKey = _url3.searchParams.get("sortKey");

  var sortValue = _url3.searchParams.get("sortValue");

  if (sortKey && sortValue) {
    var stringSort = "".concat(sortKey, "-").concat(sortValue);
    console.log(stringSort);
    var optionSelected = sortSelect.querySelector("option[value='".concat(stringSort, "']"));
    optionSelected.selected = true;
  }
} // End Sort