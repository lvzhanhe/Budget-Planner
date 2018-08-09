import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.publish('items', function () {
    return Items.find({ userId: this.userId });
  });
}

Meteor.methods({
  'items.insert'(title, amount, detail, type) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      amount: {
        type: String,
        label: 'Amount'
      }
    }).validate({ amount });

    Items.insert({
      title,
      amount,
      detail,
      type,
      userId: this.userId,
      createTime: moment(new Date().getTime()).format('MMMM Do YYYY')
    });
  },
  'items.delete'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Items.remove(_id);
  }
});
