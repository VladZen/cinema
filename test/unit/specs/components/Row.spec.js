import Vue from 'vue'
import { mount } from '@vue/test-utils';
import Row from '@/components/Row'

describe('Row.vue', () => {
  let mounted;

  const seats = () => {
    return mounted.findAll('.seat')
  }

  beforeAll(() => {
    mounted = mount(Row, {
      propsData: {
        rowNumber: 1,
        seatsCount: 10
      }
    })
  })

  it('should have no booked or selected seats by default', () => {
    expect(mounted.props().booked).toEqual([])
    expect(mounted.props().selected).toEqual([])
  })

  it('should render 10 Seat components', () => {
    const tempSeats = seats()
    expect(tempSeats.at(1).isVueInstance()).toBeTruthy()
    expect(tempSeats.length).toBe(10)
  })

  describe('Booking and selection', () => {
    beforeAll(() => {
      mounted.setProps({
        booked: [1, 5, 7],
        selected: [2, 6]
      })
    });

    it('should handle isBooked', () => {
      expect(mounted.vm.isBooked(5)).toBeTruthy()
      expect(mounted.vm.isBooked(2)).toBeFalsy()
    })

    it('should handle isSelected', () => {
      expect(mounted.vm.isSelected(2)).toBeTruthy()
      expect(mounted.vm.isSelected(1)).toBeFalsy()
    })

    it('should emit `toggle` when clicking on free or selected Seat', () => {
      const tempSeats = seats()
      tempSeats.at(3).trigger('click')
      expect(mounted.emitted()['toggle'].length).toBe(1)
      expect(tempSeats.at(3).emitted()['select'].length).toBe(1)
      tempSeats.at(1).trigger('click')
      expect(mounted.emitted()['toggle'].length).toBe(2)
      expect(tempSeats.at(1).emitted()['select'].length).toBe(1)
    })

    it('shouldn\'t emit `toggle` when clicking on booked Seat', () => {
      const tempSeats = seats()
      tempSeats.at(0).trigger('click')
      expect(mounted.emitted()['toggle'].length).toBe(2)
      expect(tempSeats.at(0).emitted()['select']).toBeUndefined()
    })
  })

  afterAll(() => {
    mounted.destroy()
  })
})
