from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import query_db_df

@api_view(['GET'])
def customer_gender_income(request):

    result_df = query_db_df("select id, race_code, home_owner, gender, max(income) from customer group by gender")
    result_dict = result_df.to_dict('records')

    return Response(result_dict, status=status.HTTP_200_OK)

@api_view(['GET'])
def customer_exerciser(request):

    response_data = []
    result_df = query_db_df("select state, count(state) as smokers from customer where is_exerciser=1 group by state")
    result_dict = result_df.to_dict('records')
    response_data.append({
        "title": "Smokers by city",
        "data": result_dict
    })

    result_df = query_db_df("select gender, count(gender) as smokers from customer where is_exerciser=1 group by gender")
    result_dict = result_df.to_dict('records')
    response_data.append({
        "title": "Smokers by gender",
        "data": result_dict
    })
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def customer_insurance(_):
    result_df = query_db_df("SELECT customer.income, insurance_segment.id as insurance_segment_id, insurance_segment.value as insurance_segment_value from customer,insurance_segment where customer.insurance_segment_id=insurance_segment.id ORDER BY customer.income DESC LIMIT 1000")
    # Fetching insurance segment data for label in y axis
    insurance_df = query_db_df("SELECT value from insurance_segment ORDER BY id ASC ")

    result_dict = result_df.to_dict('records')
    insurance_dict = insurance_df.to_dict('records')

    temp_list = []
    final_data = []
    # Removing duplicate data
    for item in result_dict:
        string_to_match = str(item['income'])+","+str(item['insurance_segment_id'])
        if string_to_match in temp_list:
            continue
        else:
            temp_list.append(string_to_match)
            final_data.append(item)

    response_data = {
        "data": final_data,
        "insurance_label": [i['value'] for i in insurance_dict]
    }

    return Response(response_data, status=status.HTTP_200_OK)
