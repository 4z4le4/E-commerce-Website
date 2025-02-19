package com.myApp.ecommerce.repositorys;

import com.myApp.ecommerce.models.Cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);

    Optional<Cart> findByProductId(Long productId);
    Optional<Cart> findByProductIdAndUserId(Long productId, Long userId);



    void deleteByUserId(Long userId);

}