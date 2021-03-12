from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn.preprocessing import LabelEncoder
import ast

from .services import query_db_df

@api_view(['GET'])
def customer_gender_income(request):

    result_df = query_db_df("select id, race_code, home_owner, gender, max(income) from customer group by gender")
    result_dict = result_df.to_dict('records')

    return Response(result_dict, status=status.HTTP_200_OK)

@api_view(['GET'])
def customer_exerciser(request):

    response_data = []
    result_df = query_db_df("select state, count(state) as smokers from customer where is_smoker=1 group by state")
    result_dict = result_df.to_dict('records')
    response_data.append({
        "title": "Smokers by city",
        "data": result_dict
    })

    result_df = query_db_df("select gender, count(gender) as smokers from customer where is_smoker=1 group by gender")
    result_dict = result_df.to_dict('records')
    response_data.append({
        "title": "Smokers by gender",
        "data": result_dict
    })
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def customer_insurance(_):
    result_df = query_db_df("select DISTINCT customer.income, insurance_segment.id as insurance_segment_id, insurance_segment.value as insurance_segment_value from customer,insurance_segment where customer.insurance_segment_id=insurance_segment.id ORDER BY customer.income DESC LIMIT 1000")
    # Fetching insurance segment data for label in y axis
    insurance_df = query_db_df("SELECT value from insurance_segment ORDER BY id ASC ")

    result_dict = result_df.to_dict('records')
    insurance_dict = insurance_df.to_dict('records')

    # temp_list = []
    # final_data = []
    # Removing duplicate data
    # for item in result_dict:
    #     string_to_match = str(item['income'])+","+str(item['insurance_segment_id'])
    #     if string_to_match in temp_list:
    #         continue
    #     else:
    #         temp_list.append(string_to_match)
    #         final_data.append(item)

    response_data = {
        "data": result_dict,
        "insurance_label": [i['value'] for i in insurance_dict]
    }

    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_data(_):
    result_df = query_db_df(
        "SELECT DISTINCT customer.race_code as customer_race, education.value as education_value, "
        "education.id as education_id, customer.home_owner as customer_home_owner, "
        "customer.state as customer_state, customer.is_smoker as customer_smoker, "
        "customer.is_exerciser as customer_exercise, customer.has_insurance as customer_insurance, "
        "customer.travel_spending as customer_travel_spending, customer.sports_leisure_spending as customer_sports_leisure_spending, "
        "customer.economic_stability as customer_economic_stability, insurance_segment.id as insurance_segment_id, "
        "insurance_segment.value as insurance_segment_value, customer.youtube_user_rank as customer_youtube_user_rank, "
        "customer.facebook_user_rank as customer_facebook_user_rank, customer.gender as customer_gender "
        "FROM customer INNER JOIN education ON education_id = education.id "
        "INNER JOIN insurance_segment ON insurance_segment_id = insurance_segment.id LIMIT 1000")
    result_df = result_df.fillna('')
    result_dict = result_df.to_dict('records')
    dataArray = {}
    label_encoder = LabelEncoder()

    dataArray['customer_race'] = [i['customer_race'] for i in result_dict]
    dataArray['customer_race_num'] = label_encoder.fit_transform(dataArray['customer_race'])
    dataArray['education'] = [i['education_value'] for i in result_dict]
    dataArray['education_num'] = [i['education_id'] for i in result_dict]
    dataArray['customer_home_owner_num'] = [i['customer_home_owner'] for i in result_dict]
    dataArray['customer_state'] = [i['customer_state'] for i in result_dict]
    dataArray['customer_state_num'] = label_encoder.fit_transform(dataArray['customer_state'])
    dataArray['customer_smoker_num'] = [i['customer_smoker'] for i in result_dict]
    dataArray['customer_exercise_num'] = [i['customer_exercise'] for i in result_dict]
    dataArray['customer_insurance_num'] = [i['customer_insurance'] for i in result_dict]
    dataArray['customer_travel_spending_num'] = [i['customer_travel_spending'] for i in result_dict]
    dataArray['customer_sports_leisure_spending_num'] = [i['customer_sports_leisure_spending'] for i in result_dict]
    dataArray['customer_economic_stability_num'] = [i['customer_economic_stability'] for i in result_dict]
    dataArray['insurance_segment'] = [i['insurance_segment_value'] for i in result_dict]
    dataArray['insurance_segment_num'] = [i['insurance_segment_id'] for i in result_dict]
    dataArray['customer_youtube_user_rank_num'] = [i['customer_youtube_user_rank'] for i in result_dict]
    dataArray['customer_facebook_user_rank_num'] = [i['customer_facebook_user_rank'] for i in result_dict]
    dataArray['customer_gender'] = [i['customer_gender'] for i in result_dict]
    dataArray['customer_gender_num'] = label_encoder.fit_transform(dataArray['customer_gender'])

    # Generating labels for Race
    customer_race_label = []
    for i, v in enumerate(dataArray['customer_race']):
        temp_dict = {v: dataArray['customer_race_num'][i]}
        customer_race_label.append(temp_dict)
    dataArray['customer_race'] = list(map(dict, set(tuple(x.items()) for x in customer_race_label)))

    # Generating labels for education
    education_label = []
    for i, v in enumerate(dataArray['education']):
        temp_dict = {v: dataArray['education_num'][i]}
        education_label.append(temp_dict)
    dataArray['education'] = list(map(dict, set(tuple(x.items()) for x in education_label)))

    # Generating labels for gender
    customer_gender_label = []
    for i, v in enumerate(dataArray['customer_gender']):
        temp_dict = {v: dataArray['customer_gender_num'][i]}
        customer_gender_label.append(temp_dict)
    dataArray['customer_gender'] = list(map(dict, set(tuple(x.items()) for x in customer_gender_label)))

    # Generating labels for state
    customer_state_label = []
    for i, v in enumerate(dataArray['customer_state']):
        temp_dict = {v: dataArray['customer_state_num'][i]}
        customer_state_label.append(temp_dict)
    dataArray['customer_state'] = list(map(dict, set(tuple(x.items()) for x in customer_state_label)))

    # Generating labels for insurance_segment
    insurance_segment_label = []
    for i, v in enumerate(dataArray['insurance_segment']):
        temp_dict = {v: dataArray['insurance_segment_num'][i]}
        insurance_segment_label.append(temp_dict)
    dataArray['insurance_segment'] = list(map(dict, set(tuple(x.items()) for x in insurance_segment_label)))
    print(dataArray['insurance_segment'])

    return Response(dataArray, status=status.HTTP_200_OK)

