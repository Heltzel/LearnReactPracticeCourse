const reducer = (state, action) => {
  const clearCart = () => {
    return { ...state, cart: [] }
  }

  const removeItem = () => {
    const newCart = state.cart.filter((item) => {
      return item.id !== action.payload
    })
    return { ...state, cart: newCart }
  }

  const toggleAmount = () => {
    let tempCart = state.cart
      .map((cartItem) => {
        if (
          cartItem.id === action.payload.id &&
          action.payload.type === 'increase'
        ) {
          return { ...cartItem, amount: cartItem.amount + 1 }
        }
        if (
          cartItem.id === action.payload.id &&
          action.payload.type === 'decrease'
        ) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((cartItem) => {
        return cartItem.amount !== 0
      })
    return { ...state, cart: tempCart }
  }

  const getTotals = () => {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount
        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      },
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }

  const loading = () => {
    return { ...state, loading: true }
  }

  const displayItems = () => {
    return { ...state, cart: action.payload, loading: false }
  }

  switch (action.type) {
    case 'CLEAR_CART':
      return clearCart()
    case 'REMOVE_ITEM':
      return removeItem()
    case 'TOGGLE_AMOUNT':
      return toggleAmount()
    case 'GET_TOTALS':
      return getTotals()
    case 'LOADING':
      return loading()
    case 'DISPLAY_ITEMS':
      return displayItems()
    default:
      return state
  }
}

export default reducer
