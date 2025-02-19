package com.myApp.ecommerce.controllers.product;

import com.myApp.ecommerce.dtos.category.CategoryDto;
import com.myApp.ecommerce.dtos.product.ProductDto;
import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.category.Category;
import com.myApp.ecommerce.models.product.Product;
import com.myApp.ecommerce.models.product.ProductStatus;
import com.myApp.ecommerce.services.category.CategoryService;
import com.myApp.ecommerce.services.product.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<Product> products = productService.getAllProduct();
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            ProductDto productDto = modelMapper.map(product, ProductDto.class);
            productDtos.add(productDto);
        }
        return ResponseEntity.ok(productDtos);
    }
    @PutMapping("/")
    public ResponseEntity<ProductDto> changeStatus (@RequestParam("id")Long id, @RequestParam("status") ProductStatus status){
        Product changedProduct = productService.changeStatus(status,id);
        ProductDto  productDto = modelMapper.map(changedProduct,ProductDto.class);
        return ResponseEntity.ok(productDto);
    }
    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> insertProduct(@RequestParam("name") String name,
                                                    @RequestParam("price") BigDecimal price,
                                                    @RequestParam("description") String description,
                                                    @RequestParam("categoryId") Long idCategory,
                                                    @RequestParam("status") ProductStatus status,
                                                    @RequestParam("quantity") Long quantity,
                                                    @RequestPart("image") MultipartFile image) throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setName(name);
        productDto.setStatus(status);
        productDto.setDescription(description);
        productDto.setPrice(price);
        productDto.setQuantity(quantity);
        Category category = categoryService.getCategoryById(idCategory);
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
        productDto.setCategory(categoryDto);
        String base64Ima = Base64.getEncoder().encodeToString(image.getBytes());
        productDto.setImage(base64Ima);
        Product product = modelMapper.map(productDto, Product.class);
        Product savedProduct = productService.saveProduct(product);
        ProductDto savedProductDto = modelMapper.map(savedProduct, ProductDto.class);
        return ResponseEntity.ok(savedProductDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@RequestParam("name") String name,
                                                    @RequestParam("price") BigDecimal price,
                                                    @RequestParam("description") String description,
                                                    @RequestParam("categoryId") Long idCategory,
                                                    @RequestParam("status") ProductStatus status,
                                                    @RequestParam("quantity") Long quantity,
                                                    @RequestPart("image") MultipartFile image, @PathVariable Long id) throws IOException {
        Product product = productService.getProductById(id);
        if (product == null) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        product.setName(name);
        product.setStatus(status);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
        Category category = categoryService.getCategoryById(idCategory);
        product.setCategory(category);
        String base64Ima = Base64.getEncoder().encodeToString(image.getBytes());
        product.setImage(base64Ima);
        Product savedProduct = productService.saveProduct(product);
        ProductDto savedProductDto = modelMapper.map(savedProduct, ProductDto.class);
        return ResponseEntity.ok(savedProductDto);
    }
    @PutMapping("/v2/{id}")
    public ResponseEntity<ProductDto> updateProductV2(@RequestParam("name") String name,
                                                    @RequestParam("price") BigDecimal price,
                                                    @RequestParam("description") String description,
                                                    @RequestParam("categoryId") Long idCategory,
                                                    @RequestParam("status") ProductStatus status,
                                                    @RequestParam("quantity") Long quantity,
                                                     @PathVariable Long id)  {
        Product product = productService.getProductById(id);
        if (product == null) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        product.setName(name);
        product.setStatus(status);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
        Category category = categoryService.getCategoryById(idCategory);
        product.setCategory(category);
        Product savedProduct = productService.saveProduct(product);
        ProductDto savedProductDto = modelMapper.map(savedProduct, ProductDto.class);
        return ResponseEntity.ok(savedProductDto);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id){
        Product product = productService.getProductById(id);
        if(product == null){
            throw new ResourceNotFoundException("Product","id",id);
        }
        ProductDto productDto = modelMapper.map(product,ProductDto.class);
        return ResponseEntity.ok(productDto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }
}
