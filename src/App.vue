<template>
  <div class="cinema">
    <div class="cinema__plan">
      <row v-for="index in rows"
           :key="index"
           :seats-count="seats"
           :row-number="index"
           :booked="getBooked(index)"
           :selected="getSelected(index)"
           @toggle="setSelected"/>
    </div>

    <cart class="cinema__cart"
          :seat-cost="seatPrice"
          :seats-to-buy="chosen"
          @buy="applyOrder"
          @cancel="clearCart" />
  </div>
</template>

<script>
// utils
import random from '@/utils/getRandomNumber'
import mapToRows from '@/utils/mapChosenToRows'
import getIndex from '@/utils/getIndex'

// components
import Row from '@/components/Row'
import Cart from '@/components/Cart'

export default {
  name: 'Cinema',
  props: {
    rows: {
      type: Number,
      default: 10
    },
    seats: {
      type: Number,
      default: 10
    },
    seatPrice: {
      type: Number,
      default: 100
    },
    bookedPlaces: {
      type: Array,
      default () {
        let array = []
        while (array.length < 10) {
          const seat = [random(1, this.rows), random(1, this.seats)]
          const alreadyBooked = getIndex(array, seat) > -1
          if (!alreadyBooked) {
            array.push(seat)
          }
        }
        return array
      }
    }
  },
  components: {
    Row,
    Cart
  },
  methods: {
    applyOrder () {
      this.booked = [...this.booked, ...this.chosen]
      this.clearCart()
      window.alert('Thanks for your order! Have a nice watching! =)')
    },
    clearCart () {
      this.chosen = []
    },
    getBooked (index) {
      return this.bookedMapped[index] || []
    },
    getSelected (index) {
      return this.chosenMapped[index] || []
    },
    setSelected (seat) {
      const index = getIndex(this.chosen, seat)
      if (index > -1) {
        this.chosen.splice(index, 1)
      } else {
        this.chosen.push(seat)
      }
    }
  },
  computed: {
    chosenMapped () {
      return mapToRows(this.chosen)
    },
    bookedMapped () {
      return mapToRows(this.booked)
    }
  },
  data () {
    return {
      chosen: [],
      booked: this.bookedPlaces
    }
  }
}
</script>

<style lang="scss" scoped>
.cinema {
  display: flex;
  align-items: stretch;

  &__cart {
    align-self: flex-start;
  }
}
</style>
