# 출처 
https://breathtaking-life.tistory.com/135

# django 구축하기
- 1. 가상환경 생성
- python3 -m venv myvenv
- 2. 가상환경 실행
- myvenv\Scripts\activate (윈도우용)
- source myvenv/bin/activate (mac용)
- 3. django 설치, django-rest-framework는 차후에 설치한다
- pip install django
- mkdir backend
- cd backend
- django-admin startproject drfProject

# api로 호출시킬 app생성
- manage.py가 있는 drfProject 디렉토리에서 아래 명령어 실행
- 1. app 초기화
- python manage.py startapp mainApp


# djangorestframework 설치
- 1. djangorestframework 설치
- pip install djangorestframework
- 2. migrate실행. DB를 따로 설정하지 않았기 때문에 sqlite파일이 생성될 것임
- python manage.py migrate
- 3. mainApp앱이 추가되었으니, drfProject/settings.py에 mainApp과 rest_framework 추가

# mainApp에서 models.py 생성
```
from django.db import models

# Create your models here.

# 제목, 내용, 업데이트된 날짜를 담은 모델 생성
class Review(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
```

# 모델 생성했다면 마이그레이션으로 DB에 적용
- python manage.py makemigrations
- python manage.py migrate

# 관리자(admin) 등록
- mainApp > admin.py
```
from django.contrib import admin
from .models import Review

# Register your models here.
admin.site.register(Review)
```
- python manage.py createsuperuser 를 통해 어드민 계정 생성
- ram2
- test0611

# Serializer 생성
-  Serializer(시리얼라이저)는 DRF가 제공하는 클래스인데, DB 인스턴스를 JSON 데이터로 생성한다.
- 장고의 form과 유사하다!
- mainApp > serializers.py 생성
```
from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'title', 'content', 'updated_at')
```

# -veiws.py 클래스 선언
- Review 전체 목록을 보여주는 ReviewList와 Review의 세부사항을 보여주는 ReviewDetail을 작성했다.
- CRUD 기능은 APIView로 구현했다. APIView 말고도 ViewSet, Mixins 등이 있다.

- 1. mainApp > views.py 
```
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import ReviewSerializer
from .models import Review

# Create your views here.


# ReviewList 작성(GET, POST)
class ReviewList(APIView): #목록 보여줌
    def get(self, request): # 리스트 보여줄 때
        reviews = Review.objects.all()

        serializer = ReviewSerializer(reviews, many=True) # 여러개 객체 serialize하려면 many=True
        return Response(serializer.data)

    def post(self, request): # 새 글 작성시
        serializer = ReviewSerializer(
            data=request.data) # request.data는 사용자 입력 데이터
        if serializer.is_valid(): # 유효성 검사
            serializer.save() # 저장
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ReviewDetail 작성(GET, PUT, DELETE)
class ReviewDetail(APIView):
    def get_object(self, pk): # Review 객체 가져오기
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None): # Review detail 보기
        review = self.get_object(pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def put(self, request, pk, format=None): # Review 수정하기
        review = self.get_object(pk)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid(): # 유효성 검사
            serializer.save() # 저장
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # Review 삭제하기
        review = self.get_object(pk)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

```

# drfProject 폴더 안에 있는 urls.py 
```
rom django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('mainApp.urls'))
]
```

# mainApp > url.py 파일 생성
```
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ReviewList, ReviewDetail

urlpatterns = [
    path('review/', ReviewList.as_view()),
    path('review/<int:pk>/', ReviewDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
```

# 실행
- python manage.py runserver
- http://127.0.0.1:8000/review/로 접속

# 리액트앱 만들기
1. react 설치
- npm install -g create-react-app
- #npm을 이용한 방법
- yarn global add create-react-app
- #yarn을 이용한 방법
- 2. react-app 생성
- create-react-app frontend
- cd frontend
- yarn start

# App에 RestAPI 컴포넌트 추가
```
import './App.css';
import RestAPI from "./RestAPI.js";
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RestAPI />
      </header>
    </div>
  );
}

export default App;

```

# RestAPI.js
- HTTP request 를 위해 axios를 설치
- yarn add axios
```
import React, {useState} from 'react';
import axios from 'axios';
import "./RestAPI.css";

function RestAPI() {
    const [text, setText] = useState([]);

    return (
        <>
         <h1>REST API 연습</h1>   
         <div className="btn-primary">
             <button
                onClick={()=>{
                    axios
                        .post("http://127.0.0.1:8000/review/", {
                            title: "제목",
                            content: "내용",
                        })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}
            >
                POST
            </button>
            <button
                onClick={() => {
                    axios
                        .get("http://127.0.0.1:8000/review/")
                        .then((response) => {
                            setText([...response.data]);
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }}
                >
                    GET
                </button>
         </div>
         {text.map((e) => (
             <div>
                 {" "}
                 <div className="list">
                     <span>
                         {e.id}번, {e.title}, {e.content}, {e.update_at}
                     </span>
                     <button
                        className="btn-delete"
                        onClick={() => {
                            axios.delete(`http://127.0.0.1:8000/review/${e.id}`);
                            setText(text.filter((text) => text.id !== e.id));
                        }}
                     >
                         DELETE
                     </button>{" "}
                 </div>
             </div>
         ))}
        </>
    );
};

export default RestAPI;
```

# CORS 오류 해결
- 1. django-cors-headers 설치
- pip install django-cors-headers
- 2. settings.py 수정
```
"""
Django settings for drfProject project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-^vse(k$_w9wrwnu2o5am!$f*na84%&$cw)rd*jm145ck-6tq8n"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "mainApp", #추가
    "rest_framework", #추가
    "corsheaders", #추가
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware", #추가
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# 이하 추가
CORS_ORIGIN_WHITELIST = ('http://127.0.0.1:3000', 'http://localhost:3000')
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = "drfProject.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "drfProject.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

```

# 출처
