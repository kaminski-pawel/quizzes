import json
import typing as t

from django.core.management.base import BaseCommand
from questions.models import Answer, Explanation, Question, QuestionSet


class Command(BaseCommand):
    help = "Populates  ."

    def add_arguments(self, parser):
        parser.add_argument(
            "--file",
            type=str,
            help="Select a json file with Answers, Explanations and Questions to populate the DB",
        )
        parser.add_argument(
            "--exam",
            type=str,
            help="Chose a title of questions.models.QuestionSet to populate",
        )

    def handle(self, *args, **options):
        self.exam = QuestionSet.objects.get(title=options.get("exam"))
        for item in self._get_questions_list(options.get("file", "")):
            question, created = self._get_or_create_question(item)
            if created:
                self._create_explanation(question, item)
                for answer in item["answers"]:
                    self._create_answer(question, answer)

    def _get_questions_list(self, fp: str) -> t.List[t.Any]:
        with open(fp) as f:
            data = json.load(f)
        return data

    def _get_or_create_question(self, item: t.Dict[str, t.Any]):
        return Question.objects.get_or_create(
            questionSet=self.exam,
            content=item["content"],
            widget=item["widget"],
        )

    def _create_explanation(self, question: Question, item: t.Dict[str, t.Any]):
        Explanation.objects.create(
            question=question,
            content=item["explanation"]["content"],
        )

    def _create_answer(self, question: Question, answer: t.Dict[str, t.Any]):
        Answer.objects.create(
            question=question,
            content=answer["content"],
            is_correct=answer["is_correct"],
        )
