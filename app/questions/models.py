from django.db import models


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

    questionSet = models.ForeignKey(QuestionSet, on_delete=models.CASCADE)
    content = models.CharField(max_length=65535)
    widget = models.CharField(max_length=2, choices=WIDGETS, default=CHECKBOX_INPUT)

    def __str__(self):
        return self.content


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.CharField(max_length=65535)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.content


class Explanation(models.Model):
    content = models.TextField(max_length=65535)

    def __str__(self):
        return self.content
