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

    crea

    removeAllTr(){
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
      
    }
}
