import Component from "./Component.js";
import { createElement } from "./utils.js";

export default class Cell extends Component<"button"> {
  readonly index;
  protected _value = "";

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = this.el.innerText = value;
    this.el.disabled = !!value;
  }

  constructor(index: number) {
    super();
    this.index = index;
  }

  createElement() {
    const el = createElement("button", [this.value]);
    return el;
  }
}