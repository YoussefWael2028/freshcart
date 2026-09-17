var productname =document.getElementById ('productName').value;
var productprice =document.getElementById('productPrice').value;
var productcategory = document.getElementById('productCategory').value ;

function validation(inputId, regexkey, alertId) {
    var input = document.getElementById(inputId);
    let regex = {
        name: /^[A-Z][a-zA-Z0-9 ]{2,15}$/,
        price: /^[1-9][0-9]{2,6}$/,
        category: /^(mobile|TV|screens)$/
    };
    var isValid = regex[regexkey].test(input.value);
    if (isValid) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        document.getElementById(alertId).classList.add('d-none');
    } else {
        document.getElementById(alertId).classList.remove('d-none');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }
}

