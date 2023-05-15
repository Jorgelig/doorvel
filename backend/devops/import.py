import pandas as pd
import numpy as np
import time
import os
import sys
import django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()
from api.models import State, County, Settlement

def import_data():
    start_time = time.time()
    # leer archivo postal_code.xls
    current_folder = os.path.abspath(os.path.dirname(__file__))
    file_path = os.path.join(current_folder, 'postal_codes.xls')
    data = pd.read_excel(file_path, sheet_name=None)

    # limpiar registros
    State.objects.all().delete()
    County.objects.all().delete()
    Settlement.objects.all().delete()
    added_states = {}
    added_counties = {}
    
    for sheet_name in data:
        print(f"Sheet name: {sheet_name}")
        # buscar la hoja que contiene d_codigo
        if not np.isnan(data[sheet_name].iat[0, 0]):
            # crear estado (state)
            state_name = data[sheet_name].iloc[0,4]
            c_estado = data[sheet_name].iloc[0,7]
            if c_estado not in added_states:
                state, created = State.objects.get_or_create(
                    code=c_estado, name=state_name
                    )
                added_states[c_estado] = state
            else:
                state = added_states[c_estado]
            
            # crear o actualizar county
            for index, row in data[sheet_name].iterrows():
                county_name = row['D_mnpio']
                county_code = row['c_mnpio']
                settlement_code = row['id_asenta_cpcons']
                settlement_name =  row['d_asenta']
                postal_code = row['d_codigo']
                zone_type = row['d_zona']
                settlement_type = row['d_tipo_asenta']
                
                print(f"county_name: {county_name}")
                print(f"county_code: {county_code}")
                print(f"settlement_code: {settlement_code}")
                print(f"settlement_name: {settlement_name}")
                print(f"postal_code: {postal_code}")
                print(f"zone_type: {zone_type}")
                print(f"settlement_type: {settlement_type}")

                if county_code not in added_counties: 
                    county, created = County.objects.get_or_create(
                        name=county_name,
                        code=county_code,
                        state=state
                    )
                else:
                    county = added_counties[county_code]

                settlement, created = Settlement.objects.get_or_create(
                    code=settlement_code,                    
                    name=settlement_name,
                    postal_code=postal_code,
                    zone_type=zone_type,
                    settlement_type=settlement_type,
                    state=state,
                    county=county
                )
                
                if created:
                    print(f"Se ha creado la colonia: {county_name} [{settlement_code}] en {settlement_name}")
                else:
                    print(f"La colonia {county_name} ya existe")
            
    
    end_time = time.time()
    elapsed_time = end_time - start_time
    print("Importación completada")
    print(f"Tiempo de ejecución: {elapsed_time} segundos")

if __name__ == '__main__':
    import_data()
