from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.generic.base import TemplateView

from rest_framework.views import APIView
from rest_framework.response import Response


class IndexTemplateView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexTemplateView, self).get_context_data(**kwargs)
        return context
