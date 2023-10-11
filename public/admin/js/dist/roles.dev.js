"use strict";

// Permissions
var tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
  var buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", function () {
    var permissions = [];
    var rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach(function (row) {
      var name = row.getAttribute("data-name");
      var inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach(function (input) {
          var id = input.value;
          permissions.push({
            id: id,
            permissions: []
          });
        });
      } else {
        inputs.forEach(function (input, index) {
          var checked = input.checked; // console.log(name);
          // console.log(index);
          // console.log(checked);
          // console.log("-------------");

          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    console.log(permissions);

    if (permissions.length > 0) {
      var formChangePermissions = document.querySelector("#form-change-permissions");
      var inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
      inputPermissions.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
} // End Permissions
// Permissions Data Default


var dataRecords = document.querySelector("[data-records]");

if (dataRecords) {
  var records = JSON.parse(dataRecords.getAttribute("data-records"));

  var _tablePermissions = document.querySelector("[table-permissions]");

  records.forEach(function (record, index) {
    var permissions = record.permissions;
    permissions.forEach(function (permission) {
      var row = _tablePermissions.querySelector("[data-name=\"".concat(permission, "\"]"));

      var input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
} // End Permissions Data Default