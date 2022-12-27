import express from "express";
import cors from "cors";
import routes from "./routes/routes";

class App {
  public app: express.Express;
  constructor() {
    this.app = express();
    this.config();
  }
  public config(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
  }
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
