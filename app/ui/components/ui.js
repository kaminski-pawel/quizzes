import { LitElement, html } from "lit";

export class SimpleGreeting extends LitElement {
  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = "Somebody";
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
customElements.define("simple-greeting", SimpleGreeting);