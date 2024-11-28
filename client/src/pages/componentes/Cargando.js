
import React from 'react'

function Loding() {

  return (
    <div>
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Cargando...</div>
      </div>
    </div>
  );
}

export default Loding;

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    color: '#333',
  },
  loadingText: {
    fontWeight: 'bold',
  },
};
