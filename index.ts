interface Field {
    type: string;
    label: string;
    options?: string[]; // For radio and checkbox
}

let formFields: Field[] = [];

function addField(fieldType: string): void {
    let field: Field = { type: fieldType, label: `New ${fieldType} field` };

    if (fieldType === 'radio' || fieldType === 'checkbox') {
        const options = prompt('Enter options, separated by commas:');
        field.options = options ? options.split(',') : [];
    }

    formFields.push(field);
    renderFormPreview();
}

function renderFormPreview(): void {
    const formPreview = document.getElementById('form-preview');
    if (!formPreview) return;

    formPreview.innerHTML = ''; // Clear existing fields

    formFields.forEach((field, index) => {
        const fieldElement = document.createElement('div');
        fieldElement.classList.add('mb-3');
        let fieldHtml = `<label class="form-label">${field.label}</label>`;

        if (field.type === 'text') {
            fieldHtml += `<input type="text" class="form-control" placeholder="${field.label}">`;
        } else if (field.type === 'radio' || field.type === 'checkbox') {
            field.options?.forEach(option => {
                fieldHtml += `<div class="form-check">
                                <input class="form-check-input" type="${field.type}" name="field${index}" value="${option}">
                                <label class="form-check-label">${option}</label>
                              </div>`;
            });
        }

        fieldElement.innerHTML = fieldHtml;
        formPreview.appendChild(fieldElement);
    });
}

function saveForm(): void {
    localStorage.setItem('formFields', JSON.stringify(formFields));
    alert('Form saved!');
    renderFormsList();
}

function renderFormsList(): void {
    const formsList = document.getElementById('forms-list');
    if (!formsList) return;

    const savedForm = localStorage.getItem('formFields');
    if (!savedForm) return;

    const formFields = JSON.parse(savedForm);
    formsList.innerHTML = formFields.map((form: Field, index: number) => {
        return `<div class="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Form ${index + 1}</strong>
                    <div>
                        <button class="btn btn-sm btn-warning" onclick="editForm(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteForm(${index})">Delete</button>
                    </div>
                </div>`;
    }).join('');
}

function editForm(index: number): void {
    alert('Editing form is not implemented in this example.');
}

function deleteForm(index: number): void {
    const savedForms = localStorage.getItem('formFields');
    if (!savedForms) return;

    const formFields = JSON.parse(savedForms);
    formFields.splice(index, 1);
    localStorage.setItem('formFields', JSON.stringify(formFields));
    renderFormsList();
}

// Initial render of forms list
renderFormsList();
