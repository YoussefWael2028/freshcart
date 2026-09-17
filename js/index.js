var Productlist=JSON.parse(localStorage.getItem('products')) ||[]
var indexToUpdate=-1;
function createProduct(){
    let product={
        productname: document.getElementById('productName').value,
        productprice: document.getElementById('productPrice').value,
        productcategory: document.getElementById('productCategory').value, 
        productimg :document.getElementById('productImg')
    }
    Productlist.push(product);
 localStorage.setItem('products', JSON.stringify(Productlist));  
    console.log('Product added:', product);

    resetForm();
}
function resetForm(){
    productName.value='';
    productPrice.value='';
    productCategory.value='';
    alert('added')
}
function displayProducts() {
    const displayContainer = document.getElementById('display');
    displayContainer.innerHTML = ''; 
    Productlist.forEach((product, index) => {
        displayContainer.innerHTML+=
        (`<div class="col-md-4">
            <img src="hero-img.png" width="100%" class="rounded-3 overflow-hidden mb-3"/>
            <span class="badge bg-primary mb-4">${product.productcategory}</span>
            <h3>${product.productname}</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis soluta ad fugiat porro perferendis dignissimos odio quibusdam fuga nesciunt voluptatem.</p>
            <span class="text-info fs-5">${product.productprice}$</span>
            <br>
             <button onclick="deleteProduct(${index})" class="btn btn-outline-danger mt-3">Delete</button>
             <button onclick="editProduct(${index})" class="btn btn-outline-info mt-3 px-3">Edit</button>
            </div>`)
    });
}

function deleteProduct(index) {
    Productlist.splice(index, 1); 
    localStorage.setItem('products', JSON.stringify(Productlist));
    displayProducts(); 
}


 var addbtn = document.getElementById('create');
 var updatetbtn = document.getElementById('update');
 
 function updateProduct() {
    var index = indexToUpdate
    Productlist[index].productname = productName.value;
    Productlist[index].productprice= parseFloat(productPrice.value);
    Productlist[index].productcategory= productCategory.value;

    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';

    
    document.getElementById('create').classList.remove('d-none');
    document.getElementById('update').classList.add('d-none');
    displayProducts(); 

}


function editProduct(index) {
    const product = Productlist[index];
    indexToUpdate=index;
   productName.value=Productlist[index].productname
   productPrice.value=Productlist[index].productprice
   productCategory.value=Productlist[index].productcategory
   document.getElementById('create').classList.add('d-none');
   document.getElementById('update').classList.remove('d-none');

}


