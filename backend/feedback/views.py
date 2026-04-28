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
            send_confirmation_mail(user_email, feedback)
            return Response(serializer.data)
        return Response(serializer.errors)
