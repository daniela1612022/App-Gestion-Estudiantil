import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllData } from '../../services/Funciones_votaciones';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  scales: {
    y: {
      min: 0,
    },
    x: {
      ticks: { color: 'rgba(0, 0, 0)' },
    },
  },
  animation: false, // Desactiva la animación
};

export default function BarsChart() {
  const [sumaCalificacionesPorCategoria, setSumaCalificacionesPorCategoria] = useState({});
  const [representantes, setRepresentantes] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nuevosrepre = await getAllData();

        const representantesPorCategoria = {};
        nuevosrepre.forEach((representante) => {
          const { categoria, firstname, notas } = representante;

          if (!representantesPorCategoria[categoria]) {
            representantesPorCategoria[categoria] = [];
          }

          representantesPorCategoria[categoria].push({
            firstname,
            sumaCalificaciones: notas.reduce((acc, nota) => acc + nota, 0),
          });
        });

        setRepresentantes(nuevosrepre || []);
        setSumaCalificacionesPorCategoria(representantesPorCategoria);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const representantesPorFila = [];
  for (let i = 0; i < representantes.length; i += 3) {
    representantesPorFila.push(representantes.slice(i, i + 3));
  }

  const categorias = Object.keys(sumaCalificacionesPorCategoria);

  const dataPorCategoria = categorias.map((categoria) => {
    const representantesEnCategoria = sumaCalificacionesPorCategoria[categoria];

    return {
      labels: representantesEnCategoria.map((rep) => rep.firstname),
      datasets: [
        {
          label: `Suma de Calificaciones - ${categoria}`,
          data: representantesEnCategoria.map((rep) => rep.sumaCalificaciones),
          backgroundColor: 'rgba(108, 30, 153, 0.5)',
        },
      ],
    };
  });

  return (
    <div>
      {dataPorCategoria.map((data, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div>
            <Bar ref={chartRef} data={data} options={chartOptions} />
          </div>
        </div>
      ))}
    </div>
  );
}
