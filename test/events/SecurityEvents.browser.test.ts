import { assert, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
// import { StoreEvents, StoreEventTypes } from  '../../worker.index.js';
import { Events as StoreEvents } from '../../src/events/Events.js';
import { EventTypes as StoreEventTypes } from '../../src/events/EventTypes.js';

describe('StoreEvents', () => {
  async function etFixture(): Promise<HTMLDivElement> {
    return fixture(html`<div></div>`);
  }

  describe('StoreEvents.Security', () => {
    describe('get()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.get, spy);
        StoreEvents.Security.get(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.get, spy);
        StoreEvents.Security.get(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Security.get, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Security.get(id, et);
        assert.equal(result, data);
      });
    });

    describe('getRecursive()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getRecursive, spy);
        StoreEvents.Security.getRecursive(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getRecursive, spy);
        StoreEvents.Security.getRecursive(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Security.getRecursive, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Security.getRecursive(id, et);
        assert.equal(result, data);
      });
    });

    describe('getRequirement()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getRequirement, spy);
        StoreEvents.Security.getRequirement(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getRequirement, spy);
        StoreEvents.Security.getRequirement(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Security.getRequirement, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Security.getRequirement(id, et);
        assert.equal(result, data);
      });
    });

    describe('getRequirementRecursive()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getRequirementRecursive, spy);
        StoreEvents.Security.getRequirementRecursive(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getRequirementRecursive, spy);
        StoreEvents.Security.getRequirementRecursive(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Security.getRequirementRecursive, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Security.getRequirementRecursive(id, et);
        assert.equal(result, data);
      });
    });

    describe('getSettings()', () => {
      const id = 'amf://id';

      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getSettings, spy);
        StoreEvents.Security.getSettings(id, et);
        assert.isTrue(spy.calledOnce);
      });

      it('the event has the "id" property', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.getSettings, spy);
        StoreEvents.Security.getSettings(id, et);
        assert.deepEqual(spy.args[0][0].detail.id, id);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = /** @type any */ ({ test: true }) as unknown;
        et.addEventListener(StoreEventTypes.Security.getSettings, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Security.getSettings(id, et);
        assert.equal(result, data);
      });
    });

    describe('list()', () => {
      it('dispatches the event', async () => {
        const et = await etFixture();
        const spy = sinon.spy();
        et.addEventListener(StoreEventTypes.Security.list, spy);
        StoreEvents.Security.list(et);
        assert.isTrue(spy.calledOnce);
      });

      it('waits until resolved', async () => {
        const et = await etFixture();
        const data = [{ id: 'test security', type: 'OAuth 2.0' }] as unknown;
        et.addEventListener(StoreEventTypes.Security.list, (e) => {
          (e as CustomEvent).detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Security.list(et);
        assert.equal(result, data);
      });
    });
  });
});
