import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { Events as StoreEvents } from '../../src/events/Events.js';
import { EventTypes as StoreEventTypes } from '../../src/events/EventTypes.js';

describe('StoreEvents', () => {
  async function etFixture(): Promise<HTMLDivElement> {
    return fixture(html`<div></div>`);
  }

  describe('StoreEvents.Api', () => {
    describe('createWebApi()', () => {
      const init = { name: 'test api' };
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Api.createWebApi, spy);
        StoreEvents.Api.createWebApi(undefined, et);
        assert.isTrue(spy.calledOnce);
      });

      it('has the "init" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Api.createWebApi, spy);
        StoreEvents.Api.createWebApi(init, et);
        assert.deepEqual(spy.args[0][0].init, init);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = 'test-id';
        et.addEventListener(StoreEventTypes.Api.createWebApi, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Api.createWebApi(undefined, et);
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
          (e as CustomEvent).detail.result = Promise.resolve(data);
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
          (e as CustomEvent).detail.result = Promise.resolve(data);
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
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Api.get(et);
        assert.equal(result, data);
      });
    });
  });
});
