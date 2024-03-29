import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Server } from 'socket.io';

dotenv.config();

const App = express();
const server = http.createServer(App);

const PORT = process.env.PORT;
const COINGECKO_API = process.env.COINGECKO_API;

App.use(cors());
App.use(morgan('combined'));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const fetchCoinData = async () => {
  try {
    const response = await fetch(COINGECKO_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching coin data:', error);
    throw error;
  }
};

setInterval(async () => {
  try {
    const data = await fetchCoinData();
    if (data) {
      io.emit('coin-update', data.coins);
    }
  } catch (error) {
    console.log('Error fetching coin data:', error);
  }
}, 5000);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  fetchCoinData()
    .then((data) => {
      if (data) {
        socket.emit('coin-update', data.coins);
      }
    })
    .catch((error) => {
      console.log('Error sending initial coin data to client:', error);
    });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
