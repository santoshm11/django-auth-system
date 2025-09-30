from django.urls import path,include,re_path
from .views import *

urlpatterns = [
    path('signup/', signup_view, name="signup"),
    path('login/', login_view, name="login"),
    path('logout/', logout_view, name="logout"),
    path('profile/', profile_view, name="profile"),
    path('terms-conditions/', terms_conditions_view, name='terms_conditions'),
    path('privacy-policy/', privacy_policy, name='privacy_policy'),
    re_path(
        r'^accounts/confirm-email/(?P<key>[-:\w]+)/$', 
        CustomConfirmEmailView.as_view(),
        name='account_confirm_email'
    ),
    #path('forgot-password/', password_reset_view, name="forgot_password"),
]