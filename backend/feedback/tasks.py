from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail


@shared_task
def send_confirmation_mail(user_email, message_content):
    subject = "Confirmation for feedback."
    message = f"Hi,\n\nWe recieved your feedback :'{message_content}'.\n\nThank you."
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user_email]
    send_mail(subject, message, email_from, recipient_list)
