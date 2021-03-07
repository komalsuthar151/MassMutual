"""recruit_dsse_web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path

from .views import IndexTemplateView
from .apis import customer_gender_income, customer_exerciser, customer_insurance, get_all_data

urlpatterns = [
    #    path('admin/', admin.site.urls),
    path('', IndexTemplateView.as_view(), name='_index_url'),
    path('api/customer/gender/income', customer_gender_income, name='api_customer_gender_income_url'),
    path('api/customer/exercise', customer_exerciser, name='api_customer_exercise_url'),
    path('api/customer/insurance', customer_insurance, name='api_customer_insurance_url'),
    path('api/customer/all', get_all_data, name='api_customer_all_data'),
]
