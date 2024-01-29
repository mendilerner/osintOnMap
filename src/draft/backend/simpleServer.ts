import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is your Express server with TypeScript!');
  console.log(JSON.stringify(req));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});