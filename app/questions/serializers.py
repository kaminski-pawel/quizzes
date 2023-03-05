from rest_framework import serializers

from .models import Answer, Explanation, Question


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["pk", "content", "is_correct"]


class ExplanationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Explanation
        fields = ["content"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    explanation = ExplanationSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ["pk", "content", "widget", "answers", "explanation"]
