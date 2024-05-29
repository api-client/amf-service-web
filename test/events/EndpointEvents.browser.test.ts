import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { Events as StoreEvents } from '../../src/events/Events.js';
import { EventTypes as StoreEventTypes } from '../../src/events/EventTypes.js';

describe('StoreEvents', () => {
  async function etFixture(): Promise<HTMLDivElement> {
    return fixture(html`<div></div>`);
  }

  describe('StoreEvents.Endpoint', () => {
    describe('add()', () => {
      const init = { path: '/test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.add, spy);
        StoreEvents.Endpoint.add(init, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.add, spy);
        StoreEvents.Endpoint.add(init, et);
        assert.deepEqual(spy.args[0][0].init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ('amf://created-id') as unknown;
        et.addEventListener(StoreEventTypes.Endpoint.add, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Endpoint.add(init, et);
        assert.equal(result, data);
      });
    });

    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.get, spy);
        StoreEvents.Endpoint.get(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.get, spy);
        StoreEvents.Endpoint.get(id, et);
        assert.deepEqual(spy.args[0][0].pathOrId, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Endpoint.get, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Endpoint.get(id, et);
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
        et.addEventListener(StoreEventTypes.Endpoint.update, spy);
        StoreEvents.Endpoint.update(id, prop, value, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.update, spy);
        StoreEvents.Endpoint.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.update, spy);
        StoreEvents.Endpoint.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.update, spy);
        StoreEvents.Endpoint.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Endpoint.update, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.update(id, prop, value, et);
      });
    });

    describe('delete()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.delete, spy);
        StoreEvents.Endpoint.delete(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.delete, spy);
        StoreEvents.Endpoint.delete(id, et);
        assert.deepEqual(spy.args[0][0].id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Endpoint.delete, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.delete(id, et);
      });
    });

    describe('list()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.list, spy);
        StoreEvents.Endpoint.list(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Endpoint.list, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.list(et);
      });
    });

    describe('listWithOperations()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.listWithOperations, spy);
        StoreEvents.Endpoint.listWithOperations(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Endpoint.listWithOperations, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.listWithOperations(et);
      });
    });

    describe('listOperations()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.listOperations, spy);
        StoreEvents.Endpoint.listOperations('/test', et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.listOperations, spy);
        const id = 'amf://id';
        StoreEvents.Endpoint.listOperations(id, et);
        assert.equal(spy.args[0][0].pathOrId, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ([{ test: true }]) as unknown;
        et.addEventListener(StoreEventTypes.Endpoint.listOperations, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Endpoint.listOperations('test', et);
        assert.deepEqual(result, data);
      });
    });

    describe('addOperation()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.addOperation, spy);
        StoreEvents.Endpoint.addOperation('id', { method: 'get' }, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.addOperation, spy);
        const init = { method: 'get' };
        StoreEvents.Endpoint.addOperation('id', init, et);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('the event has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.addOperation, spy);
        const init = { method: 'get' };
        StoreEvents.Endpoint.addOperation('id', init, et);
        assert.deepEqual(spy.args[0][0].detail.pathOrId, 'id');
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({id: 'amf://created-id'}) as unknown;
        et.addEventListener(StoreEventTypes.Endpoint.addOperation, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const init = { method: 'get' };
        const result = await StoreEvents.Endpoint.addOperation('id', init, et);
        assert.equal(result, data);
      });
    });

    describe('removeOperation()', () => {
      const id = 'amf://id';
      const parent = 'amf://parent';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.removeOperation, spy);
        StoreEvents.Endpoint.removeOperation(id, parent, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.removeOperation, spy);
        StoreEvents.Endpoint.removeOperation(id, parent, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Endpoint.removeOperation, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.removeOperation(id, parent, et);
      });
    });
  });
});
