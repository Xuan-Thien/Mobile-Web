const myForm =  document.getElementById('myForm');

const imageContainer= document.querySelector('.image-container');


const inputElement = document.getElementById('inputElement');
const fileBtn = document.getElementById('file-button');

const submitBtn = document.querySelector('.submit');

fileBtn.onclick = (event)=>{
  inputElement.click();
  event.preventDefault();

}

inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  console.log(fileList);
  
  const imageElement = document.createElement('img');

  imageElement.src = URL.createObjectURL(fileList[0]);
  imageContainer.innerHTML = "";
  imageContainer.appendChild(imageElement)
  imageContainer.style.backgroundColor = "inherit";
  imageElement.style.backgroundColor = "white";
  imageElement.onload = function() {
    URL.revokeObjectURL(imageElement.src) // free memory
  }
}

const productName = document.getElementById('product-name');
const description = document.getElementById('product-description');

const category = document.getElementById('product-category');

const price = document.getElementById('product-price');

const units = document.getElementById('product-units');

// submit
myForm.addEventListener('submit',(event)=>{
  
  event.preventDefault();

  const formData  = new FormData();
  formData.append('name',productName.value)
  formData.append('description',description.value)
  formData.append('category',category.value)
  formData.append('price',price.value)
  formData.append('units',units.value)
  formData.append('image',inputElement.files[0])

  console.log(formData);
  fetch('/add-product',{
    method:'POST',
    body: formData
  })
  .then (function (response){
    location.href = response.url;
  })
  .catch(function (error){
    console.error(error);
  })
})