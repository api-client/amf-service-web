import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
// import { StoreEvents, StoreEventTypes } from  '../../worker.index.js';
import { Events as StoreEvents } from '../../src/events/Events.js';
import { EventTypes as StoreEventTypes } from '../../src/events/EventTypes.js';


describe('StoreEvents', () => {
  async function etFixture(): Promise<HTMLDivElement> {
    return fixture(html`<div></div>`);
  }

  describe('StoreEvents.CustomProperty', () => {
    describe('list()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.list, spy);
        StoreEvents.CustomProperty.list(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = [{ id: 'test type' }];
        et.addEventListener(StoreEventTypes.CustomProperty.list, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.CustomProperty.list(et);
        assert.equal(result, data);
      });
    });

    describe('add()', () => {
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.add, spy);
        StoreEvents.CustomProperty.add(init, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.add, spy);
        StoreEvents.CustomProperty.add(init, et);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ id: 'amf://created-id' });
        et.addEventListener(StoreEventTypes.CustomProperty.add, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.CustomProperty.add(init, et);
        assert.equal(result, data);
      });
    });

    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.get, spy);
        StoreEvents.CustomProperty.get(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.get, spy);
        StoreEvents.CustomProperty.get(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { test: true } as unknown;
        et.addEventListener(StoreEventTypes.CustomProperty.get, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.CustomProperty.get(id, et);
        assert.equal(result, data);
      });
    });

    describe('getExtension()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.getExtension, spy);
        StoreEvents.CustomProperty.getExtension(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.getExtension, spy);
        StoreEvents.CustomProperty.getExtension(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { test: true } as unknown;
        et.addEventListener(StoreEventTypes.CustomProperty.getExtension, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.CustomProperty.getExtension(id, et);
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
        et.addEventListener(StoreEventTypes.CustomProperty.update, spy);
        StoreEvents.CustomProperty.update(id, prop, value, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.update, spy);
        StoreEvents.CustomProperty.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.update, spy);
        StoreEvents.CustomProperty.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.update, spy);
        StoreEvents.CustomProperty.update(id, prop, value, et);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.CustomProperty.update, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.CustomProperty.update(id, prop, value, et);
      });
    });

    describe('delete()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.delete, spy);
        StoreEvents.CustomProperty.delete(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.CustomProperty.delete, spy);
        StoreEvents.CustomProperty.delete(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.CustomProperty.delete, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.CustomProperty.delete(id, et);
      });
    });
  });
});
