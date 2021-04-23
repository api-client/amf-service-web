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

    describe('addRequest()', () => {
      const id = 'amf://id';
      const init = { description: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.addRequest, spy);
        StoreEvents.Operation.addRequest(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.addRequest, spy);
        StoreEvents.Operation.addRequest(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.addRequest, spy);
        StoreEvents.Operation.addRequest(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Operation.addRequest, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Operation.addRequest(et, id, init);
      });
    });

    describe('removeRequest()', () => {
      const id = 'amf://id';
      const operationId = 'amf://op';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.removeRequest, spy);
        StoreEvents.Operation.removeRequest(et, id, operationId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.removeRequest, spy);
        StoreEvents.Operation.removeRequest(et, id, operationId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.removeRequest, spy);
        StoreEvents.Operation.removeRequest(et, id, operationId);
        assert.equal(spy.args[0][0].detail.parent, operationId);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Operation.removeRequest, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Operation.removeRequest(et, id, operationId);
      });
    });

    describe('addResponse()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.addResponse, spy);
        StoreEvents.Operation.addResponse(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.addResponse, spy);
        StoreEvents.Operation.addResponse(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.addResponse, spy);
        StoreEvents.Operation.addResponse(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Operation.addResponse, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Operation.addResponse(et, id, init);
      });
    });

    describe('removeResponse()', () => {
      const id = 'amf://id';
      const operationId = 'amf://op';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.removeResponse, spy);
        StoreEvents.Operation.removeResponse(et, id, operationId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.removeResponse, spy);
        StoreEvents.Operation.removeResponse(et, id, operationId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.removeResponse, spy);
        StoreEvents.Operation.removeResponse(et, id, operationId);
        assert.equal(spy.args[0][0].detail.parent, operationId);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Operation.removeResponse, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Operation.removeResponse(et, id, operationId);
      });
    });

    describe('getParent()', () => {
      const methodOrId = 'amf://id';
      const pathOrId = 'amf://end';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.getParent, spy);
        StoreEvents.Operation.getParent(et, methodOrId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "methodOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.getParent, spy);
        StoreEvents.Operation.getParent(et, methodOrId);
        assert.equal(spy.args[0][0].detail.methodOrId, methodOrId);
      });

      it('the event has the "pathOrId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Operation.getParent, spy);
        StoreEvents.Operation.getParent(et, methodOrId, pathOrId);
        assert.equal(spy.args[0][0].detail.pathOrId, pathOrId);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Operation.getParent, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Operation.getParent(et, methodOrId);
      });
    });
  });
});
