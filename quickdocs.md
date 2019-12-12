## quickdocs

### directory backend has backend side which uses mongo and nodejs.

./backEnd/routes/routes.js
has nodejs api http commands which are processed by nodejs and then forwarded to mongodb.

./backEnd/controllers/events.js
has most nodejs coding which forwards to mongodb

./backEnd/bin/startnode.js
has actual starting code

backend also has caching code but it's not in use because it's need to be inserted in between.

### directory frontend has frontend

frontend uses react-native and lot of components

./frontEnd/App.js 
is the main app for react

./frontEnd/components/
has sub menus
