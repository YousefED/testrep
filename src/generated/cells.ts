
import * as c1 from "../../build/notebook/src/c1";
import * as c2 from "../../build/notebook/src/c2";
import "../../build/notebook/src/empty.css";
  
export default [c1,c2].map(mod => (mod as any).default);