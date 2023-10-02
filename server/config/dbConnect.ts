import mongoose from 'mongoose';

const dbConnect = () => {

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // mongoose.set('strictQuery', false);
  mongoose.connect(process.env.DB_URI as string)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
};

export default dbConnect;