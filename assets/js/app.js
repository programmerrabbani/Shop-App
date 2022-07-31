document.title = ' Shop App ';



// get eliments

const product_form = document.getElementById('product_form');
const product_list = document.getElementById('product_list');
const update_form = document.getElementById('update_form');
const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single_product');


// get all data

const getAllData = () =>{

  const data =  readLSData('product');


  let list = '';
  let final_amount = 0;

  if ( !data || data.length == 0 ) {
    
    list = ` 
    
    <tr>
            <td colspan="7" class="text-center"> No Data Found </td>
    </tr>
    
    
    `;

  }else if ( data && data.length > 0 ) {
    
    data.map(( item , index ) =>{

        final_amount += (item.price * item.quantity);
        list += `
        
        <tr>
            <td> ${index + 1} </td>
            <td><img src = "${item.photo}" alt = "" ></td> 
            <td> ${item.name} </td>
             <td> ${item.price} BDT</td> 
            <td> ${item.quantity} </td>
            <td> ${item.price * item.quantity} BDT </td>
            <td>
            <a class="btn btn-info btn-sm product_view"
            href="#shop_single_modal" data-bs-toggle="modal" product_index="${index}"><i class="fas fa-eye"></i></a>

            <a class="btn btn-warning btn-sm product_edit"
            href="#shop_edit_modal" data-bs-toggle="modal" product_index="${index}"><i class="fas fa-edit"></i></a>

            <a class = "btn btn-danger btn-sm product_delete" href="" product_index="${index}"><i class ="fas fa-trash"></i></a>
            </td></tr> 
        
        `

    });

    list += ` 
    
    <tr>
            <td colspan="6" class="text-end">Final Amount = ${final_amount} BDT</td>
            <td></td>
    </tr>
    
    `;

  };

product_list.innerHTML = list;

  }

getAllData();


// submit product form

product_form.onsubmit = (e) =>{

    e.preventDefault();

    const form_data = new FormData(e.target);
    const productData = Object.fromEntries(form_data.entries());
    const { photo , name , price , quantity } = Object.fromEntries(form_data.entries());

    if ( !photo || !name || !price || !quantity ) {
        
        msg.innerHTML = setAlert( ' All Fields Are Required ' );

    } else {
        
        creatLSData( 'product', productData );

        msg.innerHTML = '  ';
        // e,target.reset();
        product_form.reset();
        getAllData();

    }

};



// single eye & edit product show

product_list.onclick = (e) =>{

    e.preventDefault();

    if (e.target.classList.contains('product_view')) {

      let index = e.target.getAttribute('product_index');
  
      let data = readLSData('product');
      
      const { name , price , photo ,quantity  } = data[index];
  
      single_product.innerHTML = ` 
      
                          <img class="shadow" src="${photo}" alt="">
                              <h3 class="my-3"> ${name} </h3>
                               <p> Price : ${price} BDT </p>
                               <p> Quantity : ${quantity} </p>
      
      `;
    } else if (e.target.classList.contains('product_edit')) {
      
      let index = e.target.getAttribute('product_index');

      let data = readLSData('product');

      const { name , photo , price , quantity } = data[index]

      update_form.innerHTML = ` 
      
      <div class="my-3">
        <label for=""> Name </label>
         <input name="name" class ="form-control"  value="${name}"  type="text">
        </div>
         <div class="my-3">
        <label for=""> Price </label>
         <input name="price" class="form-control" value="${price}" type="text">
        </div>
         <div class="my-3">
        <label for=""> Quantity </label> 
        <input name="quantity" class="form-control" value="${quantity}" type ="text">
        </div> 
         <div class="my-3">
        <label for=""> Index Number </label> 
        <input name="index" class="form-control" value="${index}" type ="text">
        </div> 
        <div class="my-3">
        <img class="w-100" src="${photo}" alt="">
        </div> 
        <div class="my-3">
        <label
      for=""> Photo </label>
       <input name="photo" class="form-control" value="${photo}" type="text">
        </div>
         <div class="my-3">
        <input class="btn btn-primary w-100" value="Update Now" type="submit" >
        </div>
      
      `;

    } else if (e.target.classList.contains('product_delete')) {
      
      let niscit = confirm( 'Are You Sure ?' );

      if ( niscit ) {
        
        let index = e.target.getAttribute('product_index');
  
        let data = readLSData('product');
  
        data.splice(index , 1);
  
        updateLSData('product', data);
  
          getAllData();


      }else{

        alert( 'Your Data Save' );

      }


    }

}


// update form submit

update_form.onsubmit = (e) =>{

  e.preventDefault();

  const form_data = new FormData(e.target);

  const { name , price , photo , quantity , index } = Object.fromEntries(form_data.entries());

  let all_data = readLSData('product');

  all_data[index] = { name , photo , price , quantity };


  updateLSData('product', all_data);

  getAllData();

}
