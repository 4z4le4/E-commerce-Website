package com.myApp.ecommerce.repositorys;

import com.myApp.ecommerce.models.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}