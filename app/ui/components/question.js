import { LitElement, html } from "lit";

export class QuestionComponent extends LitElement {
  static properties = {
    question: { type: String },
  };

  constructor() {
    super();
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.question = data.content;
  }

  render() {
    return html`<h3>${this.question}</h3>`;
  }
}
customElements.define("ui-question", QuestionComponent);
