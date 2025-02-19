package com.myApp.ecommerce.services.Cart;

import com.myApp.ecommerce.dtos.Cart.CartDto;
import com.myApp.ecommerce.dtos.product.ProductDto;
import com.myApp.ecommerce.dtos.user.UserDto;
import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.Cart.Cart;
import com.myApp.ecommerce.models.product.Product;
import com.myApp.ecommerce.models.product.ProductStatus;
import com.myApp.ecommerce.models.user.User;
import com.myApp.ecommerce.repositorys.CartRepository;
import com.myApp.ecommerce.repositorys.ProductRepository;
import com.myApp.ecommerce.repositorys.UserRepository;
import com.myApp.ecommerce.services.product.ProductService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;
    public CartDto getCartById (Long id){
        Optional<Cart> cart = cartRepository.findById(id);
        if(cart.isEmpty()){
            throw new ResourceNotFoundException("Cart","id",id);
        }
        Cart foundCart = cart.get();
        Optional<User> user = userRepository.findById(foundCart.getUserId());
        if(user.isEmpty()){
            throw new ResourceNotFoundException("User","id",foundCart.getUserId());

        }
        User foundUser = user.get();
        UserDto userDto = modelMapper.map(foundUser, UserDto.class);
        Optional<Product> product = productRepository.findById(foundCart.getProductId());
        if (product.isEmpty()) {
            return null;
        }
        CartDto cartDto = new CartDto();
        Product foundProduct = product.get();
        ProductDto productDto = modelMapper.map(foundProduct, ProductDto.class);
        cartDto.setProductDto(productDto);
        cartDto.setUserDto(userDto);
        cartDto.setId(id);
        cartDto.setQuantity(foundCart.getQuantity());
        return cartDto;
    }
    public List<CartDto> getCartDtoByIdUser(Long id) {
        List<Cart> carts = cartRepository.findByUserId(id);
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        User foundUser = user.get();
        UserDto userDto = modelMapper.map(foundUser, UserDto.class);
        List<CartDto> cartDtos = new ArrayList<CartDto>();
        for (Cart cart : carts
        ) {
            CartDto cartDto = new CartDto();
            Optional<Product> product = productRepository.findById(cart.getProductId());
            if (product.isEmpty()) {
                continue;
            }
            if (product.isPresent())  {
                Product checkProduct = product.get();
                if(checkProduct.getStatus() == ProductStatus.Inactive){
                    cartRepository.deleteById(cart.getId());
                    continue;
                }

            }
            Product foundProduct = product.get();
            ProductDto productDto = modelMapper.map(foundProduct, ProductDto.class);
            cartDto.setProductDto(productDto);
            cartDto.setUserDto(userDto);
            cartDto.setId(cart.getId());
            cartDto.setQuantity(cart.getQuantity());
            cartDtos.add(cartDto);
        }
        return cartDtos;
    }
    public void deleteCart(Long idCart){
        cartRepository.deleteById(idCart);
    }
    @Transactional
    public void deleteByUserId(Long idUser){
        cartRepository.deleteByUserId(idUser);
    }
    public CartDto insertProduct(Cart cart) {
        Optional<User> user = userRepository.findById(cart.getUserId());
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User", "id", cart.getUserId());
        }
        User foundUser = user.get();
        UserDto userDto = modelMapper.map(foundUser, UserDto.class);

        Optional<Cart> existedCart = cartRepository.findByProductIdAndUserId(cart.getProductId(), cart.getUserId());
        if (existedCart.isEmpty()) {
            Optional<Product> product = productRepository.findById(cart.getProductId());
            if (product.isEmpty()) {
                throw new ResourceNotFoundException("Product", "id", cart.getProductId());
            }
            Product foundProduct = product.get();
            ProductDto productDto = modelMapper.map(foundProduct, ProductDto.class);
            if(cart.getQuantity() >= productDto.getQuantity()){
                cart.setQuantity(productDto.getQuantity());
            }
            Cart savedCart = new Cart();
            savedCart.setProductId(cart.getProductId());
            savedCart.setUserId(cart.getUserId());
            savedCart.setQuantity(cart.getQuantity());

            savedCart = cartRepository.save(savedCart);

            CartDto cartDto = new CartDto();
            cartDto.setId(savedCart.getId());
            cartDto.setQuantity(savedCart.getQuantity());
            cartDto.setProductDto(productDto);
            cartDto.setUserDto(userDto);
            return cartDto;
        } else {
            Cart foundCart = existedCart.get();
            Product foundProduct = productRepository.findById(foundCart.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", existedCart.get().getProductId()));
            ProductDto productDto = modelMapper.map(foundProduct, ProductDto.class);
            if(cart.getQuantity()>0){

                if((cart.getQuantity() + foundCart.getQuantity()) >= productDto.getQuantity() ){
                    foundCart.setQuantity(productDto.getQuantity());
                }else{
                    foundCart.setQuantity(foundCart.getQuantity() + cart.getQuantity());
                }


            }else{

                foundCart.setQuantity(foundCart.getQuantity() + cart.getQuantity());
            }


            foundCart = cartRepository.save(foundCart);


            CartDto cartDto = new CartDto();
            cartDto.setId(foundCart.getId());
            cartDto.setQuantity(foundCart.getQuantity());
            cartDto.setProductDto(productDto);
            cartDto.setUserDto(userDto);
            return cartDto;
        }
    }

}
