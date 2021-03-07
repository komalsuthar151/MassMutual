import sys
import os
import sqlite3

import pandas as pd

from django.conf import settings

DATABASE = os.path.join(settings.BASE_DIR, "recruit.db")

def df_fetch(cursor):
    df = pd.DataFrame(cursor.fetchall())
    if not df.empty:
        df.columns = [col[0] for col in cursor.description]
    return df

def query_db_df(query):

    result_df = None

    try:
        connection = sqlite3.connect(DATABASE)

        cursor = connection.cursor()
        cursor.execute(query)
        result_df = df_fetch(cursor)

    except:
        e = sys.exc_info()[0]
        print("An error occurred with the database", e)
        raise e
    else:
        cursor.close()
        connection.close()

    return result_df