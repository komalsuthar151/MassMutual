# MassMutual Data Science Software Engineering Recruitment

## Instructions

This project is intended to evaluate MassMutual Data Science Software Engineering candidates. The project contains a simple web app to be used as a starting point to build data visualizations for a marketing manager. These visualizations should enable this marketing manager to locate and understand potential new markets or customers for the purpose of selling life insurance.   

The visualizations you construct should reveal insights about the data. Make sure the visualizations present multivariate data that enable comparisons and provide descriptive titles and labels. Data tables are valid visualizations, however, charts can be more effective at revealing insights.

Please, extend the code by constructing your own database queries of the data found in **recruit.db** as well as setup up your own Django API endpoints to expose the results of these queries. Also, make sure to utilize React in your solution, however, you can use any JavaScript visualization library to produce charts. Currently React and D3.js are imported into the index.html template, however, you can utilize npm setup a client-side stack. 

NOTE: Don't feel that you need to build something really complicated. Try to focus on completing a few key visualizations, potentially with form inputs to filter or change the represented data. We can talk about how the work could be extended during the on-site interview.

Finally, please feel free to reach out if you have any questions.


## Setup

Make sure python3 is installed on your system:
`python3 --version`

If not, you can download python here:
https://www.python.org/downloads/

Create a python virtual environment for the **web** project:
`python3 -m venv venv`
https://docs.python.org/3/library/venv.html#creating-virtual-environments

You can activate the environment using the source command: 
`source venv/bin/activate`

Then set up the new virtual environment with the required dependencies:
`pip install -r requirements.txt`

Start the web application:
`python manage.py runserver`


## Data
This project contains an SQLite database, **recruit.db**. This database is pre-populated with data and should be utilized to produce data visualizations.

### Data Dictionary
#### customer table
* id - primary key
* race_code - foreign key to race table
* education_id - foreign key to education table
* home_owner - Home Owner / Renter, O = Home Owner, R = Renter
* state - state location in the United States
* is_smoker - whether customer is a smoker, 1 = Yes
* is_exerciser - whether customer exercises, 1 = Yes
* has_insurance - Life Insurance Policy Owner, 1 = True
* income - Income By The Thousands
* travel_spending - Amount spent by customer on Travel
* sports_leisure_spending - Amount spent by customer on Sports & Leisure
* economic_stability - 01 = Most Likely Economically Stable, 30 = Least Likely Economically Stable
* insurance_segment_id - foreign key to insurance_segment table
* youtube_user_rank - Propensity to use YouTube, 01 (Most Likely) through 20 (Least Likely)
* facebook_user_rank - Propensity to use Facebook, 01 (Most Likely) through 20 (Least Likely)
* gender - M = Male, F = Female


## Next Steps
1. Respond to the exercise email with the completed exercise. You can either link to the completed exercise or attach the compressed project to the email.
2. The completed exercise will be reviewed by the team.
3. If the team decides to move forward, a recruiter will contact you to schedule the final interview.
4. During the final interview you will present your work. First you will present your running project and describe your presentation decisions. Then you will walk us through your code and describe your implementation decisions.
5. There will be time at the end of the interview to ask general questions.

