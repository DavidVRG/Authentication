/* VARIABLES */
const profileName = document.querySelector('.profile')
const chats = document.querySelector('.chats')
const logout = document.querySelector('.logout')

getProfileName()
getMessages()

async function getProfileName() {
    await fetch('/getProfileName')
    .then(res => res.json())
    .then(data => {profileName.innerHTML = data.username})
}

async function getMessages() {
    await fetch('/getMessages')
    .then(res => res.json())
    .then(data => {
        data.forEach(e => {

            const date = new Date(e.time)
            const formattedDate = date.toLocaleString("en-US")

            const chat = document.createElement('div')
            chat.setAttribute('class', 'chat')

            const name = document.createElement('div')
            name.setAttribute('class', 'name')
            name.innerHTML = e.username


            const text = document.createElement('div')
            text.setAttribute('class', 'text')
            text.innerHTML = e.message


            const time = document.createElement('div')
            time.setAttribute('class', 'time')
            time.innerHTML = formattedDate

            chat.appendChild(name)
            chat.appendChild(text)
            chat.appendChild(time)

            chats.append(chat)
        })
    })
}