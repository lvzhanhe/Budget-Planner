import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Items } from './items';

if (Meteor.isServer) {
  describe('items', function () {
    const itemOne = {
      title: 'Burger',
      amount: '12',
      detail: 'Food & Drinks',
      type: 'Expenses',
      userId: 'testUserId1'
      createTime: 'time1'
    };
    const itemTwo = {
      title: 'Salary',
      amount: '1000',
      detail: 'Other',
      type: 'Income',
      userId: 'testUserId2'
      createTime: 'time2'
    };

    beforeEach(function () {
      Items.remove({});
      Items.insert(itemOne);
      Items.insert(itemTwo);
    });

    it('should insert new item', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['items.insert'].apply({ userId });

      expect(Items.findOne({ _id, userId })).toExist();
    });

    it('should not insert item if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['items.insert']();
      }).toThrow();
    });

    it('should remove item', function () {
      Meteor.server.method_handlers['items.delete'].apply({ userId: itemOne.userId }, [itemOne._id]);

      expect(Items.findOne({ _id: itemOne._id})).toNotExist();
    });

    it('should not remove item if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['items.delete'].apply({}, [itemOne._id]);
      }).toThrow();
    });

    it('should not remove item if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['items.delete'].apply({ userId: itemOne.userId});
      }).toThrow();
    });

    it('should return a users items', function () {
      const res = Meteor.server.publish_handlers.items.apply({ userId: itemOne.userId });
      const items = res.fetch();

      expect(items.length).toBe(1);
      expect(items[0]).toEqual(itemOne);
    });

    it('should return no items for user that has none', function () {
      const res = Meteor.server.publish_handlers.items.apply({ userId: 'testid' });
      const items = res.fetch();

      expect(items.length).toBe(0);
    });

  });
}
