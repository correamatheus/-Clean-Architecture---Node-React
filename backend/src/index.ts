import { createApp } from './infra/server/expressApp';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
