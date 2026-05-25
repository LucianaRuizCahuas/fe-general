import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { tourApi } from '../../api/tour.api';
import type { TourPackage } from '../../types/tour';

const initial: TourPackage = {
  packageName: '',
  descripcion: '',
  price: 0,
  startDate: '',
  endDate: '',
  state: 'A'
};

export default function Tours() {

  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [form, setForm] = useState<TourPackage>(initial);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // FILTRO
  const [filter, setFilter] = useState('all');

  // CARGAR DATOS
  async function load() {

    setLoading(true);

    try {

      setPackages(await tourApi.getAll());

    } catch {

      toast.error('No se pudo cargar paquetes');

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // FILTRAR PAQUETES
  const filteredPackages = packages.filter(pkg => {

    if (filter === 'active') return pkg.state === 'A';

    if (filter === 'inactive') return pkg.state === 'I';

    return true;
  });

  // MANEJO DE INPUTS
  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.name === 'price'
          ? Number(e.target.value)
          : e.target.value
    });
  };

  // VALIDACIONES
  function validate() {

    if (form.packageName.trim().length < 3) {
      return 'Nombre mínimo 3 caracteres';
    }

    if (form.descripcion.trim().length < 10) {
      return 'Descripción mínimo 10 caracteres';
    }

    if (!form.startDate || !form.endDate) {
      return 'Selecciona fechas';
    }

    if (form.endDate < form.startDate) {
      return 'La fecha fin no puede ser anterior';
    }

    if (form.price <= 0) {
      return 'Precio inválido';
    }

    return '';
  }

  // GUARDAR / ACTUALIZAR
  async function save(e: React.FormEvent) {

    e.preventDefault();

    const err = validate();

    if (err) {
      return toast.error(err);
    }

    setLoading(true);

    try {

      if (editing && form.id) {

        await tourApi.update(form.id, form);

        toast.success('Paquete actualizado');

      } else {

        await tourApi.save(form);

        toast.success('Paquete creado');
      }

      reset();

      await load();

    } catch {

      toast.error('Error al guardar paquete');

    } finally {

      setLoading(false);
    }
  }

  // EDITAR
  function edit(pkg: TourPackage) {

    setForm({ ...pkg });

    setEditing(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // LIMPIAR FORMULARIO
  function reset() {

    setForm(initial);

    setEditing(false);
  }

  // ACTIVAR / INACTIVAR
  async function action(
    fn: () => Promise<unknown>,
    msg: string
  ) {

    setLoading(true);

    try {

      await fn();

      toast.success(msg);

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
            Gestión de Paquetes Turísticos
          </h1>

          <p className="text-slate-600">
            Formulario y tabla migrados desde Angular.
          </p>

        </div>

        <button
          onClick={reset}
          className="btn-primary"
        >
          + Nuevo Paquete
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

          {editing
            ? 'Editar Paquete Turístico'
            : 'Nuevo Paquete Turístico'}

        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <Field label="Nombre del Paquete">
            <input
              name="packageName"
              value={form.packageName}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <Field label="Precio">
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <Field label="Fecha Inicio">
            <input
              name="startDate"
              type="date"
              value={form.startDate ?? ''}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <Field label="Fecha Fin">
            <input
              name="endDate"
              type="date"
              value={form.endDate ?? ''}
              onChange={change}
              className="input"
              required
            />
          </Field>

          <label className="grid gap-1 text-sm font-bold text-slate-700 md:col-span-2">

            Descripción

            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={change}
              className="input min-h-28"
              required
            />

          </label>

        </div>

        <div className="mt-5 flex gap-3">

          <button className="btn-primary">

            {editing ? 'Actualizar' : 'Agregar'}

          </button>

          {editing && (

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
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {filteredPackages.map(pkg => (

              <tr
                key={pkg.id}
                className={pkg.state === 'I' ? 'opacity-60' : ''}
              >

                <td>{pkg.id}</td>

                <td>{pkg.packageName}</td>

                <td>{pkg.descripcion}</td>

                <td>
                  ${Number(pkg.price).toFixed(2)}
                </td>

                <td>{pkg.startDate}</td>

                <td>{pkg.endDate}</td>

                <td>

                  <span
                    className={
                      pkg.state === 'A'
                        ? 'badge-ok'
                        : 'badge-off'
                    }
                  >

                    {pkg.state === 'A'
                      ? 'Activo'
                      : 'Inactivo'}

                  </span>

                </td>

                <td className="actions">

                  <button
                    onClick={() => edit(pkg)}
                    className="btn-small"
                  >
                    Editar
                  </button>

                  {pkg.state === 'A' ? (

                    <button
                      onClick={() =>
                        pkg.id &&
                        confirm('¿Inactivar paquete?') &&
                        action(
                          () => tourApi.delete(pkg.id!),
                          'Paquete inactivado'
                        )
                      }
                      className="btn-danger"
                    >
                      Inactivar
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        pkg.id &&
                        action(
                          () => tourApi.restore(pkg.id!),
                          'Paquete restaurado'
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