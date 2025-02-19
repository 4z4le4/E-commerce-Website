package com.myApp.ecommerce.services.category;

import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.category.Category;
import com.myApp.ecommerce.models.category.CategoryStatus;
import com.myApp.ecommerce.models.product.Product;
import com.myApp.ecommerce.repositorys.CategoryRepository;
import com.myApp.ecommerce.repositorys.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    public List<Category> getAllCategory (){
        return categoryRepository.findAll();
    }
    public Category getCategoryById (Long id){
        return categoryRepository.findById(id).orElseThrow(()->
            new ResourceNotFoundException("Category","id",id)
        );
    }
    public Category changeStatus (CategoryStatus status,Long id){
        Category foundCategory = getCategoryById(id);
        foundCategory.setStatus(status);
        return saveCategory(foundCategory);
    }
    public Category saveCategory (Category category){
        return categoryRepository.save(category);
    }
    public void deleteCategoryById (Long id){
        categoryRepository.deleteById(id);
    }
}
