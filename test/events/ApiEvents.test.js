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

  describe('StoreEvents.Api', () => {
    describe('createWebApi()', () => {
      const init = { name: 'test api' };
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Api.createWebApi, spy);
        StoreEvents.Api.createWebApi(et);
        assert.isTrue(spy.calledOnce);
      });

      it('has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Api.createWebApi, spy);
        StoreEvents.Api.createWebApi(et, init);
        assert.deepEqual(spy.args[0][0].init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = 'test-id';
        et.addEventListener(StoreEventTypes.Api.createWebApi, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Api.createWebApi(et);
        assert.equal(result, data);
      });
    });

    describe('generateRaml()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Api.generateRaml, spy);
        StoreEvents.Api.generateRaml(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = 'test data';
        et.addEventListener(StoreEventTypes.Api.generateRaml, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Api.generateRaml(et);
        assert.equal(result, data);
      });
    });

    describe('generateGraph()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Api.generateGraph, spy);
        StoreEvents.Api.generateGraph(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = 'test data';
        et.addEventListener(StoreEventTypes.Api.generateGraph, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Api.generateGraph(et);
        assert.equal(result, data);
      });
    });

    describe('get()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Api.get, spy);
        StoreEvents.Api.get(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = { id: 'test' };
        et.addEventListener(StoreEventTypes.Api.get, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Api.get(et);
        assert.equal(result, data);
      });
    });
  });
});
