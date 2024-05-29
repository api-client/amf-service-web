import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { Events as StoreEvents } from '../../src/events/Events.js';
import { EventTypes as StoreEventTypes } from '../../src/events/EventTypes.js';

describe('StoreEvents', () => {
  async function etFixture(): Promise<HTMLDivElement> {
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
          (e as CustomEvent).detail.result = Promise.resolve();
        });
        await StoreEvents.Store.init(et);
      });
    });

    describe('loadGraph()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadGraph, spy);
        StoreEvents.Store.loadGraph('', 'RAML 1.0', et);
        assert.isTrue(spy.calledOnce);
      });

      it('has the model on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadGraph, spy);
        const model = 'MODEL';
        StoreEvents.Store.loadGraph(model, 'RAML 1.0', et);
        assert.equal(spy.args[0][0].detail.model, model);
      });
    });

    describe('loadApi()', () => {
      const contents = [];
      const main = 'test.raml';
      const vendor = 'OAS 3.0';
      const mediaType = 'application/raml10+yaml';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(contents, main, vendor, mediaType, et);
        assert.isTrue(spy.calledOnce);
      });

      it('has the contents on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(contents, main, vendor, mediaType, et);
        assert.strictEqual(spy.args[0][0].detail.contents, contents);
      });

      it('has the main on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(contents, main, vendor, mediaType, et);
        assert.strictEqual(spy.args[0][0].detail.main, main);
      });

      it('has the vendor on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(contents, main, vendor, mediaType, et);
        assert.strictEqual(spy.args[0][0].detail.vendor, vendor);
      });

      it('has the mediaType on the detail object', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.loadApi, spy);
        StoreEvents.Store.loadApi(contents, main, vendor, mediaType, et);
        assert.strictEqual(spy.args[0][0].detail.mediaType, mediaType);
      });
    });

    describe('hasApi()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Store.hasApi, spy);
        StoreEvents.Store.hasApi(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        et.addEventListener(StoreEventTypes.Store.hasApi, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(true);
        });
        const result = await StoreEvents.Store.hasApi(et);
        assert.isTrue(result);
      });
    });
  });
});
