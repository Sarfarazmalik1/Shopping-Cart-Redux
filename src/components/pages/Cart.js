import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector, UseSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'
import { remove, clearCart, increase,decrease,getCartTotal } from '../../redux/slice/cartSlice'


const Cart = () => {

  const dispatch = useDispatch();

  const cart = useSelector((state)=>state.cart)

  const productCart = cart.items

  // const cartTotal = useSelector((state)=>state.cart)

  // console.log('!!!!!',cartTotal)

  

  useEffect(()=>{
    dispatch(getCartTotal())
  },[cart])

  // const { items, totalQuantity, totalPrice, quantity } = useSelector((state) => state.cart)
  // console.log('www',quantity)

  const removefromCart = (id) => {
    dispatch(remove(id))
  }

  const clearFullCart = () => {
    dispatch(clearCart())
  }

  const increaseCount = (product) => {
    dispatch(increase(product))
  }
  const decreaseCount = (product) => {
    dispatch(decrease(product))
  }





  console.log('cart', productCart)
  return (
    <>
      <div className='main'>
        <div className='row'>
          {productCart.length == 0 ? <>
            <div className='row'>
              <div className='col-12'>
                <h2 className='text-center pt-4'>Cart is Empty</h2>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-12 text-center'>
                <Link
                  to="/product"
                >
                  <button className='btn btn-success px-3'>Add Products</button>
                </Link>

              </div>
            </div>

          </> :
            <>
              <div className='col-9'>
                <div className='card cart-card'>
                  <h3>Cart-{productCart.length}&nbsp;items</h3>
                  {productCart?.map((product) => {
                    
                    const singleTotal = product.price * product.cartQuantity
                    // const indianPrice = singleTotal * 82.54;
                    // const roundPrice = Math.round(indianPrice)

                    // const resultPrice = Math.round(indianPrice)
                   
                    return (
                      <>
                        <div className='col-12 mb-3'>
                          <div className="card sub-card" >
                            <div className='row'>
                              <div className='col-3'>
                                <div className='img-box'>
                                  <img src={product.image} className="card-img-top" alt="..." style={{ height: 'auto', width: '200px' }} />
                                </div>
                              </div>
                              <div className='col-5 pt-3'>
                                <div className='row'>
                                  <h4 className='col-12 pb-2'>{product.title}</h4>
                                  <h5>Price: ${product.price.toFixed(2)}</h5>
                                  <div className='col-12 py-3'><span className='star-rating'>{product.rating.rate}&nbsp;<i class="bi bi-star-fill"></i></span>&nbsp;({product.rating.count})</div>
                                  <div className='mt-4'>
                                    <button className='btn btn-danger' onClick={() => removefromCart(product.id)}>
                                      <i class="bi bi-trash-fill"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className='col-4 pt-4 d-flex align-items-top justify-content-end'>
                                <div className='row d-flex justify-content-end'>
                                  <div className='col-auto'>
                                    <button className='btn btn-primary' onClick={() => decreaseCount(product)} >
                                      <i class="bi bi-dash-lg"></i>
                                    </button>
                                  </div>
                                  <div className='col-auto pt-2'>
                                    <span className='fs-5'>Quantity: {product.cartQuantity}</span>
                                  </div>
                                  <div className='col-auto'>
                                    <button className='btn btn-primary' onClick={() => increaseCount(product)}>
                                      <i class="bi bi-plus"></i>
                                    </button>
                                  </div>
                                  <div className='col-12 d-flex justify-content-end '>
                                    <h5>Total Price: $ {singleTotal.toFixed(2)}</h5>
                                  </div>
                                </div>
                                {/* <div className='row mt-4'>
                                    <div className='col-12'>
                                      <h4>Price: ${product.price}</h4>
                                    </div>
                                  </div> */}
                              </div>
                            </div>


                          </div>
                        </div>

                      </>
                    )
                  })}
                </div>


              </div>

            </>

          }
          {productCart.length > 0 ?
          
          <>
          
            <div className='col-3'>
              <div className='row'>
                <div className='col-12'>
                    <div className='card amount-card px-3 py-2'>
                      <h4>Price Summary</h4>
                      <hr className='mt-1' />
                      <div className="card-body p-0">
                        <p className="card-title d-flex justify-content-between">Total Quantity: <div className='fw-bold '>{cart.cartTotalQuantity}</div></p>
                        <p className="card-title d-flex justify-content-between">Total Price: <div className='fw-bold '>$ {cart.cartTotalAmount.toFixed(2)}</div></p>
                        {/* <button type="button" className='btn btn-success'>Go to Checkout</button> */}
                      </div>
                    </div>
                </div>
                  <div className='col-12 mt-5 px-4 text-center'>
                    <button type="button" className='btn btn-danger'
                      onClick={() => clearFullCart()}
                    >Clear Cart</button>
                  </div>
              </div>
            </div>
            
            </>
            : null}
        </div>
       
      </div>

    </>
  )
}

export default Cart