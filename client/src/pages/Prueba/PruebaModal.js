import React from 'react';

const PruebaModal = ({ values, handleChanges, handleSubmit, closeModal }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
      <div className="modal-dialog modal-fullscreen" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">Editar Prueba: {values.prueba}</h5>
            <button type="button" className="btn-close" onClick={closeModal} aria-label="Cerrar"></button>
          </div>
          <div className="modal-body mx-auto justify-content-center col-12 col-md-6 col-xl-6">
            <form className="col" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="prueba" className="form-label">Nombre de la Prueba</label>
                <input
                  type="text"
                  className="form-control"
                  name="prueba"
                  id="prueba"
                  value={values.prueba}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="escenario" className="form-label">Escenario</label>
                <input
                  type="text"
                  className="form-control"
                  name="escenario"
                  id="escenario"
                  value={values.escenario}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
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
                <label className="form-label">Prioridad</label>
                <div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="prioridad"
                      id="prioridadAlta"
                      value="Alta"
                      checked={values.prioridad === "Alta"}
                      onChange={handleChanges}
                    />
                    <label className="form-check-label" htmlFor="prioridadAlta">Alta</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="prioridad"
                      id="prioridadMedia"
                      value="Media"
                      checked={values.prioridad === "Media"}
                      onChange={handleChanges}
                    />
                    <label className="form-check-label" htmlFor="prioridadMedia">Media</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="prioridad"
                      id="prioridadBaja"
                      value="Baja"
                      checked={values.prioridad === "Baja"}
                      onChange={handleChanges}
                    />
                    <label className="form-check-label" htmlFor="prioridadBaja">Baja</label>
                  </div>
                </div>
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

export default PruebaModal;