/* ADD TO CART */

let loadingBackground = document.getElementById('background-cargando');

function addCart(id) {
    loadingBackground.classList.remove('none');
    fetch(`${window.location.origin}/api/products/addCart/${id}/1`, {
        method: 'POST'
    })
    .then(result => {
        console.log(result)
        if(result.ok){
            return result.json();
        }else{
            return 'err';
        }
    })
    .then(result => {
        if(result != 'err'){
            loadingBackground.classList.add('none');
        }
    })
}