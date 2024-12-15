from django.urls import path
from .views import ArticleView

urlpatterns = [
    path('articles/', ArticleView.as_view(), name='articles'),
    path('articles/<int:pk>/', ArticleView.as_view(), name='article-detail'),
]
