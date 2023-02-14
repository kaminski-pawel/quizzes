import { LitElement, html } from "lit";

export class CheckComponent extends LitElement {
  constructor() {
    super();
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
        style="position: absolute; bottom: 25%; right: 10%;"
        @click=${this.handleClick}
      >
        Check
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
    console.log("checkAnswer");
  }
}
customElements.define("ui-check-btn", CheckComponent);
