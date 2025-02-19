package com.myApp.ecommerce.dtos.product;

import com.myApp.ecommerce.dtos.category.CategoryDto;
import com.myApp.ecommerce.models.product.ProductStatus;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.myApp.ecommerce.models.product.Product}
 */
@Data
public class ProductDto implements Serializable {
    private Long id;
    private String name;
    private BigDecimal price;
    private String description;
    private ProductStatus status;
    private CategoryDto category;
    private String image;
    private Long quantity;

}