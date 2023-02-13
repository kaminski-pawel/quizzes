const { AnswersComponent } = require("./../components/answers");
const { CheckComponent } = require("./../components/check");
const { ExplanationComponent } = require("./../components/explanation");
const { QuestionComponent } = require("./../components/question");

customElements.define("ui-answers", AnswersComponent);
customElements.define("ui-check-btn", CheckComponent);
customElements.define("ui-explanation", ExplanationComponent);
customElements.define("ui-question", QuestionComponent);
