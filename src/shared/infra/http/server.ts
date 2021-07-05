/* eslint-disable no-console */
import app from '@shared/infra/http/app';

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(` 💻 Started: ${PORT}`);
});
