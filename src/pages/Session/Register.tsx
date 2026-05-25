import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../../api/auth.api';

export default function Register() {
  const navigate = useNavigate();
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const ok = registerUser({ nombres: String(form.get('nombres')), apellidos: String(form.get('apellidos')), email: String(form.get('email')), password: String(form.get('password')) });
    if (!ok) return toast.error('El correo ya está registrado');
    toast.success('Usuario registrado');
    navigate('/login');
  }
  return <section className="auth-bg"><form onSubmit={submit} className="auth-card"><h1>Crear cuenta</h1><p>Regístrate para acceder al dashboard.</p><div className="grid gap-3 md:grid-cols-2"><input name="nombres" className="input" placeholder="Nombres" required /><input name="apellidos" className="input" placeholder="Apellidos" required /></div><input name="email" type="email" className="input" placeholder="Correo" required /><input name="password" type="password" minLength={6} className="input" placeholder="Contraseña" required /><button className="btn-primary w-full">Registrarme</button><p className="text-center text-sm">Ya tengo cuenta <Link className="link" to="/login">Iniciar sesión</Link></p></form></section>;
}
