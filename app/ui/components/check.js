import { LitElement, html } from "lit";

export class CheckComponent extends LitElement {
  static properties = {
    selected: { type: Array },
    correct: { type: Array },
  };

  constructor() {
    super();
    this.selected = [];
    this.setCorrect();
    this.onEnterPress();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <button
        type="button"
        class="btn btn-secondary btn-lg"
        style="margin-top: 20px; margin-bottom: 20px;"
        @click=${this.handleClick}
      >
        Check ${this.selected}
      </button>
    `;
  }

  handleClick(event) {
    this.checkAnswer();
  }

  onEnterPress() {
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          // window.location.href = '/zadania/utworz/';
          this.checkAnswer();
        }
      },
      false
    );
  }

  checkAnswer() {
    const result = this.selected.every((v, i) => v === this.correct[i]);
    this.dispatchEvent(
      new CustomEvent("question-result", {
        detail: { value: result },
      })
    );
  }

  /**
   * Establish an array of id numbers of answers where is_correct=True.
   * Set this.correct, for e.g. [4]
   */
  setCorrect() {
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.correct = data.answers
      .filter((answ) => answ.is_correct)
      .map((answ) => answ.pk);
  }
}
customElements.define("ui-check-btn", CheckComponent);
