import { Template } from 'meteor/templating';
import './task.html';
import '../api/tasks.js';



Template.task.helpers({
    isOwner: function () {
        console.log(`this.createdBy is ${this.createdBy}`);
        return (this.createdBy === Meteor.user().username);
    },
    private: function () {
        return this.private;
    }
});

Template.task.events({
    'click .js-check-task': function(event, template){
        if(this._id) {
            console.log("Check the task, converting to: ", !this.checked);
            Meteor.call('tasks.check', this._id, this.checked);
        }
    },
    'click .js-delete-task': function(event, template){
        console.log("Deleting the task: ", this._id);
        if(this._id) {
            console.log(`Calling deleteTask()`);
            Meteor.call('tasks.delete', this._id);
        }
    },

    'click .toggle-private': function(event, template) {
        console.log(`Toggling private`);
        if(this._id) {
            console.log(`Calling task.togglePrivate`);
            if (this.private === null || this.private === undefined)
                Meteor.call('tasks.setPrivate', this._id, false);
            else
                Meteor.call('tasks.setPrivate', this._id, this.private);
        }
    }

});


