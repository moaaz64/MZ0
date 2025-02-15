let title = document.getElementById("tital");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let moon = 'Create';
let tmp;

function getTotal(){
    if(price.value != ''){
        let result = (Number(price.value)) + (Number(taxes.value)) + (Number(ads.value)) - (Number(discount.value));
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.style.background = '#200bda';
        total.innerHTML = '';
    }
}

let dataa;

if(localStorage.product != null){
    dataa = JSON.parse(localStorage.product)
}else{
    dataa = [];
}

submit.onclick = function(){
   const newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(newpro.count < 1001 && title.value != '' && price.value != '' && discount.value != '' && category.value != ''){
        if(moon === 'Create'){
            if(newpro.count > 1){
                for(let i = 0; i < newpro.count ; i++){
                    dataa.push(newpro);
                }
            }else{
                dataa.push(newpro);
            }
        }else{
            dataa[tmp] = newpro;
            moon = 'Create';
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        cleardata()
    }


    localStorage.setItem('product', JSON.stringify(dataa))
    showdata()
}

function cleardata(){
   title.value = '';
   price.value = '';
   taxes.value = '';
   ads.value = '';
   discount.value = '';
   total.innerHTML = '';
   count.value = '';
   category.value = '';
}

function showdata(){
    getTotal()
   let table = '';
   for(let i = 0 ; i < dataa.length; i++){
       table += `
          <tr>
          <td>${i}</td>
          <td>${dataa[i].title}</td>
          <td>${dataa[i].price}</td>
          <td>${dataa[i].taxes}</td>
          <td>${dataa[i].ads}</td>
          <td>${dataa[i].discount}</td>
          <td>${dataa[i].total}</td>
          <td>${dataa[i].category}</td>
          <td><button onclick= "updatedata(${i})" id="update">update</button></td>
          <td><button onclick= "deletedata(${i})" id="Delete">Delete</button></td>
          </tr>
       `
   }

   document.getElementById('tbody').innerHTML = table;
   let btnDelete = document.getElementById('DeleteALL');
   if(dataa.length > 0){
      btnDelete.innerHTML = `
      <button onclick = "DeleteALL()">Delete ALL (${dataa.length})</button>
      `
   }else{
    btnDelete.innerHTML = ''
   }
}

showdata()

function deletedata(i){
   dataa.splice(i,1);
   localStorage.product = JSON.stringify(dataa);
   showdata()
}

function DeleteALL(){
    localStorage.clear()
    dataa.splice(0)
    showdata()
}

function updatedata(i){
    title.value = dataa[i].title;
    price.value = dataa[i].price;
    taxes.value = dataa[i].taxes;
    ads.value = dataa[i].ads;
    discount.value = dataa[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataa[i].category;
    submit.innerHTML = "Update";
    moon = "Update";
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

let searchmood = 'Title';

function getsearch(id){
let search = document.getElementById('search');

    if(id == 'Search_Title' ){
        let searchmood = 'Title';
        search.placeholder = 'Search By Title';
    }
    search.focus()
    search.value = '';
    showdata()
}

function searchData(value){
    let table = '';
    if(searchmood == "Title"){
        for(let i = 0 ; i < dataa.length ; i++){
            if(dataa[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataa[i].title}</td>
                <td>${dataa[i].price}</td>
                <td>${dataa[i].taxes}</td>
                <td>${dataa[i].ads}</td>
                <td>${dataa[i].discount}</td>
                <td>${dataa[i].category}</td>
                <td><button onclick= "updatedata(${i})" id="update">update</button></td>
                <td><button onclick= "deletedata(${i})" id="Delete">Delete</button></td>
                </tr>
             `;
            }

        }
       
    }

    document.getElementById('tbody').innerHTML = table;
}

