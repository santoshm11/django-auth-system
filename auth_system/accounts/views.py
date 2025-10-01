from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import *
from django.contrib.auth.forms import PasswordResetForm
from django.shortcuts import render, redirect
from django.contrib import messages
from allauth.account.models import EmailAddress
from allauth.account.adapter import get_adapter
import re
from allauth.account.views import ConfirmEmailView
from django.urls import reverse_lazy

def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        # Check if any field is empty
        if not username or not email or not password or not confirm_password:
            messages.error(request, "All fields are required.")
            return redirect("signup")

        # Validate username (alphanumeric and min length)
        if not re.match(r'^[\w.@+-]+$', username):
            messages.error(request, "Username can only contain letters, numbers, and @/./+/-/_ symbols.")
            return redirect("signup")
        if len(username) < 3:
            messages.error(request, "Username must be at least 3 characters long.")
            return redirect("signup")

        # Validate email format
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            messages.error(request, "Invalid email format.")
            return redirect("signup")

        # Check password match
        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect("signup")

        # Password strength check (optional, e.g., min 6 chars)
        if len(password) < 6:
            messages.error(request, "Password must be at least 6 characters long.")
            return redirect("signup")

        # Check if username or email already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken.")
            return redirect("signup")
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect("signup")

        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)

        # Create EmailAddress for verification
        email_address = EmailAddress.objects.create(
            user=user,
            email=email,
            verified=False,
            primary=True
        )
        email_address.send_confirmation(request)

        messages.success(request, "Verification email sent! Check your inbox.")
        return redirect("login")

    return render(request, "account/signup.html")

def login_view(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        remember_me = request.POST.get("remember_me")

        # Check if email or password is empty
        if not email or not password:
            messages.error(request, "Email and password are required.")
            return redirect('login')

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "No account found with this email.")
            return redirect('login')
        
        # Check if email is verified
        try:
            email_obj = EmailAddress.objects.get(user=user_obj, email=email)
            if not email_obj.verified:
                messages.error(request, "Email is not verified. Please verify your email first.")
                return redirect('login')
        except EmailAddress.DoesNotExist:
            messages.error(request, "Email record not found. Please contact support.")
            return redirect('login')

        username = user_obj.username
        user = authenticate(request, username=username, password=password)

        if user is None:
            messages.error(request, "Incorrect password. Please try again.")
            return redirect('login')

        # Successful login
        login(request, user)
        if remember_me:
            request.session.set_expiry(60 * 60 * 24 * 3)  # 3 days
        else:
            request.session.set_expiry(0) 

        messages.success(request, f"Welcome back, {user.username}!")
        return redirect('profile')

    return render(request, "account/login.html")

def logout_view(request):
    logout(request)
    return redirect('login')

def profile_view(request):
    return render(request, "account/profile.html")

def terms_conditions_view(request):
    return render(request, 'account/terms_conditions.html')

def privacy_policy(request):
    return render(request, 'account/privacy_policy.html')

# Forgot Password (basic version)
def password_reset_view(request):
    if request.method == "POST":
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            form.save(
                request=request,
                use_https=request.is_secure(),
                email_template_name="account/password_reset_email.html",
            )
            messages.success(request, "Password reset link sent to your email")
            return redirect('login')
    else:
        form = PasswordResetForm()
    return render(request, "account/password_reset.html", {"form": form})

class CustomConfirmEmailView(ConfirmEmailView):
    template_name = 'account/email_confirm.html'  # your custom template

    def get(self, *args, **kwargs):
        # Get the EmailConfirmation object using the key in the URL
        self.object = self.get_object()

        # Confirm the email (marks verified = True)
        if not self.object.email_address.verified:
            self.object.confirm(self.request)

        # Render your template instead of the default page
        return self.render_to_response(self.get_context_data())

    def get_success_url(self):
        return reverse_lazy('login')