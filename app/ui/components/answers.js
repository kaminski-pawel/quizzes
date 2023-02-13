import { LitElement, html } from "lit";

export class AnswersComponent extends LitElement {
  static properties = {
    answers: { type: Array },
    checkboxType: { type: String },
  };

  constructor() {
    super();
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.answers = data.answers;
    this.checkboxType = data.widget === "CM" ? "checkbox" : "radio";
    // this.checkboxType = "checkbox";
  }

  render() {
    return html`
      ${this.answers.map(
        (answer, idx) => html`
          <div class="form-check">
            <input
              class="form-check-input"
              type="${this.checkboxType}"
              name="ui-answers-checkbox"
              id="ui-answers-checkbox-${idx}"
            />
            <label class="form-check-label" for="ui-answers-checkbox-${idx}">
              <b>${idx + 1})</b>
              ${answer.content}
              <b> (${answer.is_correct})</b>
            </label>
          </div>
        `
      )}
    `;
  }
}
