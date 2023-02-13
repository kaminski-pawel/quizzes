import { LitElement, html } from "lit";

export class CheckComponent extends LitElement {
  static properties = {
    targetUrl: { type: String },
  };

  constructor() {
    super();
    this.targetUrl = "";
  }

  render() {
    return html`
      <button type="button" @click=${this.handleClick} class="btn btn-primary">
        Check
      </button>
    `;
  }

  handleClick(event) {
    console.log(event);
  }
}
