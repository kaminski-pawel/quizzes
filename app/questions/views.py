import random
import typing as t

from django.db.models import Max, QuerySet
from django.views import generic

from .models import Question, QuestionSet


class QuizListView(generic.ListView):
    model = QuestionSet

    def get_queryset(self) -> QuerySet[Question]:
        return Question.objects.all()


class TakeQuiz(generic.DetailView):
    template_name = "next.html"

    def get_object(self) -> Question:
        qs = Question.objects.all()
        max_pk = qs.aggregate(max_pk=Max("pk"))["max_pk"]
        while True:
            obj = qs.filter(pk=random.randint(1, max_pk)).first()
            if obj:
                return obj
