export default class Component {
    get el() {
        return this._el || (this._el = this.createElement());
    }
}
