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

  describe('StoreEvents.Request', () => {
    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.get, spy);
        StoreEvents.Request.get(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.get, spy);
        StoreEvents.Request.get(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Request.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Request.get(et, id);
        assert.equal(result, data);
      });
    });

    describe('getRecursive()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.getRecursive, spy);
        StoreEvents.Request.getRecursive(et, id);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.getRecursive, spy);
        StoreEvents.Request.getRecursive(et, id);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true });
        et.addEventListener(StoreEventTypes.Request.getRecursive, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Request.getRecursive(et, id);
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
        et.addEventListener(StoreEventTypes.Request.update, spy);
        StoreEvents.Request.update(et, id, prop, value);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.update, spy);
        StoreEvents.Request.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('the event has the "property" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.update, spy);
        StoreEvents.Request.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.property, prop);
      });

      it('the event has the "value" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.update, spy);
        StoreEvents.Request.update(et, id, prop, value);
        assert.deepEqual(spy.args[0][0].detail.value, value);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.update, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.update(et, id, prop, value);
      });
    });

    describe('addPayload()', () => {
      const id = 'amf://id';
      const init = { mediaType: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addPayload, spy);
        StoreEvents.Request.addPayload(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addPayload, spy);
        StoreEvents.Request.addPayload(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addPayload, spy);
        StoreEvents.Request.addPayload(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.addPayload, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.addPayload(et, id, init);
      });
    });

    describe('removePayload()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removePayload, spy);
        StoreEvents.Request.removePayload(et, id, parentId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removePayload, spy);
        StoreEvents.Request.removePayload(et, id, parentId);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removePayload, spy);
        StoreEvents.Request.removePayload(et, id, parentId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.removePayload, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.removePayload(et, id, parentId);
      });
    });

    describe('addHeader()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addHeader, spy);
        StoreEvents.Request.addHeader(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addHeader, spy);
        StoreEvents.Request.addHeader(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addHeader, spy);
        StoreEvents.Request.addHeader(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.addHeader, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.addHeader(et, id, init);
      });
    });

    describe('removeHeader()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeHeader, spy);
        StoreEvents.Request.removeHeader(et, id, parentId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeHeader, spy);
        StoreEvents.Request.removeHeader(et, id, parentId);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeHeader, spy);
        StoreEvents.Request.removeHeader(et, id, parentId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.removeHeader, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.removeHeader(et, id, parentId);
      });
    });

    describe('addQueryParameter()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addQueryParameter, spy);
        StoreEvents.Request.addQueryParameter(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addQueryParameter, spy);
        StoreEvents.Request.addQueryParameter(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addQueryParameter, spy);
        StoreEvents.Request.addQueryParameter(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.addQueryParameter, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.addQueryParameter(et, id, init);
      });
    });

    describe('removeQueryParameter()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeQueryParameter, spy);
        StoreEvents.Request.removeQueryParameter(et, id, parentId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeQueryParameter, spy);
        StoreEvents.Request.removeQueryParameter(et, id, parentId);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeQueryParameter, spy);
        StoreEvents.Request.removeQueryParameter(et, id, parentId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.removeQueryParameter, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.removeQueryParameter(et, id, parentId);
      });
    });

    describe('addCookieParameter()', () => {
      const id = 'amf://id';
      const init = { name: 'test' };

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addCookieParameter, spy);
        StoreEvents.Request.addCookieParameter(et, id, init);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parentId" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addCookieParameter, spy);
        StoreEvents.Request.addCookieParameter(et, id, init);
        assert.equal(spy.args[0][0].detail.parentId, id);
      });

      it('the event has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.addCookieParameter, spy);
        StoreEvents.Request.addCookieParameter(et, id, init);
        assert.deepEqual(spy.args[0][0].detail.init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.addCookieParameter, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.addCookieParameter(et, id, init);
      });
    });

    describe('removeCookieParameter()', () => {
      const id = 'amf://id';
      const parentId = 'amf://param';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeCookieParameter, spy);
        StoreEvents.Request.removeCookieParameter(et, id, parentId);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "parent" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeCookieParameter, spy);
        StoreEvents.Request.removeCookieParameter(et, id, parentId);
        assert.equal(spy.args[0][0].detail.parent, parentId);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Request.removeCookieParameter, spy);
        StoreEvents.Request.removeCookieParameter(et, id, parentId);
        assert.equal(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Request.removeCookieParameter, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Request.removeCookieParameter(et, id, parentId);
      });
    });
  });
});
