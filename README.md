# WatchOver

WatchOver is a system monitoring dashboard that provides a live view of key system metrics such as CPU, memory, and storage usage. The goal of this project was to gain hands-on experience building a full-stack application that connects a React frontend with a Flask backend while working with real-time system data.

## What It Does

- Displays live CPU usage
- Displays live memory usage
- Displays live storage usage
- Calculates an overall system health score
- Updates metrics automatically every few seconds
- Shows the last refresh time
- Uses a custom neon-themed dashboard interface

## Why I Built It

I wanted to build a project that goes beyond simple CRUD applications and works with real system information. This project helped me understand how frontend and backend applications communicate through APIs while also giving me experience working with system monitoring libraries and real-time updates.

## Technologies Used

### Frontend
- React
- CSS
- React Icons

### Backend
- Flask
- Flask-CORS
- psutil

## Project Structure

```text
watchover-monitoring-dashboard
│
├── backend
│   └── app.py
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── App.js
│   │   ├── App.css
│   │   └── other React files
│   │
│   └── package.json
│
└── .gitignore
```

## Running the Project

### Backend

```bash
cd backend
pip install flask flask-cors psutil
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

and connects to the Flask API running on:

```text
http://127.0.0.1:5000
```

## What I Learned

While building WatchOver, I gained experience with:

- Creating REST APIs using Flask
- Consuming APIs in React
- Managing component state with React Hooks
- Working with real-time data updates
- Using Git and GitHub for version control
- Debugging frontend and backend integration issues

## Future Improvements

Some features I would like to add in future versions include:

- Network monitoring
- Process monitoring
- Historical charts and trends
- User authentication
- Docker deployment
- Alert notifications for critical system conditions

## Author

**Prathithi Korwar**

Master of Engineering in Computer Science  
University of Cincinnati
