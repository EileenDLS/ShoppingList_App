# ShoppingList_App
The purpose of this application is to allow me to list all the things I need todo for any selected day.   Use a date picker UI control to chose a day to see my grocery list.  If there is nothing in localStorage, then make a fetch (or axios) call to data.json on your localhost (in the same folder that has your application.)

In this homework assignment, you must use all these technologies;
CSS
HTML 5.0
Javascript (ES6)

The app run (and look acceptable on a mobile phone), then run it on the desktop. I will test your solution on my mobile phone first, then desktop. This assignment is a 'mobile-first' design.
This application loads a data file ('data.json') if there is nothing in the localStorage for your selected day.   If the data is found in localStorage, you should always interact and use it (including updates).

JSON data format (suggestion):
[ 
 {
   'date': '11-January-2023',
   'list': [
            {
             'description': 'buy new pattern for quilt',
             'status': 'Not Done'
            },
            {
             'description': 'Need 2 AA batteries',
             'status': 'Done'
            },
            {'description': 'Make copy of back door key',
             'status': 'Not Done'
            }
           ]
 }, 
 {
   'date': '14-February-2023',
   'list': [
            {
             'description': 'Remember to purchase her 12 red roses',
             'status': 'Not Done'
            },
            {
             'description': 'Book reservation for dinner',
             'status': 'Done'
            }
           ]
 }
]
