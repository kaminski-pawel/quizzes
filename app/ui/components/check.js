import { LitElement, html } from "lit";
import "./../components/timer";

export class CheckComponent extends LitElement {
  static properties = {
    isTimerStopped: { type: Boolean },
    selected: { type: Array },
    correct: { type: Array },
  };

  constructor() {
    super();
    this.selected = [];
    this.isTimerStopped = false;
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
        Check
        <ui-timer .isTimerStopped="${this.isTimerStopped}"></ui-timer>
      </button>
    `;
  }

  handleClick(event) {
    this.checkAnswer();
    this.stopTimer();
  }

  onEnterPress() {
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          // window.location.href = '/zadania/utworz/';
          this.checkAnswer();
          this.stopTimer();
        }
      },
      false
    );
  }

  stopTimer() {
    this.isTimerStopped = true;
  }

  isResultCorrect() {
    return this.compareArrays(this.selected, this.correct);
    // return (
    //   this.selected.length === this.correct.length &&
    //   this.selected.every((v, i) => v === this.correct[i])
    // );
  }

  checkAnswer() {
    console.log("this.selected", this.selected);
    console.log("this.correct", this.correct);
    this.dispatchEvent(
      new CustomEvent("question-result", {
        detail: { value: this.isResultCorrect() },
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

  compareArrays(arr1, arr2) {
    return (
      arr1.length === arr2.length &&
      arr1.every((a) => arr2.some((b) => a === b))
    );
  }
}
customElements.define("ui-check-btn", CheckComponent);
