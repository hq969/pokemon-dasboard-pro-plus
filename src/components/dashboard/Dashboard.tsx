import React, { useState } from 'react';
import { useGetAllPokemonNameQuery } from '../../redux/pokemon/pokemon';
import { useSelector } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import Loader from '../shared/Loader';
import Error from '../shared/Error';
import './Dashboard.css';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend
);

const Dashboard = () => {
  // State for tab toggle
  const [activeTab, setActiveTab] = useState<'overview' | 'trends'>('overview');
  
  // Fetch the total list of Pokemon for count
  const { data: allPokemon, error, isFetching } = useGetAllPokemonNameQuery();
  
  // Getting favorites info from redux
  const favorites = useSelector((state: any) => state.favLocalStorage.favorites || []);
  
  // Sample chart data for Pokemon type distribution
  const chartData = {
    labels: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Rock', 'Ground', 'Flying'],
    datasets: [
      {
        label: 'Pokemon Distribution by Type',
        data: [52, 132, 70, 44, 57, 46, 32, 101],
        backgroundColor: [
          '#FF6B6B',
          '#4ECDC4', 
          '#45B7D1',
          '#96CEB4',
          '#FFEAA7',
          '#DDA0DD',
          '#98D8C8',
          '#F7DC6F'
        ],
        borderColor: [
          '#FF5252',
          '#26A69A',
          '#2196F3', 
          '#66BB6A',
          '#FFD54F',
          '#BA68C8',
          '#4DB6AC',
          '#FFB74D'
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const
          },
          color: '#333'
        }
      },
      title: {
        display: true,
        text: 'Pokemon Distribution by Type',
        font: {
          size: 18,
          weight: 'bold' as const
        },
        color: '#333'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0'
        },
        ticks: {
          color: '#666'
        }
      },
      x: {
        grid: {
          color: '#e0e0e0'
        },
        ticks: {
          color: '#666'
        }
      }
    }
  };

  // Trends data for the line chart
  const trendsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Favorites Collected',
        data: [2, 5, 7, 4, 8, 10, 6],
        fill: false,
        backgroundColor: '#45B7D1',
        borderColor: '#45B7D1',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#45B7D1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Pokemon Discovered',
        data: [5, 8, 12, 7, 15, 18, 14],
        fill: false,
        backgroundColor: '#FF6B6B',
        borderColor: '#FF6B6B',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FF6B6B',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ],
  };

  const trendsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const
          },
          color: '#333'
        }
      },
      title: {
        display: true,
        text: 'Pokemon Activity Trends (Last 7 Days)',
        font: {
          size: 18,
          weight: 'bold' as const
        },
        color: '#333'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0'
        },
        ticks: {
          color: '#666'
        }
      },
      x: {
        grid: {
          color: '#e0e0e0'
        },
        ticks: {
          color: '#666'
        }
      }
    }
  };

  if (isFetching) return <Loader />;
  if (error) return <Error error={error} data="Dashboard" />;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Pokemon Dashboard</h1>
        <p>Your comprehensive Pokemon statistics and analytics</p>
      </header>

      {/* Tab Toggle Controls */}
      <div className="dashboard-toggle" role="tablist" aria-label="Dashboard view toggle">
        <button
          className={`toggle-btn ${activeTab === 'overview' ? 'active-toggle-btn' : ''}`}
          onClick={() => setActiveTab('overview')}
          aria-label="View Overview"
          role="tab"
          aria-selected={activeTab === 'overview'}
        >
          Overview
        </button>
        <button
          className={`toggle-btn ${activeTab === 'trends' ? 'active-toggle-btn' : ''}`}
          onClick={() => setActiveTab('trends')}
          aria-label="View Trends"
          role="tab"
          aria-selected={activeTab === 'trends'}
        >
          Trends
        </button>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <>
          <section className="dashboard-stats">
            <div className="stats-card total-pokemon">
              <div className="stats-icon">🎯</div>
              <div className="stats-content">
                <h2>Total Pokemon</h2>
                <p className="stats-number">{allPokemon ? allPokemon.length.toLocaleString() : 0}</p>
                <span className="stats-label">Available in Pokedex</span>
              </div>
            </div>
            
            <div className="stats-card favorite-pokemon">
              <div className="stats-icon">❤️</div>
              <div className="stats-content">
                <h2>Favorite Pokemon</h2>
                <p className="stats-number">{favorites.length}</p>
                <span className="stats-label">Added to favorites</span>
              </div>
            </div>

            <div className="stats-card completion-rate">
              <div className="stats-icon">📊</div>
              <div className="stats-content">
                <h2>Collection Rate</h2>
                <p className="stats-number">
                  {allPokemon ? Math.round((favorites.length / allPokemon.length) * 100) : 0}%
                </p>
                <span className="stats-label">Favorites vs Total</span>
              </div>
            </div>
          </section>

          <section className="dashboard-chart">
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} height={400} />
            </div>
          </section>

          <section className="dashboard-insights">
            <div className="insight-card">
              <h3>Quick Insights</h3>
              <ul>
                <li>Water-type Pokemon are the most common with 132 species</li>
                <li>Flying-type Pokemon follow closely with 101 species</li>
                <li>You have collected {favorites.length} favorite Pokemon so far</li>
                <li>
                  {favorites.length > 0 
                    ? `Keep exploring to discover more amazing Pokemon!` 
                    : `Start adding Pokemon to your favorites to track your collection!`
                  }
                </li>
              </ul>
            </div>
          </section>
        </>
      )}

      {/* Trends Tab Content */}
      {activeTab === 'trends' && (
        <section className="dashboard-trends">
          <header className="trends-header">
            <h2>Activity Trends Analysis</h2>
            <p>Track your Pokemon discovery and collection patterns over time</p>
          </header>

          <div className="trends-stats">
            <div className="trend-stat-card">
              <h3>Weekly Summary</h3>
              <div className="trend-metrics">
                <div className="metric">
                  <span className="metric-label">Total Discovered</span>
                  <span className="metric-value">79</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Added to Favorites</span>
                  <span className="metric-value">42</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Most Active Day</span>
                  <span className="metric-value">Saturday</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <Line data={trendsData} options={trendsOptions} height={400} />
          </div>

          <section className="trends-insights">
            <div className="insight-card">
              <h3>Trend Analysis</h3>
              <ul>
                <li>Your activity peaked on Saturday with 18 Pokemon discovered</li>
                <li>You consistently add 4-10 Pokemon to favorites daily</li>
                <li>Weekend activity is 40% higher than weekdays</li>
                <li>Your discovery rate has increased by 25% this week</li>
              </ul>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default Dashboard;

