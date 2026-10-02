'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, Heart, Menu, Plus, ShoppingBag, Sparkles, X } from 'lucide-react'

type Product = { id: number; name: string; subtitle: string; price: number; tone: string; accent: string }

const products: Product[] = [
  { id: 1, name: 'Pink Bloom', subtitle: 'Flores delicadas · 20 oz', price: 399, tone: 'blush', accent: 'Rosa pétalo' },
  { id: 2, name: 'Minimal Blue', subtitle: 'Azul sereno · 20 oz', price: 399, tone: 'blue', accent: 'Azul cielo' },
  { id: 3, name: 'Soft Beige', subtitle: 'Neutro cálido · 20 oz', price: 399, tone: 'sand', accent: 'Arena suave' },
]

export function CupifyStore() {
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [customizeOpen, setCustomizeOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [addedId, setAddedId] = useState<number | null>(null)
  const [customName, setCustomName] = useState('Tu nombre')
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart])

  function addToCart(product: Product) {
    setCart((current) => [...current, product])
    setAddedId(product.id)
    window.setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div className="cupify-site">
      {/* Header: the logo and navigation stay visible while exploring the collection. */}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Cupify inicio">CUPIFY<span>.</span></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Colección</a>
          <a href="#customize" onClick={() => setMenuOpen(false)}>Personaliza</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Nuestra historia</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Menu /></button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito, ${cart.length} artículos`}>
            <ShoppingBag /><span>{cart.length}</span>
          </button>
        </div>
      </header>

      <main>
        {/* Hero: a clear first action for shoppers who want a ready-made or custom cup. */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles /> Diseñado para tu día a día</p>
            <h1>Tu historia,<br /><em>en cada sorbo.</em></h1>
            <p className="hero-text">Termos personalizados que se sienten tan tuyos como tu playlist favorita. Elige un diseño o crea algo desde cero.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#collection">Ver colección <ArrowRight /></a>
              <button className="text-link" onClick={() => setCustomizeOpen(true)}>Crear el mío <span>↗</span></button>
            </div>
            <div className="hero-note"><div className="avatar-stack"><span>m</span><span>a</span><span>l</span></div><p><strong>+2,000</strong> personas ya llevan su Cupify</p></div>
          </div>
          <div className="hero-art" aria-label="Termo Cupify rosa con flores" role="img">
            <div className="sun-shape" /><div className="flower flower-one">✿</div><div className="flower flower-two">✿</div>
            <div className="hero-cup"><div className="cup-lid" /><div className="cup-straw" /><div className="cup-label">CUPIFY<br /><small>make it yours</small></div></div>
            <span className="art-caption">hecho con intención</span>
          </div>
        </section>

        <section className="trust-bar"><span>Envío a todo México</span><i /> <span>Acero inoxidable</span><i /> <span>Hecho especialmente para ti</span></section>

        {/* Product collection: each card has a real interaction and feeds the cart drawer. */}
        <section className="collection section-shell" id="collection">
          <div className="section-intro"><div><p className="eyebrow">Nuestros favoritos</p><h2>Pequeños detalles,<br /><em>grandes momentos.</em></h2></div><p>Diseños listos para acompañarte, regalar y convertir lo cotidiano en algo especial.</p></div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className={`product-visual ${product.tone}`}><button className="heart-button" aria-label={`Guardar ${product.name}`}><Heart /></button><div className="mini-cup"><div className="mini-lid" /><span>CUPIFY</span></div><small>20 oz · reusable</small></div>
                <div className="product-details"><div><p className="product-kicker">{product.subtitle}</p><h3>{product.name}</h3></div><strong>${product.price} <small>MXN</small></strong></div>
                <button className={addedId === product.id ? 'add-button added' : 'add-button'} onClick={() => addToCart(product)}>{addedId === product.id ? <><Check /> Agregado</> : <>Agregar al carrito <Plus /></>}</button>
              </article>
            ))}
          </div>
        </section>

        <section className="customize-banner" id="customize">
          <div className="customize-art"><div className="custom-cup"><span>{customName}</span><small>tu diseño</small></div><div className="sparkle sparkle-a">✦</div><div className="sparkle sparkle-b">✦</div></div>
          <div className="customize-copy"><p className="eyebrow">Hazlo completamente tuyo</p><h2>Diseñado por ti.<br /><em>Hecho para ti.</em></h2><p>Tu nombre, tus colores, tu energía. En unos cuantos pasos puedes crear un termo que no se parece a ningún otro.</p><button className="button button-dark" onClick={() => setCustomizeOpen(true)}>Empezar a crear <ArrowRight /></button></div>
        </section>

        <section className="story section-shell" id="story"><div className="story-heading"><p className="eyebrow">Lo que nos mueve</p><h2>Más que un termo.<br /><em>Un pedacito de ti.</em></h2></div><div className="story-copy"><p>Cupify nació de una idea sencilla: los objetos que usamos todos los días también pueden contar quiénes somos.</p><p>Creemos en los detalles que hacen sonreír, en regalar algo con intención y en diseñar piezas que se quedan contigo mucho tiempo.</p><a className="text-link" href="#contact">Conoce nuestra historia <span>↗</span></a></div></section>

        <section className="quote-section"><div className="quote-stars">★★★★★</div><blockquote>“Mi termo llegó precioso, se siente súper mío y la calidad está increíble.”</blockquote><p>— Ana, cliente Cupify</p></section>
      </main>

      <footer id="contact"><div className="footer-top"><div><a className="brand brand-light" href="#home">CUPIFY<span>.</span></a><p>Personaliza lo cotidiano.</p></div><div className="footer-links"><a href="#collection">Colección</a><a href="#customize">Personaliza</a><a href="#story">Nosotros</a><a href="mailto:hola@cupify.mx">hola@cupify.mx</a></div><a className="social-button" href="#contact" aria-label="Cupify en redes sociales"><Heart /></a></div><div className="footer-bottom"><span>© 2026 Cupify</span><span>Hecho con intención en México</span></div></footer>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Tu selección</p><h2>Carrito <span>({cart.length})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag /><p>Tu carrito está esperando<br />algo bonito.</p><a href="#collection" onClick={() => setCartOpen(false)}>Explorar colección</a></div> : <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><div className={`cart-thumb ${item.tone}`}><span>CUPIFY</span></div><div><strong>{item.name}</strong><p>${item.price} MXN</p></div><button onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Quitar ${item.name}`}><X /></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>${total} MXN</strong></div><button className="button button-dark" onClick={() => alert('¡Gracias! El checkout estará disponible muy pronto.')}>Continuar al checkout <ArrowRight /></button></div></>}</aside></div>}

      {customizeOpen && <div className="overlay" onClick={() => setCustomizeOpen(false)}><div className="custom-modal" onClick={(event) => event.stopPropagation()}><button className="icon-button modal-close" onClick={() => setCustomizeOpen(false)} aria-label="Cerrar personalizador"><X /></button><p className="eyebrow">Tu diseño empieza aquí</p><h2>Hazlo muy <em>tuyo.</em></h2><p className="modal-description">Escribe el nombre que quieres ver en tu termo. Después podremos sumar colores, frases y más detalles.</p><label htmlFor="custom-name">¿Qué nombre llevará?</label><input id="custom-name" value={customName} onChange={(event) => setCustomName(event.target.value || 'Tu nombre')} maxLength={18} /><div className="modal-preview"><div className="custom-cup"><span>{customName}</span><small>tu diseño</small></div></div><button className="button button-dark" onClick={() => { setCustomizeOpen(false); alert(`¡Perfecto! ${customName} será el inicio de tu diseño.`) }}>Continuar diseñando <ArrowRight /></button></div></div>}
    </div>
  )
}

// The store is intentionally self-contained so the prototype remains easy to find and extend.
export default CupifyStore
