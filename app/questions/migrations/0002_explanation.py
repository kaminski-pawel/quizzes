# Generated by Django 3.2.17 on 2023-02-10 17:27

from django.db import migrations, models
import django.db.models.deletion
import markdownx.models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Explanation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', markdownx.models.MarkdownxField()),
                ('question', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='questions.question')),
            ],
        ),
    ]
