import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bus, Compass, Handshake } from 'lucide-react';
import hero from '../assets/Angoma1.jpg';

export default function Home() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="relative grid min-h-[620px] place-items-center bg-cover bg-center px-4 text-center text-white" style={{ backgroundImage: `linear-gradient(rgba(10,39,74,.72),rgba(10,39,74,.72)),url(${hero})` }}>
        <div className="max-w-4xl animate-fadeIn">
          <p className="mb-4 inline-flex rounded-full bg-white/15 px-5 py-2 font-semibold backdrop-blur">Turismo seguro en Cañete y Huancayo</p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">Vive la aventura con <span className="text-orange-300">Angoma Tours</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">Experiencias turísticas, transporte y paquetes personalizados con atención profesional.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#servicios" className="btn-primary">Nuestros servicios</a><Link to="/tour" className="btn-light">Ver paquetes</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16" id="sobre-nosotros">
        <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
          <div className="card-pro">
            <h2 className="section-title">Sobre Nosotros</h2>
            <p>Angoma Tours S.A.C. nació para brindar experiencias turísticas únicas y seguras, promoviendo la cultura, gastronomía y cuidado del medio ambiente.</p>
            <p className="mt-4"><b>Misión:</b> brindar experiencias turísticas seguras con calidad, guía especializada y atención personalizada.</p>
            <p className="mt-4"><b>Visión:</b> ser líderes en turismo entre Cañete y Huancayo para el 2030.</p>
          </div>
          <div className="grid gap-4">
            {['Turismo responsable', 'Puntualidad', 'Seguridad', 'Innovación'].map((item) => <div key={item} className="rounded-2xl border bg-white p-5 font-bold shadow-sm">✅ {item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16" id="servicios">
        <div className="mx-auto max-w-7xl"><h2 className="section-title text-center">Nuestros Servicios</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Service icon={<Compass />} title="Paquetes turísticos" text="Rutas culturales y de naturaleza con guías expertos." />
            <Service icon={<Bus />} title="Transporte turístico" text="Traslados seguros con unidades certificadas." />
            <Service icon={<Handshake />} title="Servicios complementarios" text="Soporte para hospedajes, restaurantes e itinerarios." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16" id="contacto">
        <h2 className="section-title text-center">Contáctanos</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <form className="card-pro space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); (e.currentTarget as HTMLFormElement).reset(); }}>
            <input required minLength={2} className="input" placeholder="Nombre completo" />
            <input required type="email" className="input" placeholder="Correo electrónico" />
            <textarea required minLength={10} className="input min-h-32" placeholder="Cuéntanos sobre tu próxima aventura" />
            <button className="btn-primary">Enviar</button>
            {sent && <p className="font-semibold text-emerald-600">¡Gracias! Te contactaremos pronto.</p>}
          </form>
          <div className="card-pro"><p><b>Teléfono:</b> 992248069</p><p className="mt-3"><b>Dirección:</b> Av. Libertadores N° 150, San Vicente de Cañete – Lima, Perú</p><iframe title="Mapa" className="mt-6 h-72 w-full rounded-2xl" src="https://www.google.com/maps?q=Av.+Libertadores+150,+San+Vicente+de+Cañete&output=embed" /></div>
        </div>
      </section>
    </div>
  );
}
function Service({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="card-pro text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-950 text-white">{icon}</div><h3 className="text-xl font-black text-blue-950">{title}</h3><p className="mt-3 text-slate-600">{text}</p></div>; }
