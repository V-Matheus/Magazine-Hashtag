import {
  desenharProdutoNoCarrinhoSimples,
  lerLocalStorage,
  apagarDolocalStorege,
  salvarLocalStorage,
} from "./src/utilizades";
import {atualizarPrecoCarrinho} from './src/menuCarrinho'

function desenharProdutosCheckout() {
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutoCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evt) {
  evt.preventDefault();
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }

  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoComQuantidade,
  };
  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  salvarLocalStorage('historico', historicoDePedidosAtualizado)
  apagarDolocalStorege("carrinho");

  window.location.href = window.location.origin + "/pedidos.html";
}

desenharProdutosCheckout();
atualizarPrecoCarrinho();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
