import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    const mongoDbUsername = process.env.MONGO_DB_USERNAME;
    const mongoDbPassword = process.env.MONGO_DB_PASSWORD;

    try {
        await mongoose.connect(`mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.fnmec.mongodb.net/mad-scientist`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connected to mongoose');
    } catch (error) {
        throw new Error('Error connecting to database!');
    }

    const port = process.env.PORT || 2000;

    app.listen(port, () => {
        console.log('Listening on port:' + port);
    });
}

start();