import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/Product.css' 
import '../../App.css'  
import tractivedog from '../../assets/tractive-dog.jpg';
import tractivedog1 from '../../assets/tractive2.webp';
import chats from '../../assets/cat.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faShip, faUndo, faStar } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../contexts/Cart'
import ReactStars from "react-rating-stars-component";
import ProductDetail from './ProductDetail';


export default function ProductDetail1(props) {  
    const ratingStar = {
        size: 20,
        edit: false,
        activeColor: "#ff4367",
        color: "#ff4367",
        isHalf: true
    }
    // const productDog = {
    //     id: 8,
    //     productCate: "123",
    //     productColor: null,
    //     productDate: "2021-06-12T14:57:50.532417Z",
    //     productDes: "nguyen",
    //     productFeature: null,
    //     productImg: tractivedog1,
    //     productName: "Collier GPS pour chiens",
    //     productPrice: 100,
    //     productSale: 10,
    //     productSold: 0,
    //     productVote: null
    // }
    // const productCat = {
    //     id: 9,
    //     productCate: "123",
    //     productColor: null,
    //     productDate: "2021-06-12T14:57:50.532417Z",
    //     productDes: "nguyen",
    //     productFeature: null,
    //     productImg: chats,
    //     productName: "Collier GPS pour chats",
    //     productPrice: 100,
    //     productSale: 10,
    //     productSold: 0,
    //     productVote: null
    // }
    const product = props.productDetail
    console.log(product)
    const {
        addToCart,
        setOpenCartBox,
        setCloseCartBox
    } = useContext(CartContext)
    const cartClick1 = () => {
        addToCart(product)
        setOpenCartBox(true)
        setCloseCartBox(false)
    }
    return (
        <div className="ProductDetail flex">
            <div className="productdetail-image-box">
                <img src={product.productImg}></img>
            </div>
            <div className="productdetail-info">
                <h1>{product.productName}</h1>
                <h3 style={{fontWeight:"300"}}>{product.productCate}</h3>
                <div className="flex" style={{alignItems: "center"}}>
                    <ReactStars {...ratingStar} />
                    <p style={{marginLeft:"10px", fontSize:"12px", fontWeight:"600",cursor:"pointer"}}>4496 ??valuations</p>
                </div>
                <ul>
                     <li> V??? tr?? GPS to??n c???u v???i theo d??i ho???t ?????ng </li>
                     <li> Ch??? ????? TR???C TI???P - v??? tr?? ???????c c???p nh???t c??? sau 2 ?????n 3 gi??y </li>
                     <li> B???n s??? nh???n ???????c th??ng b??o n???u con ch?? c???a b???n ??i b??? h??i xa nh?? b???n </li>
                     <li> C?? ???????c tr???i nghi???m theo d??i t???t nh???t v???i c??ng ngh??? m???i nh???t </li>
                     <li> Kh??ng th???m n?????c 100% v?? c?? kh??? n??ng ch???ng ch???i v???i m???i cu???c phi??u l??u c???a b???n </li>
                     <li> Th???i l?????ng pin l??n ?????n 5 ng??y </li>
                     <li> Ch???n ????ng k?? t??? ??? 4,17 m???i th??ng sau khi mua h??ng </li>
                </ul>
                <p style={{fontSize:"15px"}}>{product.productDes}</p>
            </div>
            <div className="productdetail-addtocart flex-col">
                <ul className="productdetail-flag-info">
                    <ul className="productdetail-flag-info-list">
                        <li> <FontAwesomeIcon icon = {faCheckCircle} className = "icon" /> Bao b?? kh??ng nh???a </li>
                         <li> <FontAwesomeIcon icon = {faShip} className = "icon" /> ???????c g???i t??? U </li>
                         <li> <FontAwesomeIcon icon = {faUndo} className = "icon" /> 14 ng??y ????? tr??? l???i giao d???ch mua </li>
                    </ul>
                    <div className="triangle"></div>
                </ul>
                <p className="productdetail-price">{product.productPrice}</p>
                <div 
                    className="productdetail-addtocart-btn"
                    onClick={cartClick1}
                >
                   Th??m v??o gi??? h??ng
                </div>
            </div> 
        </div>
    )
}


