// this file is used to make sure the cells compile
import { IContext } from ".";

declare global {
  /**
   * The context containing the exports of all cells
   */
  const $: IContext;
}
