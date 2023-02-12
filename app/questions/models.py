from django.db import models
from markdownx.models import MarkdownxField


class QuestionSet(models.Model):
    """
    Collection of questions. A logical grouping that encompasses an exam.
    """

    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Question(models.Model):
    CHECKBOX_SELECT_MULTIPLE = "CM"
    CHECKBOX_INPUT = "CI"
    WIDGETS = [
        (CHECKBOX_SELECT_MULTIPLE, "CheckboxSelectMultiple"),
        (CHECKBOX_INPUT, "CheckboxInput"),
    ]

    questionSet = models.ForeignKey(QuestionSet, related_name="questions", on_delete=models.CASCADE)
    content = models.CharField(max_length=65535)
    widget = models.CharField(max_length=2, choices=WIDGETS, default=CHECKBOX_INPUT)

    def __str__(self):
        return self.content


class Answer(models.Model):
    question = models.ForeignKey(
        Question, related_name="answers", on_delete=models.CASCADE
    )
    content = models.CharField(max_length=65535)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.content


class Explanation(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE)
    content = MarkdownxField()

    def __str__(self):
        return self.content
