from django import forms
from django.contrib import admin
from django.db import models

from .models import Answer, Explanation, Question, QuestionSet

admin.site.register(QuestionSet)


class AnswerInline(admin.StackedInline):
    model = Answer
    formfield_overrides = {
        models.CharField: {"widget": forms.Textarea(attrs={"rows": 2, "cols": 150})},
    }


class ExplanationInline(admin.TabularInline):
    model = Explanation


class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline, ExplanationInline]
    formfield_overrides = {
        models.CharField: {"widget": forms.Textarea(attrs={"rows": 5, "cols": 150})},
    }


admin.site.register(Question, QuestionAdmin)
