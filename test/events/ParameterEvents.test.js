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

  describe('StoreEvents.Parameter', () => {
    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.get, spy);
        StoreEvents.Parameter.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.get, spy);
        StoreEvents.Parameter.get(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Parameter.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Parameter.get(et, id);
        assert.equal(result, data);
      });
    });

    describe('getRecursive()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getRecursive, spy);
        StoreEvents.Parameter.getRecursive(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getRecursive, spy);
        StoreEvents.Parameter.getRecursive(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Parameter.getRecursive, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Parameter.getRecursive(et, id);
        assert.equal(result, data);
      });
    });

    describe('getBulk()', () => {
      const ids = ['amf://id'];

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getBulk, spy);
        StoreEvents.Parameter.getBulk(et, ids);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getBulk, spy);
        StoreEvents.Parameter.getBulk(et, ids);
        assert.deepEqual(spy.args[0][0].detail.ids, ids);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Parameter.getBulk, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Parameter.getBulk(et, ids);
        assert.deepEqual(result, data);
      });
    });

    describe('getBulkRecursive()', () => {
      const ids = ['amf://id'];

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getBulkRecursive, spy);
        StoreEvents.Parameter.getBulkRecursive(et, ids);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.getBulkRecursive, spy);
        StoreEvents.Parameter.getBulkRecursive(et, ids);
        assert.deepEqual(spy.args[0][0].detail.ids, ids);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Parameter.getBulkRecursive, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Parameter.getBulkRecursive(et, ids);
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
        StoreEvents.Parameter.update(et, id, prop, value);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.update, spy);
        StoreEvents.Parameter.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.update, spy);
        StoreEvents.Parameter.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.update, spy);
        StoreEvents.Parameter.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Parameter.update, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Parameter.update(et, id, prop, value);
      });
    });

    describe('addExample()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.addExample, spy);
        StoreEvents.Parameter.addExample(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.addExample, spy);
        StoreEvents.Parameter.addExample(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.addExample, spy);
        StoreEvents.Parameter.addExample(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Parameter.addExample, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Parameter.addExample(et, id, init);
      });
    });

    describe('removeExample()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, spy);
        StoreEvents.Parameter.removeExample(et, id, parentId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, spy);
        StoreEvents.Parameter.removeExample(et, id, parentId);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, spy);
        StoreEvents.Parameter.removeExample(et, id, parentId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Parameter.removeExample, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Parameter.removeExample(et, id, parentId);
      });
    });
  });
});
