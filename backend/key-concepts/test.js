

fetch('http://localhost:3000').then(res => {
    if(!res.ok) {
        throw  new Error(`${res.status} - ${res.statusText}`)
    }
    return res.json()
}).then(res => {
    console.log(res)
}).catch(error => {
    console.log(error.message)
    console.log(error.status)
})

