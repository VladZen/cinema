import Vue from 'vue'
import { mount } from '@vue/test-utils';
import App from '@/App'
import random from '@/utils/getRandomNumber'

describe('App.vue', () => {
  let mounted

  beforeAll(() => {
    mounted = mount(App)
  })

  it('should have 100 rubles as one seat\'s cost by default', () => {
    expect(mounted.vm.seatPrice).toBe(100)
  })

  it('should have 10 rows by default', () => {
    expect(mounted.vm.seats).toBe(10)
  })

  it('should have 10 seats in row by default', () => {
    expect(mounted.vm.rows).toBe(10)
  })

  it('should have 10 booked places by default', () => {
    expect(mounted.vm.bookedPlaces.length).toBe(10)
  })

  describe('Main flow', () => {
    it('will not change `chosen` if user will click one of the booked seats', () => {
      const seat = mounted.vm.bookedPlaces[random(0, mounted.vm.bookedPlaces.length - 1)]
      mounted.find(`.row:nth-child(${seat[0]}) .seat:nth-child(${seat[1]})`).trigger('click')
      expect(mounted.vm.chosen).toEqual([])
    })

    // https://github.com/vuejs/vue-test-utils/issues/1034
    // bug with false warning
    it('will update `chosen` if user will click one of the free seats', () => {
      const freeSeat = mounted.findAll(`.seat:not(.seat--booked)`).at(1)
      const number = freeSeat.vm.seatNumber
      const row = freeSeat.vm.$parent.rowNumber
      freeSeat.trigger('click')
      expect(mounted.vm.chosen).toEqual([[row, number]])
      freeSeat.trigger('click')
      expect(mounted.vm.chosen).toEqual([])
    })

    it('should show correct amount and list of tickets', () => {
      const freeSeat = mounted.findAll(`.seat:not(.seat--booked)`).at(2)
      freeSeat.trigger('click')
      expect(mounted.find('.cart__amount').text()).toBe('Total cost: 100 rubles')
    })

    it('should handle `Buy` button click', () => {
      const currentTicket = mounted.vm.chosen[0]
      const windowSpy = jest.spyOn(window, 'alert').mockImplementation(() => jest.fn())
      mounted.find('button[name="buy"]').trigger('click')
      expect(windowSpy).toHaveBeenCalled()
      windowSpy.mockRestore()
      expect(mounted.find(`.row:nth-child(${currentTicket[0]}) .seat:nth-child(${currentTicket[1]})`).classes()).toContain('seat--booked')

      expect(mounted.vm.chosen.find((item) => item[0] == currentTicket[0] && item[1] == currentTicket[1])).toBeUndefined()

      expect(typeof mounted.vm.booked.find((item) => item[0] == currentTicket[0] && item[1] == currentTicket[1])).toBe('object')
    })

    it('should handle `Cancel` button click', () => {
      const freeSeat = mounted.findAll(`.seat:not(.seat--booked)`).at(1)
      freeSeat.trigger('click')
      mounted.find('button[name="cancel"]').trigger('click')
      expect(mounted.vm.chosen).toEqual([])
    })
  })
})
