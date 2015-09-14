import Ember from 'ember';

export default Ember.Object.extend({
  counter: 0,
  attach: function(callback) {
    new Ember.RSVP.Promise((resolve, reject) => {
      callback(resolve, reject);
    }).then(() => {
      this.counter = this.counter + 1;
    }, err => {
      if (err && err.type && err.type === 'ember-localforage-adapter error') {
        window.isPersisting = false;
        Ember.run.later(() => {
          this.attach(callback);
        }, 200);
      }
    });
  }
});
