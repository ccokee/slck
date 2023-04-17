from django.http import JsonResponse

def list_commands(request):
    commands = os.listdir('/bin')
    return JsonResponse({'commands': commands})