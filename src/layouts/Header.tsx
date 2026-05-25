import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentUser, isAdmin, logout } from '../api/auth.api';
import logo from '../assets/angomalogo.png';

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(getCurrentUser());

  useEffect(() => {
    const sync = () => setSession(getCurrentUser());
    window.addEventListener('session-change', sync);
    return () => window.removeEventListener('session-change', sync);
  }, []);

  const closeSession = () => {
    if (!confirm('¿Estás seguro de cerrar sesión?')) return;
    logout();
    navigate('/');
  };

  const navItems = [
    ['Inicio', '/'],
    ['Clientes', '/clientes'],
    ['Tours', '/tour'],
    ['Dashboard', '/dashboard'],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 font-black text-slate-900">
          <img src={logo} alt="Angoma Tours" className="h-11 w-11 rounded-xl object-cover" />
          <span className="text-xl">Angoma Tours</span>
        </Link>
        <button className="rounded-xl border p-2 md:hidden" onClick={() => setOpen(!open)}><Menu /></button>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(([label, path]) => <Link className="nav-link" key={path} to={path}>{label}</Link>)}
          {isAdmin() && <Link className="nav-link flex items-center gap-1" to="/admin"><ShieldCheck size={17}/> Admin</Link>}
          {!session ? <Link className="btn-primary" to="/login">Iniciar sesión</Link> : <button onClick={closeSession} className="btn-secondary flex items-center gap-2"><LogOut size={17}/> Cerrar sesión</button>}
        </nav>
      </div>
      {open && <div className="border-t bg-white px-4 pb-4 md:hidden">
        {navItems.map(([label, path]) => <Link onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 font-semibold text-slate-700" key={path} to={path}>{label}</Link>)}
        {isAdmin() && <Link onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 font-semibold text-slate-700" to="/admin">Admin</Link>}
      </div>}
    </header>
  );
}
