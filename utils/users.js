const users = []

function userJoin(id ,username  , room) {//bazaga userni qowadi //new user
    const user = {id , username  , room}
    users.push(user)
    return user
}

function getCarentUser(id) { //bazadan userni obkeb beradi// find user
    const user = users.find(user => user.id === id)
    return user
}

function leaveUser(id) {
    const index = users.findIndex(user => user.id === id)  // agar -1 bo'lsa user bazada yo'q bo'ladi

    if (index !== -1) {
        // userni bazadan o'chirib qaytarib berish kerak
        return users.splice(index, 1)[0]
    }
}


function joinRoom(room) {//qaysi honaga qowilsak owa honadagiuserlarni topib beradi
    return users.filter(user => user.room === room)
}
module.exports ={
    userJoin , 
    getCarentUser,
    leaveUser,
    joinRoom
}