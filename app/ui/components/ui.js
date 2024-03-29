import { LitElement, html } from "lit";

export class SimpleGreeting extends LitElement {
  static properties = {
    name: { type: String },
    question: { type: String },
  };

  constructor() {
    super();
    const data = JSON.parse(
      document.getElementById("question-n-answers").textContent
    );
    this.answers = data.answers;
    this.question = data.content;
    this.name = "Somebody";
  }

  render() {
    return html`<p>Hello, ${this.name}. ${this.question}!</p>`;
  }
}
customElements.define("simple-greeting", SimpleGreeting);
