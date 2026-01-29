declare module 'webgl-fluid-enhanced' {
  export default class WebGLFluidEnhanced {
    constructor(canvas: HTMLCanvasElement): void;
    start(): void;
    stop(): void;
    multipleSplats(count: number): void;
  }
}
