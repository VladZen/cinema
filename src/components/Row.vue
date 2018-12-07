<template lang="html">
  <div class="row">
    <seat v-for="index in seatsCount"
          :key="index"
          :seat-number="index"
          :is-booked="isBooked(index)"
          :is-selected="isSelected(index)"
          @select="toggleSelection" />
  </div>
</template>

<script>
import Seat from '@/components/Seat'

export default {
  name: 'Row',
  props: {
    booked: {
      type: Array,
      default () {
        return []
      }
    },
    selected: {
      type: Array,
      default () {
        return []
      }
    },
    rowNumber: {
      type: Number,
      required: true
    },
    seatsCount: {
      type: Number,
      reauired: true
    }
  },
  components: {
    Seat
  },
  methods: {
    isBooked (index) {
      return this.booked.indexOf(index) > -1
    },
    isSelected (index) {
      return this.selected.indexOf(index) > -1
    },
    toggleSelection (seatNumber) {
      this.$emit('toggle', [this.rowNumber, seatNumber])
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    display: flex;

    & + .row {
      margin-top: 10px;
    }
  }
</style>
