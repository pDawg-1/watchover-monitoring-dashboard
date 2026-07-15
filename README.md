# WatchOver

WatchOver is a lightweight full-stack system-monitoring dashboard. It collects CPU, memory, and disk usage from the machine running the backend and displays the metrics in a React dashboard that refreshes every five seconds.

## Features

- Live CPU, memory, and disk usage
- Automatic five-second metric refresh
- Color-coded resource indicators
- Calculated system health score
- Responsive metric-card layout
- Flask REST API backed by `psutil`

## Architecture

```text
Operating system
      |
      | psutil reads system metrics
      v
Flask backend (port 5000)
      |
      | JSON over HTTP
      v
React frontend (port 3000)
      |
      v
WatchOver dashboard
```

The frontend polls three Flask endpoints. The backend reads the host machine's current statistics and returns them as JSON. There is currently no database, so WatchOver displays live values without storing metric history.

## Technology Stack

### Frontend

- React
- JavaScript and JSX
- CSS
- React Icons
- React Testing Library

### Backend

- Python
- Flask
- Flask-CORS
- psutil

## API Endpoints

| Method | Endpoint | Purpose | Example response |
| --- | --- | --- | --- |
| GET | `/` | Backend status | `{"message": "WatchOver Backend Running"}` |
| GET | `/cpu` | CPU utilization | `{"cpu": 24.5}` |
| GET | `/memory` | Memory utilization | `{"memory": 61.2}` |
| GET | `/disk` | Disk utilization | `{"disk": 72.8}` |

## Run Locally

### 1. Start the backend

```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

The backend runs at `http://127.0.0.1:5000`.

### 2. Start the frontend

Open another terminal:

```powershell
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000`.

If PowerShell blocks the npm script wrapper, use `npm.cmd` instead of `npm`.

## Health Score

The dashboard calculates a simple weighted score:

```text
health score = 100 - CPU/2 - memory/2 - disk/4
```

The result is rounded and prevented from dropping below zero.

| Score | Status |
| --- | --- |
| 80-100 | Healthy |
| 60-79 | Warning |
| 0-59 | Critical |

This is a project-specific heuristic rather than an industry-standard health formula.

## Tests

Run the frontend test suite with:

```powershell
cd frontend
npm test -- --watchAll=false
```

## Current Limitations

- Monitors only the machine running the Flask backend
- Does not store historical metrics
- Uses polling rather than live streaming
- Does not yet show a loading indicator while requests are in progress
- Uses hard-coded local API addresses
- Uses Flask's development server

## Possible Improvements

- Add an aggregated `/metrics` endpoint
- Store timestamped metrics for historical charts
- Add configurable alerts and thresholds
- Monitor multiple machines
- Add authentication and restricted CORS settings
- Move API configuration into environment variables
- Deploy behind a production WSGI server
