package com.myApp.ecommerce.dtos.Payment;

import com.myApp.ecommerce.dtos.Cart.CartDto;
import com.myApp.ecommerce.dtos.product.ProductDto;
import lombok.Data;

@Data
public class MyOrderDto {
    private Long id;
    private Long orderInfoId;

    private ProductDto productDto;
    private Long quantity;


}
