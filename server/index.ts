import * as express from 'express';
import * as path from 'path';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, '../react-app/target/bundle')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../react-app/target/bundle', 'index.html'));
});

app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});