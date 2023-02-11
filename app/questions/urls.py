from django.urls import path

from . import views

app_name = "questions"

urlpatterns = [
    path("next/", views.TakeQuiz.as_view(), name="next"),
]
