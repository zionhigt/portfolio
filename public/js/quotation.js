const leadForm = document.querySelector('#leadForm');
const isCompany = document.querySelector('#leadForm #isCompany');

const sendQuotation = async function(url, options) {
    const req = await fetch(url, options);
    return await req.json();
}

isCompany.addEventListener("change", function(ev) {
    const nameLabel = document.querySelector("#leadForm label[for='fullName']");
    const companyField = document.querySelectorAll('#leadForm .company-fields');
    console.log(companyField)
    companyField.forEach(function(item) {
        console.log(item)
        if(!ev.target.checked) {
            item.classList.add('d-none');
            nameLabel.innerText = "Votre nom et prénom";
        } else {
            item.classList.remove('d-none');
            nameLabel.innerText = "Raison social";
        }
    });
    console.log(ev.target.checked)
});

leadForm.addEventListener('submit', function(ev) {
    ev.preventDefault()
    const leadInfo = {};
    const form = new FormData(ev.target);
    form.append("isCompany", isCompany.checked);

    form.forEach(function(v, k) {
        leadInfo[k] = v;
    })
    const options = {
        method: "POST",
        body: JSON.stringify(leadInfo),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }
    sendQuotation("/quotation", options)
    .then(() => {
        console.log("ok");
    })
    .catch(err => {
        console.log(err)
    })

});