// Código em inglês 
import { useState } from "react"

interface Product {
  title: string;
  price: string;
}

const productList = [
  {
    title: 'Macarrão',
    price: 'R$ 25,00'
  },
  {
    title: 'Hamburger',
    price: 'R$ 30,00'
  }
]

export function ProductList() {
  const [productFilteredBySearch, setProductFilteredBySearch] = useState<Product[]>([])

  function searchProduto(search: string) {
    const productFiltered = productList.filter(product => product.title.includes(search))

    setProductFilteredBySearch(productFiltered)
  }

  return (
    <div>
      <input type="text" onChange={(e) => searchProduto(e.target.value)} />

      {productFilteredBySearch.map((product, index) => (
        <div key={`${product.title}-${index}`}>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  )
}


