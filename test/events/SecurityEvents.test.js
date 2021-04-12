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

  describe('StoreEvents.Security', () => {
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
        const data = [{ id: 'test security', type: 'OAuth 2.0' }];
        et.addEventListener(StoreEventTypes.Security.list, (e) => {
          e.detail.result = Promise.resolve(data);
        });
        const result = await StoreEvents.Security.list(et);
        assert.equal(result, data);
      });
    });
  });
});
