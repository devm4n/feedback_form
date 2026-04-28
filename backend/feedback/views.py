from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserRegisterSerializer
from .tasks import send_confirmation_mail


class RegisterUser(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user_email = serializer.data.get("email")
            feedback = serializer.data.get("feedback")
            send_confirmation_mail.delay(user_email, feedback)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
