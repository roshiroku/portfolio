export default abstract class Component<T extends keyof HTMLElementTagNameMap> {
  protected _el?: HTMLElementTagNameMap[T];

  get el() {
    return this._el || (this._el = this.createElement());
  }

  abstract createElement(): HTMLElementTagNameMap[T];
}