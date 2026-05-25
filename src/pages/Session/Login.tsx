import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../../api/auth.api';

export default function Login() {
  const navigate = useNavigate();
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = String(form.get('username') || '');
    const password = String(form.get('password') || '');
    if (login(username, password)) {
      toast.success('Sesión iniciada correctamente');
      navigate(username === 'admin' ? '/admin' : '/dashboard');
    } else toast.error('Credenciales incorrectas');
  }
  return <section className="auth-bg"><form onSubmit={submit} className="auth-card"><h1>Iniciar sesión</h1><p>Ingresa con tu cuenta de Angoma Tours.</p><input name="username" className="input" placeholder="Correo o usuario" required /><input name="password" type="password" className="input" placeholder="Contraseña" required /><button className="btn-primary w-full">Entrar</button><p className="text-center text-sm">¿No tienes cuenta? <Link className="link" to="/register">Regístrate</Link></p><div className="rounded-xl bg-slate-100 p-3 text-xs text-slate-600"><b>Pruebas:</b> admin/admin123 o user/user123</div></form></section>;
}
