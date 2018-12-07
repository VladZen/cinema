import Vue from 'vue'
import { mount } from '@vue/test-utils';
import Seat from '@/components/Seat'

describe('Seat.vue', () => {
  let mounted;

  beforeAll(() => {
    mounted = mount(Seat, {
      propsData: {
        seatNumber: 1
      }
    })
  })

  it('should render free seat by default', () => {
    expect(mounted.props().isBooked).toBeFalsy()
  })

  it('should render non-selected seat by default', () => {
    expect(mounted.props().isSelected).toBeFalsy()
  })

  it('should emit `select` event on click', () => {
    mounted.trigger('click')
    expect(mounted.emitted()['select'].length).toBe(1)
  })

  it('shouldn\'t emit `select` event on click if seat is already booked', () => {
    mounted.setProps({ isBooked: true });
    mounted.trigger('click')
    expect(mounted.emitted()['select'].length).toBe(1)
  })

  it('should have a proper class name if isBooked', () => {
    expect(mounted.classes()).toContain('seat--booked')
  })

  it('should have a proper class name if isSelected', () => {
    mounted.setProps({
      isBooked: false,
      isSelected: true
    });
    expect(mounted.classes()).toContain('seat--selected')
  })

  it('should display seat number inside', () => {
    expect(mounted.text()).toBe('1')
  })

  afterAll(() => {
    mounted.destroy()
  })
})
