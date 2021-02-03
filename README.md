All resources are not uploaded to the github, mostly just source code is here.
The app can be demoed in
https://student.labranet.jamk.fi/~P1690/webohjelm/harj/datepickjquery.html

Thoughts when looking at this code later (February 2021):

Ideally this app should produce a customizable Timetable view using the .json
file that is being created in this first view, but we'll see if I will have
time to finish it.

Made as a little project work at the end of a first course I took about
javascript in Summer 2020. I started to do things fast without thinking
too much ahead, because I wasn't too sure how things are done
at that time, so I ended up having very unorganized structure and also
it seems I used lots of Finnish names for variables, methods and comments
which of course isn't a good practice.

This is unfinished project in a way that it would need much more work put into
it. The original idea was to have this first view create a json -file with
correct time ranges including specially named holidays that are exceptions and
which can also be customly created by user. The predefined holidays and dates
in general when people do not generally work in Finland come
from a json file generated via http://www.webcal.fi/fi-FI/index.php and they
will be added to the view automatically if there are any of them in the date
range that user has chosen first. Note, that there's no need to include them
if they happen on a weekday that is not included in the range.

I decided to create a way to tweak these dates in a view of my own instead of
using a component because I wanted to learn more about how things can be
rendered to DOM using different kinds of data and making changes to it
dynamically.

I wanted to have this "web app" to work without backend, and I learnt about
local storage that could help with this purpose, and it is implemented here
succesfully for this simple use.

Calendar is a JQuery component tweaked a bit for this use case.

The button "Kuvaksi" uses also a premade component which wouldn't be needed
int he final project but I just wanted to have some logical ending to this
in its current stage. The component's source can be found here
https://html2canvas.hertzen.com/
