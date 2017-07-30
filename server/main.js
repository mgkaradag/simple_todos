import { Meteor } from 'meteor/meteor';
import {Tasks} from '../imports/api/tasks.js';
import '../imports/api/tasks.js';

Meteor.publish("tasks", function taskPublication () {
    // Only publish tasks that are public or belong to the current user
    return Tasks.find(
        {$or :[
            {private: {$ne: true}},
            {createdby: this.createdBy}
        ]
        }
    )
});

Meteor.startup(() => {
    // code to run on server at startup
});
