import { Component, Input, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho/carrinho.service';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css','../vendas.component.css']
})
export class CardProdutoComponent implements OnInit {
 
@Input() produto: any
corSelecionada: string = '';
tamanhoSelecionado: number | null = null;
imagemSelecionada: string = '';

constructor(private carrinhoService: CarrinhoService){
  
}

  ngOnInit(): void {
    this.corSelecionada = this.produto.corTamanho[0].cor;
    this.tamanhoSelecionado = this.produto.corTamanho[0].tamanhos[0]
    this.atualizarImagem();
  }
  
  adicionarProdutoAoCarrinho(produto:any){
    let produtoAtual = {
      id: this.produto.id,
      nome: this.produto.nome,
      preco: this.produto.preco,
      cor: this.corSelecionada,
      imgUrl: this.imagemSelecionada,
      tamanho: this.tamanhoSelecionado
    }
    this.carrinhoService.adicionarItem(produtoAtual); 
  }

  selecionarCor() {
    this.atualizarImagem();
  }

  private atualizarImagem() {
    const corSelecionada = this.corSelecionada;
    const cor = this.produto.corTamanho.find((c: any) => c.cor === corSelecionada);

    if (cor) {
      this.imagemSelecionada = cor.imgUrl;
      this.tamanhoSelecionado = cor.tamanhos[0]
    } else {
      this.imagemSelecionada = this.produto.imgUrl;
    }
  }

}
