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
    this.explanation = data.explanation.content;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const style = { visibility: this.result === false ? "visible" : "hidden" };
    return html`
      <div style="${styleMap(style)}" class="alert alert-danger" role="alert">
        ${resolveMarkdown(this.explanation)}
      </div>
    `;
  }
}
customElements.define("ui-explanation", ExplanationComponent);
