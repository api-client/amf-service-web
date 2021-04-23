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

  describe('StoreEvents.Payload', () => {
    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.get, spy);
        StoreEvents.Payload.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.get, spy);
        StoreEvents.Payload.get(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Payload.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Payload.get(et, id);
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
        et.addEventListener(StoreEventTypes.Payload.update, spy);
        StoreEvents.Payload.update(et, id, prop, value);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.update, spy);
        StoreEvents.Payload.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.update, spy);
        StoreEvents.Payload.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.update, spy);
        StoreEvents.Payload.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Payload.update, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Payload.update(et, id, prop, value);
      });
    });

    describe('addExample()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.addExample, spy);
        StoreEvents.Payload.addExample(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.addExample, spy);
        StoreEvents.Payload.addExample(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.addExample, spy);
        StoreEvents.Payload.addExample(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Payload.addExample, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Payload.addExample(et, id, init);
      });
    });

    describe('removeExample()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.removeExample, spy);
        StoreEvents.Payload.removeExample(et, id, parentId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.removeExample, spy);
        StoreEvents.Payload.removeExample(et, id, parentId);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Payload.removeExample, spy);
        StoreEvents.Payload.removeExample(et, id, parentId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Payload.removeExample, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Payload.removeExample(et, id, parentId);
      });
    });
  });
});
