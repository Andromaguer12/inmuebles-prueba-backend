import mongoose from 'mongoose';

const initConnection = (URI: string): void => {
  // configs
  mongoose.set('strictQuery', false);

  // connection
  mongoose.connect(URI);

  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('DB-CONNECTED');
  });

  connection.on('error', (err) => {
    console.log('MONGODB_ERROR-> ', err);
    process.exit(0);
  });
};

export default initConnection;
