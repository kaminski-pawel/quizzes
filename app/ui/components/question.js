import { LitElement, html } from "lit";
import { resolveMarkdown } from "lit-markdown";

export class QuestionComponent extends LitElement {
  static properties = {
    question: { type: String },
    questionPk: { type: String },
  };

  constructor() {
    super();
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.question = data.content;
    this.questionPk = data.pk;
  }

  render() {
    return html`<h3>${resolveMarkdown(this.question)}</h3>
      <small>(Ref.no.:${this.questionPk})</small>`;
  }
}
customElements.define("ui-question", QuestionComponent);
