var require = meteorInstall({"imports":{"collections":{"tasks.js":["meteor/mongo",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// imports/collections/tasks.js                                                                            //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
Object.defineProperty(exports, '__esModule', {                                                             //
  value: true                                                                                              //
});                                                                                                        //
                                                                                                           //
var _meteorMongo = require('meteor/mongo');                                                                //
                                                                                                           //
exports['default'] = Tasks = new _meteorMongo.Mongo.Collection('tasks');                                   //
module.exports = exports['default'];                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"server":{"tasks.js":["meteor/meteor","/imports/collections/tasks.js","meteor/check",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// server/tasks.js                                                                                         //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }          //
                                                                                                           //
var _meteorMeteor = require('meteor/meteor');                                                              //
                                                                                                           //
var _importsCollectionsTasksJs = require('/imports/collections/tasks.js');                                 //
                                                                                                           //
var _importsCollectionsTasksJs2 = _interopRequireDefault(_importsCollectionsTasksJs);                      //
                                                                                                           //
var _meteorCheck = require('meteor/check');                                                                //
                                                                                                           //
_meteorMeteor.Meteor.publish('tasks', function tasksPublication() {                                        // 5
    return _importsCollectionsTasksJs2['default'].find({                                                   // 6
        $or: [{ isPrivate: false }, { owner: this.userId }]                                                // 7
    });                                                                                                    //
});                                                                                                        //
                                                                                                           //
// Meteor methods are sensible information. They shouln't be accesible to the client, only to the server.  //
                                                                                                           //
_meteorMeteor.Meteor.methods({                                                                             // 13
                                                                                                           //
    addTask: function addTask(text) {                                                                      // 15
        if (_meteorMeteor.Meteor.userId()) {                                                               // 16
            var task = {                                                                                   // 17
                text: text,                                                                                // 18
                createdAt: new Date(),                                                                     // 19
                checked: false,                                                                            // 20
                owner: _meteorMeteor.Meteor.userId(),                                                      // 21
                username: _meteorMeteor.Meteor.user().username,                                            // 22
                isPrivate: false                                                                           // 23
            };                                                                                             //
            console.log('insertando task', task);                                                          // 25
            _importsCollectionsTasksJs2['default'].insert(task);                                           // 26
        } else {                                                                                           //
            throw new _meteorMeteor.Meteor.Error('Usuario no autorizado');                                 // 28
        }                                                                                                  //
    },                                                                                                     //
    removeTask: function removeTask(taskId) {                                                              // 31
        console.log('borrando tarea id', taskId);                                                          // 32
        _importsCollectionsTasksJs2['default'].remove(taskId);                                             // 33
    },                                                                                                     //
    setChecked: function setChecked(taskId, isChecked) {                                                   // 35
        (0, _meteorCheck.check)(isChecked, Boolean);                                                       // 36
        console.log('modificando campo isChecked en bd', isChecked);                                       // 37
        _importsCollectionsTasksJs2['default'].update(taskId, { $set: { checked: !isChecked } });          // 38
    },                                                                                                     //
    setPrivate: function setPrivate(task) {                                                                // 40
        (0, _meteorCheck.check)(task.isPrivate, Boolean);                                                  // 41
        _importsCollectionsTasksJs2['default'].update(task._id, { $set: { isPrivate: !task.isPrivate } });
    }                                                                                                      //
});                                                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/tasks.js");
//# sourceMappingURL=app.js.map
