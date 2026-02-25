import React, {useState} from 'react'

const initialProducts = [
  { id: 'p1', name: 'Body Bebê - Estrelinhas', price: 29.9, stock: 12, description: 'Body 100% algodão, 0-24 meses' },
  { id: 'p2', name: 'Macacão Ursinho', price: 79.9, stock: 5, description: 'Macacão com forro' },
  { id: 'p3', name: 'Kit Meias (3)', price: 19.9, stock: 30, description: 'Meias anti-derrapantes' },
];

export default function Home() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);

  function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    setCart(prev => {
      const found = prev.find(i => i.id === id);
      if (found) return prev.map(i => i.id === id ? {...i, qty: i.qty + 1} : i);
      return [...prev, { ...p, qty: 1 }];
    });
  }

  async function checkout() {
    if (cart.length === 0) {
      setMessage('Carrinho vazio');
      return;
    }
    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    const payload = {
      name: 'Original Kids',
      phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5519992024758',
      orderId: Math.floor(Math.random() * 1000000),
      total
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setCart([]);
        setMessage('Pedido criado e notificação via WhatsApp enviada (ou enfileirada).');
      } else {
        setMessage('Pedido criado, porém houve erro no envio do WhatsApp.');
      }
    } catch (e) {
      console.error(e);
      setMessage('Erro ao criar pedido.');
    }
  }

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom,#fff1f2,#ffffff)', padding: 24}}>
      <header style={{maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h1 style={{fontSize: 28}}>Original Kids</h1>
      </header>

      <main style={{maxWidth: 900, margin: '24px auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24}}>
        <section>
          <h2 style={{fontSize: 18, marginBottom: 12}}>Catálogo</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12}}>
            {products.map(p => (
              <article key={p.id} style={{padding: 12, background: '#fff', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.06)'}}>
                <h3 style={{fontWeight: 600}}>{p.name}</h3>
                <p style={{color: '#555', fontSize: 14}}>{p.description}</p>
                <div style={{marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <div style={{fontWeight: 700}}>R$ {p.price.toFixed(2)}</div>
                    <div style={{fontSize: 12, color: '#777'}}>Estoque: {p.stock}</div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                    <button style={{padding: '6px 10px', background: '#16a34a', color: 'white', borderRadius: 6, border: 'none'}} onClick={() => addToCart(p.id)}>Adicionar</button>
                    <a
                      style={{padding: '6px 10px', background: '#15803d', color: 'white', borderRadius: 6, textDecoration: 'none', textAlign: 'center'}}
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5519992024758'}?text=${encodeURIComponent('Olá! Tenho interesse no produto ' + p.name + ' (R$ ' + p.price.toFixed(2) + ').')}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Falar no WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside style={{padding: 12, background: '#fff', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontWeight: 600}}>Carrinho</h2>
          <ul style={{marginTop: 12}}>
            {cart.map(item => (
              <li key={item.id} style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee'}}>
                <div>{item.name} x{item.qty}</div>
                <div>R$ {(item.price*item.qty).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div style={{marginTop: 12}}>
            <button style={{width: '100%', padding: '10px 12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6}} onClick={checkout}>Finalizar compra</button>
          </div>
          {message && <div style={{marginTop: 12, fontSize: 14}}>{message}</div>}
        </aside>
      </main>
    </div>
  );
                        }
