import React from 'react'
import CartImg from '../assets/images/cart.svg'
import { Link } from 'react-router-dom'
import { useSelector, UseSelector } from 'react-redux/es/hooks/useSelector'

const Navbar = () => {

    const itemsCart = useSelector((state)=>state.cart.items)
    console.log('navvv>>>>', itemsCart)
    const cartLength = itemsCart.length

    const cartlengthArray = itemsCart.map((item)=>{
        return(
            item.cartQuantity
        )
    })
   // console.log('cartquan', cartlengthArray)

    let totallength = 0

    cartlengthArray.forEach((num)=>{
        totallength += num
    })


    // for (let i = 0; i < cartlengthArray.length, i++;){
    //     totallength = totallength + cartlengthArray[i]
    // }

    //console.log('totallength', totallength)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid px-0">
                    <Link
                        to="/"
                        className='navbar-brand'
                    >
                        ShopCart
                    </Link>
                    {/* <a className="navbar-brand" href="#">ShopCart</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}
                            <li className="nav-item">
                                <Link
                                    to="/product"
                                    className='nav-link'
                                >
                                    Products
                                </Link>

                            </li>

                        </ul>
                    </div>
                    <div className="cart">
                        <Link
                            to="/cart"
                         
                        >

                            <img src={CartImg} alt='cart' />
                            <span className={`count ${totallength < 10 ? 'count' : 'countdouble'}`}>{totallength}</span>

                        </Link>
                    </div>
                </div>

            </nav>
        </>

    )
}

export default Navbar