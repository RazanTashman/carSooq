const axios = require('axios');
var token =(localStorage.getItem('token'));
console.log()
let getTOKEN = (term) => {
 let options = {
    headers: {
      'Authorization': `"" ${token}`
    }
  };
   axios.get(options)
  .then((response) => {
    console.log("thiiiiiiss",response.data);
    return response.data
  });
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
}
module.exports.getTOKEN = getTOKEN;