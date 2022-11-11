declare module "gameloop" {
    type NumberOrContext<T extends "update" | "draw"> = T extends "update"
      ? number
      : CanvasRenderingContext2D;
  
    interface Game {
      on: <T extends "update" | "draw">(type: T, cb: (arg: NumberOrContext<T>) => void) => void;
      start: () => void;
      pause: () => void;
    }
  
    interface Options {
      renderer: CanvasRenderingContext2D;
    }
  
    const createGame: (options: Options) => Game;
  
    export { Game };
  
    export default createGame;
  }
  