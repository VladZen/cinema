<template>
  <div class="seat"
       :class="styles"
       @click="select">
    {{ seatNumber }}
  </div>
</template>

<script>
export default {
  name: 'Seat',
  props: {
    isBooked: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    seatNumber: {
      type: Number,
      required: true
    }
  },
  methods: {
    select () {
      if (!this.isBooked) {
        this.$emit('select', this.seatNumber)
      }
    }
  },
  computed: {
    styles () {
      return {
        'seat--selected': this.isSelected,
        'seat--booked': this.isBooked
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.seat {
  width: 30px;
  height: 30px;
  border: 1px solid;
  display: block;
  margin: 0px 2px;

  &--selected {
    background-color: #ffff4d;
  }

  &--booked {
    background-color: #da2020;
  }
}
</style>
