import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { Events as StoreEvents } from '../../src/events/Events.js';
import { EventTypes as StoreEventTypes } from '../../src/events/EventTypes.js';

describe('StoreEvents', () => {
  async function etFixture(): Promise<HTMLDivElement> {
    return fixture(html`<div></div>`);
  }

  describe('StoreEvents.Parameter', () => {
    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.get, spy);
        StoreEvents.Parameter.get(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.get, spy);
        StoreEvents.Parameter.get(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Parameter.get, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Parameter.get(id, et);
        assert.equal(result, data);
      });
    });

    describe('getBulk()', () => {
      const ids = ['amf://id'];

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getBulk, spy);
        StoreEvents.Parameter.getBulk(ids, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getBulk, spy);
        StoreEvents.Parameter.getBulk(ids, et);
        assert.deepEqual(spy.args[0][0].detail.ids, ids);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Parameter.getBulk, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Parameter.getBulk(ids, et);
        assert.deepEqual(result, data);
      });
    });

    describe('update()', () => {
      const id = 'amf://id';
      const prop = 'name';
      const value = 'test-value';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.update, spy);
        StoreEvents.Parameter.update(id, prop, value, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.update, spy);
        StoreEvents.Parameter.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.update, spy);
        StoreEvents.Parameter.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.update, spy);
        StoreEvents.Parameter.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Parameter.update, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Parameter.update(id, prop, value, et);
      });
    });

    describe('addExample()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.addExample, spy);
        StoreEvents.Parameter.addExample(id, init, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.addExample, spy);
        StoreEvents.Parameter.addExample(id, init, et);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.addExample, spy);
        StoreEvents.Parameter.addExample(id, init, et);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Parameter.addExample, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Parameter.addExample(id, init, et);
      });
    });

    describe('removeExample()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, spy);
        StoreEvents.Parameter.removeExample(id, parentId, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, spy);
        StoreEvents.Parameter.removeExample(id, parentId, et);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, spy);
        StoreEvents.Parameter.removeExample(id, parentId, et);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Parameter.removeExample(id, parentId, et);
      });
    });
  });
});
