import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { getAllData } from '../../services/Funciones_votaciones';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LinesChart() {
  const [sumaVotosPorCategoria, setSumaVotosPorCategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nuevosrepre = await getAllData();

        console.log('Datos obtenidos:', nuevosrepre);

        const representantesPorCategoria = {};

        if (Array.isArray(nuevosrepre)) {
          nuevosrepre.forEach((representante) => {
            const { categoria, firstname, votos } = representante;

            if (!representantesPorCategoria[categoria]) {
              representantesPorCategoria[categoria] = [];
            }

            representantesPorCategoria[categoria].push({
              firstname,
              votos,
            });
          });
        } else {
          console.error('Los datos recibidos no están en el formato esperado.');
        }

        setSumaVotosPorCategoria(representantesPorCategoria);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const nombresRepresentantes = Object.values(sumaVotosPorCategoria).flatMap((categoria) =>
    categoria.map((representante) => representante.firstname)
  );

  const datasets = Object.entries(sumaVotosPorCategoria).map(([categoria, representantes]) => ({
    label: categoria,
    data: representantes.map((representante) => representante.votos),
    tension: 0.5,
    fill: true,
    borderColor: getRandomColor(),
    backgroundColor: getRandomColor(0.5),
    pointRadius: 5,
    pointBorderColor: 'rgba(255, 99, 132)',
    pointBackgroundColor: 'rgba(255, 99, 132)',
  }));

  const data = {
    labels: nombresRepresentantes,
    datasets,
  };

  const options = {
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: 'rgb(255, 99, 132)' },
      },
    },
  };

  return <Line data={data} options={options} />;
}

function getRandomColor(alpha = 1) {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `${color}${Math.round(alpha * 255).toString(16)}`;
}
