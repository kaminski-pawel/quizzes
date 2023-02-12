import random
import typing as t

from django.db.models import Max, QuerySet
from django.views import generic

from .models import Question, QuestionSet
from .serializers import QuestionSerializer


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

    def get_context_data(self, **kwargs: t.Any) -> t.Dict[str, t.Any]:
        context = super().get_context_data(**kwargs)
        context["qa"] = self._serialize_question()
        return context

    def _serialize_question(self) -> t.Dict[str, t.Any]:
        return self._get_serializer().data

    def _get_serializer(self) -> QuestionSerializer:
        return QuestionSerializer(Question.objects.get(pk=self.get_object().pk))
