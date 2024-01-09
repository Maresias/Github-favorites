// COMO OS DADOS SERÃO ESTRUTURADOS

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
    }
}

// CLASS QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO DO HTML

export  class FavoritesView extends Favorites {
    constructor(root){
        super(root)

        this.update()
    }

    update(){
        this.removeAllTr()

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
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
      
    }
}
