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

  describe('StoreEvents.Type', () => {
    describe('list()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.list, spy);
        StoreEvents.Type.list(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = [{ id: 'test type' }];
        et.addEventListener(StoreEventTypes.Type.list, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Type.list(et);
        assert.equal(result, data);
      });
    });

    describe('add()', () => {
      const init = { type: 'string' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.add, spy);
        StoreEvents.Type.add(et, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.add, spy);
        StoreEvents.Type.add(et, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ('amf://created-id');
        et.addEventListener(StoreEventTypes.Type.add, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Type.add(et, init);
        assert.equal(result, data);
      });
    });

    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.get, spy);
        StoreEvents.Type.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.get, spy);
        StoreEvents.Type.get(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Type.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Type.get(et, id);
        assert.equal(result, data);
      });
    });

    describe('getBulk()', () => {
      const ids = ['amf://id'];

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.getBulk, spy);
        StoreEvents.Type.getBulk(et, ids);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.getBulk, spy);
        StoreEvents.Type.getBulk(et, ids);
        assert.deepEqual(spy.args[0][0].detail.ids, ids);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Type.getBulk, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Type.getBulk(et, ids);
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
        et.addEventListener(StoreEventTypes.Type.update, spy);
        StoreEvents.Type.update(et, id, prop, value);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.update, spy);
        StoreEvents.Type.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.update, spy);
        StoreEvents.Type.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.update, spy);
        StoreEvents.Type.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Type.update, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Type.update(et, id, prop, value);
      });
    });

    describe('delete()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.delete, spy);
        StoreEvents.Type.delete(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.delete, spy);
        StoreEvents.Type.delete(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Type.delete, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Type.delete(et, id);
      });
    });

    describe('addProperty()', () => {
      const init = { name: 'string' };
      const id = 'test-id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.addProperty, spy);
        StoreEvents.Type.addProperty(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.addProperty, spy);
        StoreEvents.Type.addProperty(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.addProperty, spy);
        StoreEvents.Type.addProperty(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.parent, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ id: 'test' });
        et.addEventListener(StoreEventTypes.Type.addProperty, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Type.addProperty(et, id, init);
        assert.equal(result, data);
      });
    });

    describe('getProperty()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.getProperty, spy);
        StoreEvents.Type.getProperty(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.getProperty, spy);
        StoreEvents.Type.getProperty(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Type.getProperty, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Type.getProperty(et, id);
        assert.equal(result, data);
      });
    });

    describe('deleteProperty()', () => {
      const id = 'amf://id';
      const typeId = 'amf://type-id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.deleteProperty, spy);
        StoreEvents.Type.deleteProperty(et, id, typeId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.deleteProperty, spy);
        StoreEvents.Type.deleteProperty(et, id, typeId);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.deleteProperty, spy);
        StoreEvents.Type.deleteProperty(et, id, typeId);
        assert.deepEqual(spy.args[0][0].detail.parent, typeId);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Type.deleteProperty, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Type.deleteProperty(et, id, typeId);
      });
    });

    describe('updateProperty()', () => {
      const id = 'amf://id';
      const parent = 'amf://type-id';
      const prop = 'name';
      const value = 'test-value';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.updateProperty, spy);
        StoreEvents.Type.updateProperty(et, parent, id, prop, value);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.updateProperty, spy);
        StoreEvents.Type.updateProperty(et, parent, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.updateProperty, spy);
        StoreEvents.Type.updateProperty(et, parent, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.updateProperty, spy);
        StoreEvents.Type.updateProperty(et, parent, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Type.updateProperty, spy);
        StoreEvents.Type.updateProperty(et, parent, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.parent, parent);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Type.updateProperty, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Type.updateProperty(et, parent, id, prop, value);
      });
    });
  });
});
