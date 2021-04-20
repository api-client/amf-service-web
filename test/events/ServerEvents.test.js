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

  describe('StoreEvents.Server', () => {
    describe('list()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Server.list, spy);
        StoreEvents.Server.list(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = [{ id: 'test server', url: 'https://domain.com' }];
        et.addEventListener(StoreEventTypes.Server.list, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Server.list(et);
        assert.equal(result, data);
      });
    });

    describe('add()', () => {
      const init = { url: 'https://domain.com' };
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Server.add, spy);
        StoreEvents.Server.add(et, init);
        assert.isTrue(spy.calledOnce);
      });

      it('has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Server.add, spy);
        StoreEvents.Server.add(et, init);
        assert.deepEqual(spy.args[0][0].init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { id: 'test' };
        et.addEventListener(StoreEventTypes.Server.add, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Server.add(et, init);
        assert.equal(result, data);
      });
    });

    describe('get()', () => {
      const id = 'srv-id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Server.get, spy);
        StoreEvents.Server.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Server.get, spy);
        StoreEvents.Server.get(et, id);
        assert.equal(spy.args[0][0].id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { id: 'test' };
        et.addEventListener(StoreEventTypes.Server.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Server.get(et, id);
        assert.equal(result, data);
      });
    });
  });
});
