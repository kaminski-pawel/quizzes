import { LitElement, html } from "lit";
import "./../components/answers";
import "./../components/check";
import "./../components/explanation";
import "./../components/question";

export class NextPage extends LitElement {
  static properties = {
    selected: { type: Array },
    result: { type: Boolean | null },
  };

  constructor() {
    super();
    this.selected = [];
    this.result = null;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container">
        <ui-question></ui-question>
        <ui-answers @answer-selected="${this.answerSelected}"></ui-answers>
        <ui-check-btn
          .selected="${this.selected}"
          @question-result="${this.questionResult}"
        ></ui-check-btn>
        <p>Result ${this.result}</p>
        <ui-explanation .result="${this.result}"></ui-explanation>
      </div>
    `;
  }

  answerSelected(e) {
    this.selected = e.detail.value;
  }

  questionResult(e) {
    this.result = e.detail.value;
  }
}
customElements.define("next-question-page", NextPage);
