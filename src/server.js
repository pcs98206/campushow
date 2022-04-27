import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use('/static', express.static("assets"));

app.use("/", globalRouter);

const handleListen = () => console.log(`Listening on : ✅ http://localhost:${PORT}/`);

app.listen(PORT, handleListen);