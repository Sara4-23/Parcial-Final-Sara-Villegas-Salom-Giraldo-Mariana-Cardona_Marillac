const productos = [
      { id: 1, nombre: 'Adidas RUNFALCON 5', precio: 300.000, imagen: 'img5.png.jpg' },
      { id: 2, nombre: 'New Balance 530', precio: 370.000, imagen: 'img6.png.jpg' },
      { id: 3, nombre: 'Adidas Stan Smith', precio: 200.000, imagen: 'img7.png.jpg' },
      { id: 4, nombre: 'PUMA Ampliflier', precio: 90.000, imagen: 'img8.png.jpg' },
      { id: 5, nombre: 'Nike Tennis P-6000', precio: 400.000, imagen: 'img9.png.jpg' },
    ];

    const carrito = {};

    function renderProductos() {
      const contenedor = document.getElementById('productos');
      productos.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
          <div class="card">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text">Precio: $${p.precio}</p>
              <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Agregar</button>
            </div>
          </div>
        `;
        contenedor.appendChild(col);
      });
    }

    function agregarAlCarrito(id) {
      if (carrito[id]) {
        carrito[id].cantidad++;
      } else {
        const producto = productos.find(p => p.id === id);
        carrito[id] = { ...producto, cantidad: 1 };
      }
      renderCarrito();
    }

    function modificarCantidad(id, delta) {
      if (!carrito[id]) return;
      carrito[id].cantidad += delta;
      if (carrito[id].cantidad <= 0) delete carrito[id];
      renderCarrito();
    }

    function renderCarrito() {
      const tbody = document.querySelector('#carrito tbody');
      tbody.innerHTML = '';
      let total = 0;
      for (const id in carrito) {
        const item = carrito[id];
        total += item.precio * item.cantidad;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.nombre}</td>
          <td>
            <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${item.id}, -1)">-</button>
            ${item.cantidad}
            <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${item.id}, 1)">+</button>
          </td>
          <td>$${item.precio * item.cantidad}</td>
        `;
        tbody.appendChild(row);
      }
      document.getElementById('total').innerText = `Total: $${total}`;
    }

    renderProductos();