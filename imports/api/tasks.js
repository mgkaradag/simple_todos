
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tasks = new Mongo.Collection("tasks");

Meteor.methods({
    'tasks.delete': function (taskId) {
        check(taskId, String);
        if (!taskId) {
            console.log(`taskId is ${taskId}, returning!`);
            return undefined;
        }
        const owner = Tasks.findOne(taskId).createdBy;
        if (owner === Meteor.user().createdBy) {
            console.log(`Removing the task ${taskId}`);
            Tasks.remove(taskId);
        }
        else
            throw new Meteor.Error('Not Authorized User!')
    },

    'tasks.check':  function (taskId, checked) {
        check(taskId, String);
        check(checked, Boolean);
        const owner  = Tasks.findOne(taskId).createdBy;
        if (owner === Meteor.user().username) {
            Tasks.update(taskId,
                {$set: {checked: !checked}})
        }
        else
            throw new Meteor.Error('Not Authorized User!');
    },

    'tasks.setPrivate': (taskId, isPrivate) =>{
        check(taskId, String);
        check(isPrivate, Boolean);
        if (Tasks.findOne(taskId).createdBy !== Meteor.user().username) {
            throw new Meteor.Error('Not-Authorized!');
        }
        Tasks.update(taskId,
            {$set: {private: !isPrivate}})

    },

    'tasks.insert': function(newTask) {
        check(newTask, String);
        if (newTask) {
            Tasks.insert({
                text: newTask,
                createdAt: new Date(),
                createdBy: Meteor.user().username
            });
        }
        else {
            console.log(`newTask is ${newTask}, returning!`);
            return undefined;
        }
    },



});
