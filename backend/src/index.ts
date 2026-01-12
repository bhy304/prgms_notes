import app from './app';
import { PORT } from './settings';

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
