import { LitElement, html } from "lit";
import "./../components/answers";
import "./../components/check";
import "./../components/explanation";
import "./../components/question";

export class NextPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container">
        <ui-question></ui-question>
        <ui-answers></ui-answers>
        <ui-check-btn></ui-check-btn>
        <ui-explanation></ui-explanation>
      </div>
    `;
  }
}
customElements.define("next-question-page", NextPage);
