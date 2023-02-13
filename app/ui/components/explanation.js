import { LitElement, html } from "lit";

export class ExplanationComponent extends LitElement {
  static properties = {
    explanation: { type: String },
  };

  constructor() {
    super();
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.explanation = data.explanation.content;
    console.log("this.explanation", this.explanation);
  }

  render() {
    return html`<p style="visibility: hidden;">${this.explanation}</p>`;
  }
}
