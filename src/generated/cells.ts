import * as c1 from "../../build/notebook/c1";
import * as c2 from "../../build/notebook/c2";
  
export default [c1,c2].map(mod => (mod as any).default);