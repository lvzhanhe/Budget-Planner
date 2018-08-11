import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Budgets = new Mongo.Collection('budgets');

if (Meteor.isServer) {
  Meteor.publish('budgets', function () {
    return Budgets.find({ userId: this.userId });
  });
}

Meteor.methods({
  'budgets.update'(amount) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      amount: {
        type: String,
        label: 'Amount',
        min: 1
      }
    }).validate({ amount });

    Budgets.update({
      userId: this.userId
    }, {
      $set: { amount }
    });
  },
  'budgets.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Budgets.insert({
      userId: this.userId,
      amount: 0
    });
  }
});
