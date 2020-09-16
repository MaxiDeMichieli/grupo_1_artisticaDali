const bcrypt = require('bcrypt');

let pass = 'maxitenis2001'

let passHash = bcrypt.hashSync(pass, 12)

/* console.log(passHash) */

let hashHash = bcrypt.hashSync(passHash, 12)

/* console.log(hashHash) */

if(bcrypt.compareSync(passHash, hashHash)){
    console.log('coinciden');
}else{
    console.log('no coinciden')
}