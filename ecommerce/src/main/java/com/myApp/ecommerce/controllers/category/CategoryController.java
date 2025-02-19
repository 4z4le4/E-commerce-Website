package com.myApp.ecommerce.controllers.category;

import com.myApp.ecommerce.dtos.category.CategoryDto;
import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.category.Category;
import com.myApp.ecommerce.models.category.CategoryStatus;
import com.myApp.ecommerce.services.category.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> getAllCategory (){
        List<Category> categories = categoryService.getAllCategory();
        List<CategoryDto> categoryDtos = categories.stream().map(category -> modelMapper.map(category, CategoryDto.class)).collect(Collectors.toList());
        return ResponseEntity.ok(categoryDtos);
    }
    @PutMapping("/")
    public ResponseEntity<CategoryDto> changeStatus(@RequestParam("status")CategoryStatus status, @RequestParam("id")Long id){
        Category changedCategory = categoryService.changeStatus(status,id);
        CategoryDto categoryDto = modelMapper.map(changedCategory,CategoryDto.class);
        return ResponseEntity.ok(categoryDto);
    }
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById (@PathVariable Long id){
        Category category = categoryService.getCategoryById(id);
        if(category==null){
            throw new ResourceNotFoundException("Category","id",id);
        }
        CategoryDto categoryDto = modelMapper.map(category,CategoryDto.class);
        return ResponseEntity.ok(categoryDto);
    }
    @PostMapping("/")
    public ResponseEntity<CategoryDto> insertCategory (@RequestBody CategoryDto categoryDto){
        Category category = modelMapper.map(categoryDto,Category.class);
        Category savedCategory = categoryService.saveCategory(category);
        CategoryDto savedCategoryDto = modelMapper.map(savedCategory, CategoryDto.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategoryDto);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory (@PathVariable Long id, @RequestBody CategoryDto categoryDto){
        Category category = categoryService.getCategoryById(id);
        if(category == null){
            throw new ResourceNotFoundException("Category","id",id);
        }
        category.setName(categoryDto.getName());
        category.setStatus(categoryDto.getStatus());
        Category updatedCategory = categoryService.saveCategory(category);
        CategoryDto updatedCategoryDto = modelMapper.map(updatedCategory, CategoryDto.class);
        return ResponseEntity.ok(updatedCategoryDto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById (@PathVariable Long id){
        Category category = categoryService.getCategoryById(id);
        if(category == null){
            throw new ResourceNotFoundException("Category","id",id);
        }
        categoryService.deleteCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}
