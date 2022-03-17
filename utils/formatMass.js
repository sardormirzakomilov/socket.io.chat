const moment = require('moment')


function formatMassage(username , msg) {
    return{
        time: moment().format(' h:mm a'),
        username:username,
        msg
        
    }
}

module.exports = formatMassage