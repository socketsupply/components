import * as toaster from "./toaster"

declare global {
  interface HTMLElementTagNameMap {
    "tonic-toaster": toaster.TonicToaster;
  }
}

declare function components (Tonic: object): void
declare namespace components {}

export = components;
