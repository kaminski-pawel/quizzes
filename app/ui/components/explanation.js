import { LitElement, html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { resolveMarkdown } from "lit-markdown";

export class ExplanationComponent extends LitElement {
  static properties = {
    explanation: { type: String },
    result: { type: Boolean | null },
  };

  constructor() {
    super();
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.explanation =
      data.explanation?.content || "<h1>❌</h1><h4>Wrong answer</h4>";
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const failStyle = {
      visibility: this.result === false ? "visible" : "hidden",
    };
    const successStyle = {
      visibility: this.result === true ? "hidden" : "visible",
    };
    return html`
      <span>
        ${this.result === true
          ? html`<div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Well done! 😀</h4>
            </div>`
          : ""}
        <div
          style="${styleMap(failStyle)}"
          class="alert alert-danger"
          role="alert"
        >
          ${resolveMarkdown(this.explanation)}
        </div>
      </span>
    `;
  }
}
customElements.define("ui-explanation", ExplanationComponent);
