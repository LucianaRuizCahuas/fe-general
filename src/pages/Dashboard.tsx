import { getCurrentUser } from '../api/auth.api';
import { Link } from 'react-router-dom';
import { Users, Map } from 'lucide-react';

export default function Dashboard() {
  const user = getCurrentUser();
  return <section className="mx-auto max-w-7xl px-4 py-12"><h1 className="text-4xl font-black text-blue-950">Bienvenido, {user?.username}</h1><p className="mt-2 text-slate-600">Panel principal migrado desde Angular a React.</p><div className="mt-8 grid gap-6 md:grid-cols-2"><Link to="/clientes" className="card-pro"><Users className="mb-4 text-blue-950" size={42}/><h2 className="text-2xl font-black">Gestión de Clientes</h2><p>CRUD de clientes conectado al backend.</p></Link><Link to="/tour" className="card-pro"><Map className="mb-4 text-blue-950" size={42}/><h2 className="text-2xl font-black">Paquetes Turísticos</h2><p>CRUD de paquetes turísticos conectado al backend.</p></Link></div></section>;
}
