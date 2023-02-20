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
        exam = QuestionSet.objects.get(title=options.get("exam"))
        for item in self._get_questions_list(options.get("file", "")):
            question, created = Question.objects.get_or_create(
                questionSet=exam,
                content=item["content"],
                widget=item["widget"],
            )
            if created:
                Explanation.objects.create(
                    question=question,
                    content=item["explanation"]["content"],
                )
                for answ in item["answers"]:
                    Answer.objects.create(
                        question=question,
                        content=answ["content"],
                        is_correct=answ["is_correct"],
                    )

    def _get_questions_list(self, fp: str) -> t.List[t.Any]:
        with open(fp) as f:
            data = json.load(f)
        return data
