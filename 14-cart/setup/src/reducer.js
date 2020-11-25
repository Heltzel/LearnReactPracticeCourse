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

  const increaseAmount = () => {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }

  const decreaseAmount = () => {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
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

  switch (action.type) {
    case 'CLEAR_CART':
      return clearCart()
    case 'REMOVE_ITEM':
      return removeItem()
    case 'INCREASE_AMOUNT':
      return increaseAmount()
    case 'DECREASE_AMOUNT':
      return decreaseAmount()
    case 'GET_TOTALS':
      return getTotals()
    default:
      return state
  }

  // if (action.type === 'CLEAR_CART') {
  //   return { ...state, cart: [] }
  // }
  // if (action.type === 'REMOVE_ITEM') {
  //   const newCart = state.cart.filter((item) => {
  //     return item.id !== action.payload
  //   })
  //   return { ...state, cart: newCart }
  // }

  // increase / decrease Amount
  // if (action.type === 'INCREASE_AMOUNT') {
  //   let tempCart = state.cart.map((cartItem) => {
  //     if (cartItem.id === action.payload) {
  //       return { ...cartItem, amount: cartItem.amount + 1 }
  //     }
  //     return cartItem
  //   })
  //   return { ...state, cart: tempCart }
  // }
  // ---- chainig on the filter method
  // if (action.type === 'DECREASE_AMOUNT') {
  //   let tempCart = state.cart
  //     .map((cartItem) => {
  //       if (cartItem.id === action.payload) {
  //         return { ...cartItem, amount: cartItem.amount - 1 }
  //       }
  //       return cartItem
  //     })
  //     .filter((cartItem) => {
  //       return cartItem.amount !== 0
  //     })
  //   return { ...state, cart: tempCart }
  // }

  // if (action.type === 'GET_TOTALS') {
  //   let { total, amount } = state.cart.reduce(
  //     (cartTotal, cartItem) => {
  //       const { price, amount } = cartItem
  //       const itemTotal = price * amount
  //       cartTotal.total += itemTotal
  //       cartTotal.amount += amount
  //       return cartTotal
  //     },
  //     {
  //       total: 0,
  //       amount: 0,
  //     },
  //   )
  //   total = parseFloat(total.toFixed(2))
  //   return { ...state, total, amount }
  // }
  // default
  // return state
}

export default reducer
