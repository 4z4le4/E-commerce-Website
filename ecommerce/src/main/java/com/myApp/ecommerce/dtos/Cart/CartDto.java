package com.myApp.ecommerce.dtos.Cart;

import com.myApp.ecommerce.dtos.product.ProductDto;
import com.myApp.ecommerce.dtos.user.UserDto;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.myApp.ecommerce.models.Cart.Cart}
 */
@Data
public class CartDto implements Serializable {
    private Long id;
    private UserDto userDto;
    private ProductDto productDto;
    private Long quantity;
}