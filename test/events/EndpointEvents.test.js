import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { StoreEvents, StoreEventTypes } from  '../../worker.index.js';

describe('StoreEvents', () => {
  /**
   * @return {Promise<HTMLDivElement>}
   */
  async function etFixture() {
    return fixture(html`<div></div>`);
  }

  describe('StoreEvents.Endpoint', () => {
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
          e.detail.result = Promise.resolve();
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
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.listWithOperations(et);
      });
    });

    describe('listOperations()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.listOperations, spy);
        StoreEvents.Endpoint.listOperations(et, '/test');
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.listOperations, spy);
        const id = 'amf://id';
        StoreEvents.Endpoint.listOperations(et, id);
        assert.equal(spy.args[0][0].pathOrId, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ([{ test: true }]);
        et.addEventListener(StoreEventTypes.Endpoint.listOperations, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Endpoint.listOperations(et, 'test');
        assert.deepEqual(result, data);
      });
    });

    describe('add()', () => {
      const init = { path: '/test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.add, spy);
        StoreEvents.Endpoint.add(et, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.add, spy);
        StoreEvents.Endpoint.add(et, init);
        assert.deepEqual(spy.args[0][0].init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ('amf://created-id');
        et.addEventListener(StoreEventTypes.Endpoint.add, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Endpoint.add(et, init);
        assert.equal(result, data);
      });
    });

    describe('delete()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.delete, spy);
        StoreEvents.Endpoint.delete(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.delete, spy);
        StoreEvents.Endpoint.delete(et, id);
        assert.deepEqual(spy.args[0][0].id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Endpoint.delete, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.delete(et, id);
      });
    });

    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.get, spy);
        StoreEvents.Endpoint.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.get, spy);
        StoreEvents.Endpoint.get(et, id);
        assert.deepEqual(spy.args[0][0].pathOrId, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Endpoint.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Endpoint.get(et, id);
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
        StoreEvents.Endpoint.update(et, id, prop, value);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.update, spy);
        StoreEvents.Endpoint.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.update, spy);
        StoreEvents.Endpoint.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Endpoint.update, spy);
        StoreEvents.Endpoint.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Endpoint.update, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Endpoint.update(et, id, prop, value);
      });
    });
  });
});
