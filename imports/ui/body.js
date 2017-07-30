import { Template } from 'meteor/templating';
import { ReactiveDict} from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

/*** JSs IMPORTED   ***/
import './task.js';

/*** HTMLs IMPORTED     ***/
import './body.html';
import './header.html';

Template.body.onCreated (function bodyOnCreated()  { // // @TAG: a named function is used for better debugging.
    this.bodyTemplateDictionary = new ReactiveDict();
    Meteor.subscribe('tasks');

  });


Template.body.helpers({
  tasks: function () {
      const template = Template.instance();
      if (template.bodyTemplateDictionary.get('hideCompleted')) {
        return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 }});
      }

      return Tasks.find({}, { sort: { createdAt: -1 } });
    },
    taskCount: ()=> {
      return Tasks.find({checked: { $ne: true }}).count();
    },

    placeHolder: ()=> {
      if (Meteor.user()) {
          return "Type to add a new task";
      }
      else {
          return "Login to add a new task";
      }
    },

});

Template.body.events({
  'submit .new-task': function(event, template){
    event.preventDefault();
    if (Meteor.user()) {
        const newTask = event.target.text.value; // event.target is the form element used for adding a task
        console.log(`The new task is ${newTask}`);
        if (newTask) {
            Meteor.call('tasks.insert', newTask);
        }
        event.target.text.value = ""; // Clear the form!!
    }
    else {
        console.log(`You need to login to add a task!`);
        alert("You need to login to add a task!");
    }
  },

  'click .hide-completed': function (event, template) {
    template.bodyTemplateDictionary.set('hideCompleted', event.target.checked);
  }
});
