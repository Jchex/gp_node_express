import React from 'react';

const DefectoModal = ({ values, handleChanges, handleSubmit, closeModal }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-fullscreen" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Defecto: {values.defecto}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body mx-auto justify-content-center col-12 col-md-6 col-xl-6">
            <form className="col" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="defecto" className="form-label">Nombre del Defecto</label>
                <input
                  type="text"
                  className="form-control"
                  name="defecto"
                  id="defecto"
                  value={values.defecto}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción del Defecto</label>
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

export default DefectoModal;