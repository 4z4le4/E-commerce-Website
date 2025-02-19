package com.myApp.ecommerce.dtos.category;

import com.myApp.ecommerce.models.category.CategoryStatus;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link com.myApp.ecommerce.models.category.Category}
 */
@Data
public class CategoryDto implements Serializable {
    private Long id;
    private String name;
    private CategoryStatus status;

}