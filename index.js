var formFields = [];
function addField(fieldType) {
    var field = { type: fieldType, label: "New ".concat(fieldType, " field") };
    if (fieldType === 'radio' || fieldType === 'checkbox') {
        var options = prompt('Enter options, separated by commas:');
        field.options = options ? options.split(',') : [];
    }
    formFields.push(field);
    renderFormPreview();
}
function renderFormPreview() {
    var formPreview = document.getElementById('form-preview');
    if (!formPreview)
        return;
    formPreview.innerHTML = ''; // Clear existing fields
    formFields.forEach(function (field, index) {
        var _a;
        var fieldElement = document.createElement('div');
        fieldElement.classList.add('mb-3');
        var fieldHtml = "<label class=\"form-label\">".concat(field.label, "</label>");
        if (field.type === 'text') {
            fieldHtml += "<input type=\"text\" class=\"form-control\" placeholder=\"".concat(field.label, "\">");
        }
        else if (field.type === 'radio' || field.type === 'checkbox') {
            (_a = field.options) === null || _a === void 0 ? void 0 : _a.forEach(function (option) {
                fieldHtml += "<div class=\"form-check\">\n                                <input class=\"form-check-input\" type=\"".concat(field.type, "\" name=\"field").concat(index, "\" value=\"").concat(option, "\">\n                                <label class=\"form-check-label\">").concat(option, "</label>\n                              </div>");
            });
        }
        fieldElement.innerHTML = fieldHtml;
        formPreview.appendChild(fieldElement);
    });
}
function saveForm() {
    localStorage.setItem('formFields', JSON.stringify(formFields));
    alert('Form saved!');
    renderFormsList();
}
function renderFormsList() {
    var formsList = document.getElementById('forms-list');
    if (!formsList)
        return;
    var savedForm = localStorage.getItem('formFields');
    if (!savedForm)
        return;
    var formFields = JSON.parse(savedForm);
    formsList.innerHTML = formFields.map(function (form, index) {
        return "<div class=\"list-group-item d-flex justify-content-between align-items-center\">\n                    <strong>Form ".concat(index + 1, "</strong>\n                    <div>\n                        <button class=\"btn btn-sm btn-warning\" onclick=\"editForm(").concat(index, ")\">Edit</button>\n                        <button class=\"btn btn-sm btn-danger\" onclick=\"deleteForm(").concat(index, ")\">Delete</button>\n                    </div>\n                </div>");
    }).join('');
}
function editForm(index) {
    alert('Editing form is not implemented in this example.');
}
function deleteForm(index) {
    var savedForms = localStorage.getItem('formFields');
    if (!savedForms)
        return;
    var formFields = JSON.parse(savedForms);
    formFields.splice(index, 1);
    localStorage.setItem('formFields', JSON.stringify(formFields));
    renderFormsList();
}
// Initial render of forms list
renderFormsList();
