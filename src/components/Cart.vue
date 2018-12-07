<template lang="html">
  <div class="cart">
    <div class="cart__top">
      <h1>
        Cart
      </h1>

      <div class="cart__empty"
           v-show="!seatsToBuy.length">
        Your cart is empty
      </div>
    </div>

    <div class="cart__bottom"
         v-show="seatsToBuy.length">
      <div class="cart__chosen">
        You have chosen:
        <ul class="cart__chosen__list">
          <li v-for="(seat, index) in seatsSorted"
              :key="index">
            {{ seat[0] }} row {{ seat[1] }} seat
          </li>
        </ul>
      </div>

      <div class="cart__amount">
        Total cost: {{ total }}
      </div>

      <div class="cart__controls">
        <button type="button"
                name="buy"
                @click="buy">
          Buy
        </button>

        <button type="button"
                name="cancel"
                @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seatCost: {
      type: Number,
      required: true
    },
    seatsToBuy: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    buy () {
      this.$emit('buy')
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    total () {
      return `${this.seatCost * this.seatsToBuy.length} rubles`
    },
    seatsSorted () {
      return [...this.seatsToBuy].sort((a, b) => a[0] - b[0] || a[1] - b[1])
    }
  }
}
</script>

<style lang="scss">
.cart {
  border: 1px solid;
  padding: 10px;
  margin-left: 20px;

  &__active {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__empty {
    text-align: center;
  }

  &__amount {
    font-weight: bold;
    margin-top: 15px;
  }

  &__chosen {
    &__list {
      padding-left: 20px;
    }
  }

  &__top {
    h1 {
      margin-top: 0;
    }
  }

  &__controls {
    margin-top: 10px;
  }
}
</style>
