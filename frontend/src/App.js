import { useEffect, useState } from "react";
import { FaMicrochip, FaMemory, FaHdd } from "react-icons/fa";
import "./App.css";

function App() {
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [disk, setDisk] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchMetrics = () => {
      fetch("http://127.0.0.1:5000/cpu")
        .then((res) => res.json())
        .then((data) => setCpu(data.cpu));

      fetch("http://127.0.0.1:5000/memory")
        .then((res) => res.json())
        .then((data) => setMemory(data.memory));

      fetch("http://127.0.0.1:5000/disk")
        .then((res) => res.json())
        .then((data) => setDisk(data.disk));

      setLastUpdated(new Date().toLocaleTimeString());
    };

    fetchMetrics();

    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const healthScore = Math.max(
    0,
    Math.round(100 - cpu / 2 - memory / 2 - disk / 4)
  );

  const getMetricColor = (value) => {
    if (value >= 80) return "#ef4444";
    if (value >= 50) return "#facc15";
    return "#22c55e";
  };

  const getHealthStatus = (score) => {
    if (score >= 80) return "HEALTHY";
    if (score >= 60) return "WARNING";
    return "CRITICAL";
  };

  const getHealthColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#facc15";
    return "#ef4444";
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>WATCHOVER</h1>
        <p>Infrastructure Monitoring Dashboard</p>
      </div>

      <div className="health-card">
        <h3>SYSTEM STATUS</h3>

        <div
          className="health-score"
          style={{
            color: getHealthColor(healthScore),
          }}
        >
          {healthScore}
        </div>

        <div className="health-text">/100</div>

        <div
          className="health-badge"
          style={{
            color: getHealthColor(healthScore),
          }}
        >
          {getHealthStatus(healthScore)}
        </div>

        <p className="updated">
          LAST UPDATED: {lastUpdated}
        </p>
      </div>

      <div className="metrics">
        <div className="metric-card cpu-card">
          <FaMicrochip className="icon" />

          <h3>CPU</h3>

          <div
            className="metric-value"
            style={{
              color: getMetricColor(cpu),
            }}
          >
            {cpu}%
          </div>
        </div>

        <div className="metric-card memory-card">
          <FaMemory className="icon" />

          <h3>MEMORY</h3>

          <div
            className="metric-value"
            style={{
              color: getMetricColor(memory),
            }}
          >
            {memory}%
          </div>
        </div>

        <div className="metric-card disk-card">
          <FaHdd className="icon" />

          <h3>STORAGE</h3>

          <div
            className="metric-value"
            style={{
              color: getMetricColor(disk),
            }}
          >
            {disk}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;