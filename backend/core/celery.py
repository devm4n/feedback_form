from celery import Celery

app = Celery(broker="redis://redis:6379/0")
app.autodiscover_tasks()
