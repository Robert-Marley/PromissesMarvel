
const apikey = '230e9d294b70e33bd03e9e18bc00eb02'
const timestamp = '1647045234'
const hash = 'e74c0190df6bfe85ff3d471846bc2eee'
const btnCarregarChar = document.querySelector('#btnChar')
const container = document.querySelector('.container')
const charactersCard = document.querySelector('#charactersCard')
const containerCards = document.querySelector('.container-cards')

function createCard(dados) {
    const characters = dados.data.results
   
    for (let character of characters) {
         const charPhoto = `${character.thumbnail.path}/portrait_uncanny.jpg`
        
         containerCards.innerHTML += `
            <div id="charactersCard">
                <div class="photo">
                    <img src="${charPhoto}" id="fotoChar">
                </div>
                <h1 id="nomeChar">${character.name}</h1>
                <p>${character.description}</p>
            </div>    
            `
    }
    
    
}


function erro() {
    console.log('OPS, ocorreu um erro!')
}

btnCarregarChar.onclick = () => 
    requestChar()
        .then(createCard)
        .catch(erro)


function requestChar() {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest()
            
        xhttp.onreadystatechange = function() {
            
            if(this.readyState === 4 && this.status === 200){
                const response = JSON.parse(this.responseText)

                resolve(response)
            }
            
            if(this.status === 404 || this.status === 409){
                reject()
            }
        }
        
        btnCarregarChar.classList.add('animation')
        
        setTimeout(function () {
            containerCards.classList.remove('hidden')
            btnCarregarChar.classList.add('hidden',)
            container.classList.remove('container')
        }, 300)
        
        
        xhttp.open('GET',`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hash}`, true)
        xhttp.send()
    }) 
}

