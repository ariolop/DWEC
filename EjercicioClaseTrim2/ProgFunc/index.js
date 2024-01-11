"use strict";

/*
Usando programación funcional (filter, map, reduce) y 
así como otras funciones de arrays resuelve las siguientes 
cuestiones y prueba su funcionamiento. 
Como se trata de programación funcional, 
no debes usar ningún tipo de bucle:

- Dado un array como el siguiente:
*/
const pedidos = [
    { id: 1, cliente: 'Pablito', items: ['Producto 1', 'Producto 2'] },
    { id: 2, cliente: 'Miguelón', items: ['Producto 3', 'Producto 4'] },
    { id: 3, cliente: 'Ricardín', items: ['Producto 5'] },
    { id: 4, cliente: 'Pablito', items: ['Producto 2', 'Producto 4'] },
    { id: 5, cliente: 'Ruperta', items: ['Producto 3'] }
  ];
  
  // a) Obtener un array con los pedidos que contienen el ítem 'Producto 3' y ordena los pedidos por el nombre de cliente.
  const pedidosProducto3ordenCliente = pedidos.filter( pedido => pedido.items.includes('Producto 3') )
                                              .sort((a,b) => (a.cliente > b.cliente) ? 1 : -1);
  console.log("a) Obtener un array con los pedidos que contienen el ítem 'Producto 3' y ordena los pedidos por el nombre de cliente.");
  console.log(pedidosProducto3ordenCliente);
  
  // b) Obtener un array con los ítems de los pedidos del cliente 'Pablito'. (Pista puedes usar filter, luego map y luego flat para aplanar el resultado)
  const itemsPedidosPablito = pedidos.filter(pedido => pedido.cliente === 'Pablito')
                                     .map(pedidoPablo => pedidoPablo.items)
                                     .flat();
  console.log("b) Obtener un array con los ítems de los pedidos del cliente 'Pablito'. (Pista puedes usar filter, luego map y luego flat para aplanar el resultado).");
  console.log(itemsPedidosPablito);
  
  //- Dado un array como el siguiente:
  
  const ventas = [
    { fecha: '2021-12-29', cantidad: 100 },
    { fecha: '2022-01-02', cantidad: 200 },
    { fecha: '2022-01-03', cantidad: 350 },
    { fecha: '2022-01-04', cantidad: 240 },
    { fecha: '2022-02-05', cantidad: 500 }
  ];
  
  //c) Obtén un array con las ventas de enero y febrero, ordenado por cantidad.
  const ventasEneroFebreroOrdenCantidad = ventas.filter( venta => venta.fecha.slice(5,7) === '02' || venta.fecha.slice(5,7) === '01')
                                                .sort((a,b) => a.cantidad - b.cantidad);

    const ventasEneroFebreroOrdenCantidad2 = ventas.filter( venta => venta.fecha >= '2022-01-01' && venta.fecha < '2022-03-01')
                                                    .sort((a,b) => a.cantidad - b.cantidad);
  console.log("c) Obtén un array con las ventas de enero y febrero, ordenado por cantidad.");                                                
  console.log(ventasEneroFebreroOrdenCantidad);
  console.log(ventasEneroFebreroOrdenCantidad2);
  
  //d) Calcula el promedio de ventas del mes de enero. (Pista haz un filter y luego reduce)
  const promedioVentasEnero = ventas.filter( venta => venta.fecha.slice(5,7) === '01')
                                    .reduce( (suma, venta, pos, ventas) => {return (pos != ventas.length - 1) ? 
                                                                            suma + venta.cantidad : 
                                                                            (suma + venta.cantidad) / ventas.length
                                                                            } ,0);
  console.log("d) Calcula el promedio de ventas del mes de enero. (Pista haz un filter y luego reduce)");                                                                            
  console.log(promedioVentasEnero);

  //- Dado un array como el siguiente:
  
  const productos = [
    { nombre: 'Producto 1', precio: 10, categoria: 'Categoria 1' },
    { nombre: 'Producto 2', precio: 20, categoria: 'Categoria 1' },
    { nombre: 'Producto 3', precio: 30, categoria: 'Categoria 2' },
    { nombre: 'Producto 4', precio: 40, categoria: 'Categoria 2' },
    { nombre: 'Producto 5', precio: 50, categoria: 'Categoria 3' }
  ];
  //e) Obtén un array de productos sin precio, es decir, con solo las propiedades nombre y categoria.
  const precioCategoria = productos.map(producto => (
        {
            nombre: producto.nombre,
            categoria: producto.categoria
        }
    ));

  const precioCategoria2 = productos.map(({nombre, categoria}) => ({nombre, categoria}));
  const precioCategoria3 = productos.map(({nombre: name, categoria: category}) => ({name, category})); 
 

  console.log("e) Obtén un array de productos sin precio, es decir, con solo las propiedades nombre y categoria.");
  console.log(precioCategoria);
  console.log(precioCategoria2);
  console.log(precioCategoria3);

  
  //f) crear un objeto con el nombre de cada categoría y la cantidad de productos que pertenecen a esa categoría. Por ejemplo, para este caso el objeto debe tener la siguiente forma:
    const categoriaCantidadProducto = productos.reduce((acumulador, {categoria}) => (
      {
        ...acumulador,
        [categoria]: (acumulador[categoria] ? acumulador[categoria] + 1 : 1) 
      })
      , {});

      // acumulador[categoria] ? 
      //   acumulador[categoria] += 1 :
      //   acumulador[categoria] = 1;

      // return acumulador;
    console.log("f) crear un objeto con el nombre de cada categoría y la cantidad de productos que pertenecen a esa categoría. Por ejemplo, para este caso el objeto debe tener la siguiente forma:");
    console.log(categoriaCantidadProducto);

//   {
//     'Category 1': 2,
//     'Category 2': 2,
//     'Category 3': 1
//   }
  //Pista: usa map para obtener los nombres de la categoria y luego reduce para contar cada categoria.