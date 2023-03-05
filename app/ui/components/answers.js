import { LitElement, html } from "lit";

export class AnswersComponent extends LitElement {
  static properties = {
    answers: { type: Array },
    checkboxes: { type: Array },
    checkboxType: { type: String },
  };

  constructor() {
    super();
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.answers = data.answers;
    this.checkboxes = this.getPkToIsFalseMapping();
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
              @change=${() => this.handleChange(answer.pk)}
            />
            <label class="form-check-label" for="ui-answers-checkbox-${idx}">
              <b>${idx + 1})</b>
              ${answer.content}
            </label>
          </div>
        `
      )}
    `;
  }

  getPkToIsFalseMapping() {
    return Object.assign({}, ...this.answers.map((a) => ({ [a.pk]: false })));
  }

  handleChange(pk) {
    if (this.checkboxType === "checkbox") {
      this.checkboxes[pk] = !this.checkboxes[pk];
      this.dispatchEvent(
        new CustomEvent("answer-selected", {
          detail: { value: this.getOnlySelected(this.checkboxes) },
        })
      );
    } else if (this.checkboxType === "radio") {
      this.dispatchEvent(
        new CustomEvent("answer-selected", {
          detail: { value: [pk] },
        })
      );
    }
  }

  /**
   * Turn a PkToIsSelected mapping into an filtered array.
   * @param {obj} PkToIsSelected mapping, e.g. `{12: false, 11: false, 10: true}`
   * @returns an array of only selected items, e.g. `[10]`
   */
  getOnlySelected(obj) {
    const selectedCheckboxes = Object.fromEntries(
      Object.entries(obj).filter(([key, val]) => val)
    );
    const selectedCheckboxesAsArrayOfNumbers = Object.keys(
      selectedCheckboxes
    ).map((a) => +a);
    return selectedCheckboxesAsArrayOfNumbers;
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
