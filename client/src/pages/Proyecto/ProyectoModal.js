import React from 'react';

const ProyectoModal = ({ values, handleChanges, handleSubmit, closeModal }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-fullscreen" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Proyecto {values.nombre}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body mx-auto justify-content-center col-12 col-md-6 col-xl-6">
            <form className="col" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del Proyecto</label>
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
                <label htmlFor="descripcion" className="form-label">Descripción del Proyecto</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  id="descripcion"
                  value={values.descripcion}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fechai" className="form-label">Fecha Inicio</label>
                <input
                  type="date"
                  className="form-control"
                  name="fechai"
                  id="fechai"
                  value={values.fechai}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fechaf" className="form-label">Fecha Final</label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaf"
                  id="fechaf"
                  value={values.fechaf}
                  onChange={handleChanges}
                  required
                />
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

export default ProyectoModal;