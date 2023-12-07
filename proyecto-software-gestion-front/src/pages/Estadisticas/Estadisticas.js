import React from 'react';
import LinesChart from '../Estadisticas/LinesChart';
import BarsChart from './BarsChart';

export default function Estadisticas() {
  return (
    <div style={styles.container}>
      <h1 className="bg-info text-center font-monospace fw-bold lh-base" style={styles.title}>
        Gráficas
      </h1>

      <div className="d-flex justify-content-between" style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Líneas Chart</h2>
          <div className="bg-light mx-auto border border-2 border-primary" style={styles.chart}>
            <LinesChart />
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Barras Chart</h2>
          <div className="bg-light mx-auto border border-2 border-primary" style={styles.chart}>
            <BarsChart />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#3f0069',
    borderRadius: '8px',
    color: '#000',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '900px', // Ancho suficiente para colocar las dos tarjetas una al lado de la otra
    marginBottom: '20px',
  },
  card: {
    width: '400px',
    padding: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  chart: {
    width: '100%',
    height: '230px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardTitle: {
    marginBottom: '15px',
    color: '#000',
  },
  title: {
    color: '#fff',
  },
};
