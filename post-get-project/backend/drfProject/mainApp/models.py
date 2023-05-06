from django.db import models

# Create your models here.

# 제목, 내용, 업데이트된 날짜를 담은 모델 생성
class Review(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    