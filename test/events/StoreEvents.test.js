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

  describe('StoreEvents.Store', () => {
    describe('init()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.init, spy);
        StoreEvents.Store.init(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Store.init, (e) => {
          e.detail.result = Promise.resolve();
        });
        await StoreEvents.Store.init(et);
      });
    });

    describe('loadGraph()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadGraph, spy);
        StoreEvents.Store.loadGraph(et, '');
        assert.isTrue(spy.calledOnce);
      });

      it('has the model on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadGraph, spy);
        const model = 'MODEL';
        StoreEvents.Store.loadGraph(et, model);
        assert.equal(spy.args[0][0].detail.model, model);
      });
    });

    describe('loadApi()', () => {
      const contents = [];
      const main = 'test.raml';
      const vendor = 'OAS 3.0';
      const mediaType = 'application/raml';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(et, contents, main, vendor, mediaType);
        assert.isTrue(spy.calledOnce);
      });

      it('has the contents on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(et, contents, main, vendor, mediaType);
        assert.strictEqual(spy.args[0][0].detail.contents, contents);
      });

      it('has the main on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(et, contents, main, vendor, mediaType);
        assert.strictEqual(spy.args[0][0].detail.main, main);
      });

      it('has the vendor on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(et, contents, main, vendor, mediaType);
        assert.strictEqual(spy.args[0][0].detail.vendor, vendor);
      });

      it('has the mediaType on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(et, contents, main, vendor, mediaType);
        assert.strictEqual(spy.args[0][0].detail.mediaType, mediaType);
      });
    });
  });
});
