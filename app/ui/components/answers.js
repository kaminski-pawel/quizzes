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
  }

  render() {
    return html`
      ${this.shuffle(this.answers).map(
        (answer, idx) => html`
          <div class="form-check">
            <input
              class="form-check-input"
              type="${this.checkboxType}"
              name="ui-answers-checkbox"
              id="ui-answers-checkbox-${idx}"
              @click=${() => this.handleClick(answer.pk)}
            />
            <label class="form-check-label" for="ui-answers-checkbox-${idx}">
              <b>${idx + 1})</b>
              ${answer.content} ${answer.pk}
              <b> (${answer.is_correct})</b>
            </label>
          </div>
        `
      )}
    `;
  }

  handleClick(pk) {
    this.dispatchEvent(
      new CustomEvent("answer-selected", {
        detail: { value: [pk] },
      })
    );
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
customElements.define("ui-answers", AnswersComponent);
