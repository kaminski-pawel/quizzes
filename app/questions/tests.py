from django.conf import settings
from django.core.management import call_command
from django.test import TestCase

from .models import Answer, Explanation, Question, QuestionSet


class QuestionsPopulateTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        qs = QuestionSet.objects.create(title="Exam1")
        q = Question.objects.create(
            questionSet=qs,
            content="Question is already in the DB",
            widget="CI",
        )
        Answer.objects.create(
            **{"content": "Old true answer.", "is_correct": True, "question": q}
        )
        Answer.objects.create(
            **{"content": "Old false answer.", "is_correct": False, "question": q}
        )
        Explanation.objects.create(content="...", question=q)
        filepath = (
            settings.BASE_DIR / "questions" / "fixtures" / "test_questions_populate.json"
        )
        call_command("questions_populate", f"--file={filepath}", f"--exam={qs.title}")

    def test_no_duplicates(self):
        qs = Question.objects.filter(content="Question is already in the DB")
        self.assertEqual(qs.count(), 1)

    def test_cmd_created_correct_DB_instances(self):
        q = Question.objects.get(content="Question 1")
        self.assertEqual(q.content, "Question 1")
        self.assertEqual(q.widget, "CI")
        self.assertEqual(q.explanation.content, "Explanations.")
        self.assertEqual(q.answers.all().count(), 2)
        for answer in q.answers.all():
            self.assertIn(answer.content, ["True answer.", "False answer."])

    def test_cmd_created_correct_answers(self):
        self.assertEqual(Answer.objects.get(content="True answer.").is_correct, True)
        self.assertEqual(Answer.objects.get(content="False answer.").is_correct, False)
