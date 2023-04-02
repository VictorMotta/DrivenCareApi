import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/index.js';
import 'dotenv/config';
import handleApplicationErrors from './middlewares/errorMiddleware.js';

const app = express();

app.use(json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
