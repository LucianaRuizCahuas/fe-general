import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { customerApi } from '../../api/customer.api';
import type { Customer } from '../../types/customer';

const initial: Customer = {
  firstName: '',
  lastName: '',
  documentType: 'DNI',
  nroDocument: '',
  phone: '',
  email: '',
  estado: true,
};

export default function Customers() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState<Customer>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // FILTRO
  const [filter, setFilter] = useState('all');

  // CARGAR CLIENTES
  async function load() {

    setLoading(true);

    try {

      setCustomers(await customerApi.getAll());

    } catch {

      toast.error('No se pudo cargar clientes');

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // FILTRAR CLIENTES
  const filteredCustomers = customers.filter(c => {

    if (filter === 'active') return c.estado;

    if (filter === 'inactive') return !c.estado;

    return true;
  });

  // MANEJO INPUTS
  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // VALIDACIONES
  function validate() {

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(form.firstName)) {
      return 'Nombre inválido';
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(form.lastName)) {
      return 'Apellido inválido';
    }

    if (!/^[a-zA-Z0-9]{6,15}$/.test(form.nroDocument)) {
      return 'Documento inválido';
    }

    if (!/^[0-9]{7,15}$/.test(form.phone)) {
      return 'Teléfono inválido';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return 'Email inválido';
    }

    return '';
  }

  // GUARDAR / ACTUALIZAR
  async function save(e: React.FormEvent) {

    e.preventDefault();

    const error = validate();

    if (error) {
      return toast.error(error);
    }

    setLoading(true);

    try {

      if (editingId) {

        await customerApi.update(editingId, form);

        toast.success('Cliente actualizado');

      } else {

        const { id: _id, ...payload } = form;

        await customerApi.create(payload);

        toast.success('Cliente creado');
      }

      reset();

      await load();

    } catch {

      toast.error('Error al guardar cliente');

    } finally {

      setLoading(false);
    }
  }

  // EDITAR
  function edit(c: Customer) {

    setEditingId(c.id ?? null);

    setForm({
      ...initial,
      ...c
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // LIMPIAR FORM
  function reset() {

    setEditingId(null);

    setForm(initial);
  }

  // ACTIVAR / DESACTIVAR
  async function action(
    fn: () => Promise<unknown>,
    message: string
  ) {

    setLoading(true);

    try {

      await fn();

      toast.success(message);

      await load();

    } catch {

      toast.error('No se pudo completar la acción');

    } finally {

      setLoading(false);
    }
  }

  return (

    <section className="mx-auto max-w-7xl px-4 py-10">

      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

        <div>

          <h1 className="text-4xl font-black text-blue-950">
            Gestión de Clientes
          </h1>

          <p className="text-slate-600">
            Migrado desde Angular a React con la misma conexión al backend.
          </p>

        </div>

        <button
          onClick={reset}
          className="btn-primary"
        >
          + Nuevo Cliente
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="loader-bar">
          Cargando...
        </div>
      )}

      {/* FORMULARIO */}
      <form
        onSubmit={save}
        className="card-pro mb-8"
      >

        <h2 className="mb-5 text-2xl font-black text-blue-950">

          {editingId
            ? `Editando ID: ${editingId}`
            : 'Nuevo Cliente'}

        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <Field label="Nombre">
            <input
              name="firstName"
              value={form.firstName}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <Field label="Apellido">
            <input
              name="lastName"
              value={form.lastName}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <Field label="Tipo Documento">

            <select
              name="documentType"
              value={form.documentType}
              onChange={change}
              className="input"
            >
              <option>DNI</option>
              <option>PAS</option>
              <option>CE</option>
            </select>

          </Field>

          <Field label="Número Documento">
            <input
              name="nroDocument"
              value={form.nroDocument}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <Field label="Teléfono">
            <input
              name="phone"
              value={form.phone}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <Field label="Email">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              className="input"
              required
            />
          </Field>

        </div>

        <div className="mt-5 flex gap-3">

          <button className="btn-primary">

            {editingId ? 'Actualizar' : 'Guardar'}

          </button>

          {editingId && (

            <button
              type="button"
              onClick={reset}
              className="btn-secondary"
            >
              Cancelar
            </button>

          )}

        </div>

      </form>

      {/* FILTRO */}
      <div className="mb-4 flex justify-end">

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input max-w-xs"
        >
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>

      </div>

      {/* TABLA */}
      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map(c => (

              <tr
                key={c.id}
                className={!c.estado ? 'opacity-60' : ''}
              >

                <td>{c.id}</td>

                <td>
                  {c.firstName} {c.lastName}
                </td>

                <td>
                  {c.documentType} {c.nroDocument}
                </td>

                <td>{c.phone}</td>

                <td>{c.email}</td>

                <td>
                  <Badge active={c.estado} />
                </td>

                <td className="actions">

                  <button
                    onClick={() => edit(c)}
                    className="btn-small"
                  >
                    Editar
                  </button>

                  {c.estado ? (

                    <button
                      onClick={() =>
                        c.id &&
                        confirm('¿Desactivar cliente?') &&
                        action(
                          () => customerApi.deactivate(c.id!),
                          'Cliente desactivado'
                        )
                      }
                      className="btn-danger"
                    >
                      Desactivar
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        c.id &&
                        action(
                          () => customerApi.restore(c.id!),
                          'Cliente restaurado'
                        )
                      }
                      className="btn-ok"
                    >
                      Restaurar
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {

  return (

    <label className="grid gap-1 text-sm font-bold text-slate-700">

      {label}

      {children}

    </label>
  );
}

function Badge({
  active
}: {
  active?: boolean;
}) {

  return (

    <span className={active ? 'badge-ok' : 'badge-off'}>

      {active ? 'Activo' : 'Inactivo'}

    </span>
  );
}