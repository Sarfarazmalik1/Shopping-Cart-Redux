import React, { useEffect, useState } from 'react'
import { useSelector, } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'

import cartSlice from '../../redux/slice/cartSlice'
import { useDispatch } from 'react-redux'
import { add } from '../../redux/slice/cartSlice'
import { fetchProducts } from '../../redux/apiSlice/productSlice';
import { getProducts, filterProducts } from '../../redux/apiSlice/productSlice'

const Product = () => {

    const dispatch = useDispatch();

    const { data: products, status } = useSelector((state) => state.products) //cart here is name given in store

    const fdata = useSelector((state) => state.filterProducts)
    console.log('fdata',fdata)

    useEffect(() => {
        dispatch(getProducts())
        // setProducts(productsdata)
        // axios.get(`https://fakestoreapi.com/products`)
        //     .then(response => {
        //         const products = response.data;
        //         setProducts(products)
        //     })
    }, []);

     //console.log('first', products)


    const addtoCart = (product) => {
        dispatch(add(product))
    }

    if (status === 'loading'){
        return (
            <div className='row'>
                <div className='col-12 text-center'>
                    <div className="d-flex align-items-center justify-content-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border " role="status" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
            
        )
    }
    if (status === 'error') {
        return (
            <div className='row'>
                <h3 className='col-12 text-center'>Something went wrong!!! Try again later..</h3>
            </div>
        )
    }

    const sortHightoLow = () => {
        console.log('high', products)
        const copyProducts = [...products]
        copyProducts.sort((a,b)=>{
            return b.price - a.price;
        })
        console.log('copy', copyProducts)
    }
    

    return (
        <>
            <div className='main'>
                <div className='row'>
                    <div className='col-12 mb-3 '>
                        <div className='row d-flex align-items-center'>
                            <div className='col-auto'>
                                <span className='ps-2'>Sort By</span>
                            </div>
                            <div className='col-auto'>
                                {/* <button type="button" className='btn btn-secondary py-0' onClick={()=>sortHightoLow()}>Price- High to Low</button> */}

                                <ul className="nav nav-pills nav-fill">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Active</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Much longer nav link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                            
                            </div>
                        </div>
                        
                    </div>
                    {products.map((product) => {
                        // const indianPrice = product.price * 82.54 ;
                        // const resultPrice = Math.round(indianPrice)
                        return (
                            <>
                                <div className='col-xs-12 col-md-6 col-lg-4 col-xl-3 '>
                                    <div className="card product-card mb-4" >
                                        <div className='text-center'>
                                            <img src={product.image} className="card-prod-img" alt="..." />

                                            <div className="card-body">
                                                <h5 className="card-title">{product.title}</h5>
                                                <p className="card-text fw-bold fs-2">$ {product.price.toFixed(2)}</p>
                                                <a href="#" className="btn btn-primary" onClick={() => addtoCart(product)}>Add to cart</a>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </>
                        )
                    })
                    }

                </div>
            </div>
        </>

    )
}

export default Product