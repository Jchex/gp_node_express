import React from 'react';

const UsuarioModal = ({ values, handleChanges, handleSubmit, closeModal }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-fullscreen" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario: {values.nombre}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body mx-auto justify-content-center col-12 col-md-6 col-xl-6">
            <form className="col" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  value={values.nombre}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email del Usuario</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="pass" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="pass"
                  id="pass"
                  value={values.pass}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="rol" className="form-label">Rol del Usuario</label>
                <select
                  className="form-select"
                  name="rol"
                  id="rol"
                  value={values.rol} // Cargar el rol actual del usuario
                  onChange={handleChanges}
                  required
                >
                  <option value="">Seleccione un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Desarrollador">Desarrollador</option>
                  <option value="Tester">Tester</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioModal;