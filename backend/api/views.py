import os
import django
import requests


from django.http import JsonResponse, HttpResponseServerError
from django.views import View
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()
from api.models import State, County, Settlement

class PingView(View):
    def get(self, request):
        return JsonResponse({'message': 'Pong'})

class ZipCodesView(View):
    def get(self, request, zip_code):
        settlements = Settlement.objects.filter(postal_code=zip_code)
        if not settlements:
            return JsonResponse({'message': 'Zip code not found.'}, status=404)
        state = settlements[0].state
        county = settlements[0].county
        federal_entity = {'key': state.id, 'name': state.name, 'code': state.code}
        municipality = {'key': county.id, 'name': county.name}
        settlements_list = []
        for settlement in settlements:
            settlement_dict = {'key': settlement.id, 'name': settlement.name, 'zone_type': settlement.zone_type, 'settlement_type': {'name': settlement.settlement_type}}
            settlements_list.append(settlement_dict)
        response_dict = {'zip_code': zip_code, 'locality': state.name, 'federal_entity': federal_entity, 'settlements': settlements_list, 'municipality': municipality}
        return JsonResponse(response_dict)

class CatAmenitiesParents(View):
    def get(self, request):
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}
            response = requests.get('http://54.215.118.180:81/api/cat-amenities-parents/', headers=headers)
            response.raise_for_status()
            data = response.json()
            return JsonResponse(data)
        except requests.exceptions.RequestException as e:
            return HttpResponseServerError(str(e))



