import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { Events as StoreEvents } from '../../src/events/Events.js';
import { EventTypes as StoreEventTypes } from '../../src/events/EventTypes.js';

describe('StoreEvents', () => {
  async function etFixture(): Promise<HTMLDivElement> {
    return fixture(html`<div></div>`);
  }

  describe('StoreEvents.Response', () => {
    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.get, spy);
        StoreEvents.Response.get(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.get, spy);
        StoreEvents.Response.get(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Response.get, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Response.get(id, et);
        assert.equal(result, data);
      });
    });

    describe('getBulk()', () => {
      const ids = ['amf://id'];

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.getBulk, spy);
        StoreEvents.Response.getBulk(ids, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.getBulk, spy);
        StoreEvents.Response.getBulk(ids, et);
        assert.deepEqual(spy.args[0][0].detail.ids, ids);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Response.getBulk, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Response.getBulk(ids, et);
        assert.equal(result, data);
      });
    });

    describe('update()', () => {
      const id = 'amf://id';
      const prop = 'name';
      const value = 'test-value';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.update, spy);
        StoreEvents.Response.update(id, prop, value, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.update, spy);
        StoreEvents.Response.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.update, spy);
        StoreEvents.Response.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.update, spy);
        StoreEvents.Response.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Response.update, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Response.update(id, prop, value, et);
      });
    });

    describe('addPayload()', () => {
      const id = 'amf://id';
      const init = { mediaType: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.addPayload, spy);
        StoreEvents.Response.addPayload(id, init, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.addPayload, spy);
        StoreEvents.Response.addPayload(id, init, et);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.addPayload, spy);
        StoreEvents.Response.addPayload(id, init, et);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Response.addPayload, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Response.addPayload(id, init, et);
      });
    });

    describe('removePayload()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.removePayload, spy);
        StoreEvents.Response.removePayload(id, parentId, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.removePayload, spy);
        StoreEvents.Response.removePayload(id, parentId, et);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.removePayload, spy);
        StoreEvents.Response.removePayload(id, parentId, et);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Response.removePayload, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Response.removePayload(id, parentId, et);
      });
    });

    describe('addHeader()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.addHeader, spy);
        StoreEvents.Response.addHeader(id, init, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.addHeader, spy);
        StoreEvents.Response.addHeader(id, init, et);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.addHeader, spy);
        StoreEvents.Response.addHeader(id, init, et);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Response.addHeader, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Response.addHeader(id, init, et);
      });
    });

    describe('removeHeader()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.removeHeader, spy);
        StoreEvents.Response.removeHeader(id, parentId, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.removeHeader, spy);
        StoreEvents.Response.removeHeader(id, parentId, et);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Response.removeHeader, spy);
        StoreEvents.Response.removeHeader(id, parentId, et);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Response.removeHeader, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Response.removeHeader(id, parentId, et);
      });
    });
  });
});
