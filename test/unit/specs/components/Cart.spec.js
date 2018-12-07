import Vue from 'vue'
import { mount } from '@vue/test-utils';
import Cart from '@/components/Cart'

describe('Cart.vue', () => {
  let mounted;

  beforeAll(() => {
    mounted = mount(Cart, {
      propsData: {
        seatCost: 100
      }
    })
  })

  it('should have no seats to buy by default', () => {
    expect(mounted.props().seatsToBuy).toEqual([])
  })

  it('should display description that cart is empty', () => {
    const cartEmpty = mounted.find('.cart__empty')
    expect(cartEmpty.exists()).toBeTruthy()
    expect(cartEmpty.isVisible()).toBeTruthy()
    expect(cartEmpty.text()).toBe('Your cart is empty')
  })

  it('should hide main card info and controls by default', () => {
    const chosen = mounted.find('.cart__chosen')
    const amount = mounted.find('.cart__amount')
    const controls = mounted.find('.cart__controls')

    expect(chosen.isVisible()).toBeFalsy()
    expect(amount.isVisible()).toBeFalsy()
    expect(controls.isVisible()).toBeFalsy()
  })

  describe('Cart is not empty', () => {
    beforeAll(() => {
      mounted.setProps({
        seatsToBuy: [[1, 2], [5, 9], [3, 4], [3, 3]]
      })
    })

    it('should hide description that cart is empty', () => {
      const cartEmpty = mounted.find('.cart__empty')
      expect(cartEmpty.exists()).toBeTruthy()
      expect(cartEmpty.isVisible()).toBeFalsy()
    })

    it('should show main cart info', () => {
      const chosen = mounted.find('.cart__chosen')
      const amount = mounted.find('.cart__amount')
      const controls = mounted.find('.cart__controls')

      expect(chosen.isVisible()).toBeTruthy()
      expect(amount.isVisible()).toBeTruthy()
      expect(controls.isVisible()).toBeTruthy()
    })

    it('should display list of selected places properly and sorted', () => {
      expect(mounted.vm.seatsSorted).toEqual([[1, 2], [3, 3], [3, 4], [5, 9]])
      expect(mounted.find('.cart__chosen__list li:nth-child(3)').text()).toBe('3 row 4 seat')
    })

    it('should display total properly', () => {
      expect(mounted.find('.cart__amount').text()).toBe('Total cost: 400 rubles')
    })

    it('should emit `cancel` event while by clicking on `Cancel` button', () => {
      const cancelButton = mounted.find('.cart__controls button[name="cancel"]');
      cancelButton.trigger('click')
      expect(mounted.emitted()['cancel'].length).toBe(1)
      expect(cancelButton.text()).toBe('Cancel')
    });

    it('should emit `buy` event while by clicking on `Buy` button', () => {
      const buyButton = mounted.find('.cart__controls button[name="buy"]');
      buyButton.trigger('click')
      expect(mounted.emitted()['buy'].length).toBe(1)
      expect(buyButton.text()).toBe('Buy')
    });
  })

  afterAll(() => {
    mounted.destroy()
  })
})
