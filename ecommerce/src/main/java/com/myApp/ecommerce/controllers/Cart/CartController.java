package com.myApp.ecommerce.controllers.Cart;

import com.myApp.ecommerce.dtos.Cart.CartDto;
import com.myApp.ecommerce.models.Cart.Cart;
import com.myApp.ecommerce.services.Cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/carts")
public class CartController {
    @Autowired
    private CartService cartService;
    @GetMapping("/{idUser}")
    public ResponseEntity<List<CartDto>> getCartByIdUser (@PathVariable Long idUser){
        List<CartDto> cartDtos = cartService.getCartDtoByIdUser(idUser);
        return ResponseEntity.ok(cartDtos);
    }
    @PostMapping("/")
    public ResponseEntity<CartDto> insertCart (@RequestBody Cart cart){
        CartDto cartDto = cartService.insertProduct(cart);
        return ResponseEntity.ok(cartDto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByIdProduct (@PathVariable Long id){
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/userId={userId}")
    public ResponseEntity<Void> deleteByIdUser (@PathVariable Long userId){
        cartService.deleteByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}
