import React from 'react';
import Select from 'react-select';

const AsignacionModal = ({ values, handleChanges, handleSubmit, closeModal, defectos, handleDefectosChange }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-fullscreen" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Realización de Prueba: ${values.proyecto}`}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body mx-auto justify-content-center col-12 col-md-6 col-xl-6">
            <form className="row" onSubmit={handleSubmit}>
              <div className="mb-3 col-6">
                <label htmlFor="proyecto" className="form-label">Proyecto</label>
                <input
                  type="text"
                  className="form-control"
                  name="proyecto"
                  id="proyecto"
                  value={values.proyecto}
                  onChange={handleChanges}
                  disabled
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="usuario_id" className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="usuario_id"
                  id="usuario_id"
                  value={values.usuario_id}
                  onChange={handleChanges}
                  disabled
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="prueba" className="form-label">Prueba</label>
                <input
                  type="text"
                  className="form-control"
                  name="prueba"
                  id="prueba"
                  value={values.prueba}
                  onChange={handleChanges}
                  disabled
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="fecha_finalizacion" className="form-label">Fecha de Finalización</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_finalizacion"
                  id="fecha_finalizacion"
                  value={values.fecha_finalizacion}
                  onChange={handleChanges}
                  disabled
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="defectos" className="form-label">Defectos Encontrados</label>
                <Select
                  isMulti
                  className="form-control-lg"
                  name="defectos"
                  options={defectos} //usa el select react para filtrar los datos
                  value={values.defectos}
                  onChange={handleDefectosChange}
                  placeholder="Seleccione defectos"
                  required
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="fecha_ejecucion" className="form-label">Fecha de Realización de Prueba</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_ejecucion"
                  id="fecha_ejecucion"
                  min={values.fecha_asignacion}
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="resultado" className="form-label">Resultado</label>
                <input
                  type="text"
                  className="form-control"
                  name="resultado"
                  id="resultado"
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="criterio" className="form-label">Criterios de aceptación</label>
                <input
                  type="text"
                  className="form-control"
                  name="criterio"
                  id="criterio"
                  onChange={handleChanges}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Realizar Prueba
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignacionModal;