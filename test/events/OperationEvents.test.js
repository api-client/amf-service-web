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

  describe('StoreEvents.Operation', () => {
    describe('add()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.add, spy);
        StoreEvents.Operation.add(et, 'id', { method: 'get' });
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.add, spy);
        const init = { method: 'get' };
        StoreEvents.Operation.add(et, 'id', init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('the event has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.add, spy);
        const init = { method: 'get' };
        StoreEvents.Operation.add(et, 'id', init);
        assert.deepEqual(spy.args[0][0].detail.pathOrId, 'id');
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({id: 'amf://created-id'});
        et.addEventListener(StoreEventTypes.Operation.add, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const init = { method: 'get' };
        const result = await StoreEvents.Operation.add(et, 'id', init);
        assert.equal(result, data);
      });
    });

    describe('delete()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.delete, spy);
        StoreEvents.Operation.delete(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.delete, spy);
        StoreEvents.Operation.delete(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Operation.delete, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Operation.delete(et, id);
      });
    });

    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.get, spy);
        StoreEvents.Operation.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('has the "methodOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.get, spy);
        StoreEvents.Operation.get(et, id);
        assert.equal(spy.args[0][0].detail.methodOrId, id);
      });

      it('has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.get, spy);
        StoreEvents.Operation.get(et, id, '/test');
        assert.equal(spy.args[0][0].detail.pathOrId, '/test');
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { id: 'test' };
        et.addEventListener(StoreEventTypes.Operation.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Operation.get(et, id);
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
        et.addEventListener(StoreEventTypes.Operation.update, spy);
        StoreEvents.Operation.update(et, id, prop, value);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.update, spy);
        StoreEvents.Operation.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.update, spy);
        StoreEvents.Operation.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.update, spy);
        StoreEvents.Operation.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Operation.update, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Operation.update(et, id, prop, value);
      });
    });
  });
});
