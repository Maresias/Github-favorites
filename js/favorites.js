// COMO OS DADOS SERÃO ESTRUTURADOS

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)

        this.load()
    }

    load(){
        this.entries =  [

            {
                login:'maykbrito',
                name:'Mayk Brito',
                public_repos: '77',
                followers: '137'
            },

            {
                login:'may',
                name:'Brito',
                public_repos: '7',
                followers: '17'
            }
        ]

    }
}

// CLASS QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO DO HTML

export  class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        
        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update(){
        this.removeAllTr()

        this.entries.forEach(user =>{
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers


            this.tbody.append(row)
        })

    }

    createRow(){
        const tr = document.createElement('tr')

        const content = ` 
        <td class="user">
            <img src="https://github.com/maykbrito.png" alt="">
            <a href="http://github.com/maykbrito" target="_blank" rel="noopener noreferrer">
                <p>Mayk Brito</p>
                <span>maykbrito</span>
            </a>
        </td>
        <td class="repositories">
            50
        </td>
        <td class="followers">
            1200
        </td>
        <td><button class="remove">&times;</button></td>
        `

        tr.innerHTML = content


        return tr 
    }

    removeAllTr(){
     

        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
      
    }
}
