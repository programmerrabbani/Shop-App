
/**
 * SET ALERT
 */

const setAlert = ( msg , type="danger" ) =>{

    return ` <p class="alert alert-${type} d-flex justify-content-between"> ${msg} <button data-bs-dismiss="alert" class="btn-close"></button> </p> `;

}

/**
 * creat LS value
 */

const creatLSData = ( key , value ) =>{

    let data = [];

    if ( localStorage.getItem(key) ) {
        
        data = JSON.parse(localStorage.getItem(key));

    }

    data.push(value);

    localStorage.setItem( key , JSON.stringify(data) );
}


/**
 * red LS value
 */

const readLSData = ( key ) =>{

        if (localStorage.getItem(key)) {

            return JSON.parse(localStorage.getItem(key));

        }else {

            return false;

        }

}


/**
 * update LS data
 */

const updateLSData = ( key , array ) =>{

    localStorage.setItem( key , JSON.stringify(array) )

}