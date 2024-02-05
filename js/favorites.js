//CLASSE QUE VAI CONTER A  LOGICA DE DADOS
export class githubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(
            ({login, name, public_repos, followers}) => ({
                login,
                name,
                public_repos,
                followers
            })
        )
    }
}

// COMO OS DADOS SERÃO ESTRUTURADOS

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)

        this.load()

        // githubUser.search('maykbrito').then(cu => console.log(cu))
    }

    load(){

        this.entries = JSON.parse
        (localStorage.getItem('@github-favorites:')) || []

        // this.entries =  [

        //     {
        //         login:'maykbrito',
        //         name:'Mayk Brito',
        //         public_repos: '77',
        //         followers: '137'
        //     },

        //     {
        //         login:'AlexandreRCS',
        //         name:'Alexandre',
        //         public_repos: '47',
        //         followers: '137'
        //     }
        // ]

    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try{
            const user = await githubUser.search(username)

            if(user.login ===  undefined){
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error){
            alert(error.message)
        }

    }

    delete(user){
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
    
}

// CLASS QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO DO HTML

export  class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        
        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.wrapper-input button')
        addButton.onclick = () =>{
            const { value } = this.root.querySelector('.wrapper-input input')

            this.add(value)
        }
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

            row.querySelector('.remove').onclick =() => {

                const isOk = confirm('tem certeza que deseja excluir essa linha?')

                if(isOk){
                    this.delete(user)
                }
            }

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
