package com.myApp.ecommerce.services.PaymentService;

import com.myApp.ecommerce.dtos.Cart.CartDto;
import com.myApp.ecommerce.dtos.Payment.MyOrderDto;
import com.myApp.ecommerce.dtos.Payment.OrderInfoDto;
import com.myApp.ecommerce.dtos.product.ProductDto;
import com.myApp.ecommerce.dtos.user.UserDto;
import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.payment.MyOrder;
import com.myApp.ecommerce.models.payment.OrderStatus;
import com.myApp.ecommerce.models.product.Product;
import com.myApp.ecommerce.models.user.User;
import com.myApp.ecommerce.repositorys.OrderInfoRepository;
import com.myApp.ecommerce.repositorys.OrderRepository;
import com.myApp.ecommerce.services.Cart.CartService;
import com.myApp.ecommerce.services.product.ProductService;
import com.myApp.ecommerce.services.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.myApp.ecommerce.models.payment.OrderInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private CartService cartService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderInfoRepository orderInfoRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductService productService;

    public OrderInfoDto insertOrderInfo(OrderInfo orderInfo) {
        OrderInfo savedOrderInfo = orderInfoRepository.save(orderInfo);
        User user = userService.getUserById(savedOrderInfo.getUserId());
        UserDto userDto = modelMapper.map(user, UserDto.class);
        OrderInfoDto orderInfoDto = new OrderInfoDto();
        orderInfoDto.setId(savedOrderInfo.getId());
        orderInfoDto.setUserDto(userDto);
        orderInfoDto.setAddress(savedOrderInfo.getAddress());
        orderInfoDto.setStatus(savedOrderInfo.getStatus());
        orderInfoDto.setTotal(savedOrderInfo.getTotal());
        orderInfoDto.setDate(savedOrderInfo.getDate());
        orderInfoDto.setPhoneContact(savedOrderInfo.getPhoneContact());
        return orderInfoDto;
    }
    public List<OrderInfoDto> getAllOrderInfo() {
        List<OrderInfo> orderInfos = orderInfoRepository.findAll();
        List<OrderInfoDto> orderInfoDtos = new ArrayList<OrderInfoDto>();
        for (OrderInfo orderInfo : orderInfos
        ) {
            User user = userService.getUserById(orderInfo.getUserId());
            UserDto userDto = modelMapper.map(user, UserDto.class);
            OrderInfoDto orderInfoDto = new OrderInfoDto();
            orderInfoDto.setId(orderInfo.getId());
            orderInfoDto.setUserDto(userDto);
            orderInfoDto.setAddress(orderInfo.getAddress());
            orderInfoDto.setStatus(orderInfo.getStatus());
            orderInfoDto.setTotal(orderInfo.getTotal());
            orderInfoDto.setDate(orderInfo.getDate());
            orderInfoDto.setPhoneContact(orderInfo.getPhoneContact());
            orderInfoDtos.add(orderInfoDto);
        }
        return orderInfoDtos;
    }
    public List<MyOrderDto> insertOrder(Long idOrderInfo, Long[] idsCart ){

        List<CartDto> cartDtos = new ArrayList<CartDto>();
        for (Long id: idsCart
             ) {
            CartDto cartDto = cartService.getCartById(id);
            if(cartDto == null){
                continue;
            }
            cartDtos.add(cartDto);
        }
        List<MyOrderDto> myOrderDtos = new ArrayList<MyOrderDto>();
        for (CartDto cartDto: cartDtos
             ) {
            MyOrder order = new MyOrder();
            order.setOrderInfoId(idOrderInfo);
            order.setProductId(cartDto.getProductDto().getId());
            order.setQuantity(cartDto.getQuantity());
            MyOrder savedOrder = orderRepository.save(order);
            MyOrderDto myOrderDto = new MyOrderDto();
            myOrderDto.setId(savedOrder.getId());
            myOrderDto.setOrderInfoId(idOrderInfo);
            myOrderDto.setQuantity(savedOrder.getQuantity());
            Product product = productService.getProductById(savedOrder.getProductId());
            Long quantity = product.getQuantity();
            product.setQuantity(quantity - cartDto.getQuantity());
            productService.saveProduct(product);
            ProductDto productDto = modelMapper.map(product, ProductDto.class);
            myOrderDto.setProductDto(productDto);
            myOrderDtos.add(myOrderDto);
        }
        return myOrderDtos;
    }
    public List<MyOrderDto> getCartsByIdOrderInfo(Long idOrderInfo){
        List<MyOrder> orders = orderRepository.findByOrderInfoId(idOrderInfo);
        List<MyOrderDto> myOrderDtos = new ArrayList<MyOrderDto>();
        for (MyOrder order : orders
             ) {
            Product product = productService.getProductById(order.getProductId());
            ProductDto productDto = modelMapper.map(product, ProductDto.class);
            MyOrderDto myOrderDto = new MyOrderDto();
            myOrderDto.setId(order.getId());
            myOrderDto.setProductDto(productDto);
            myOrderDto.setOrderInfoId(order.getOrderInfoId());
            myOrderDto.setQuantity(order.getQuantity());
            myOrderDtos.add(myOrderDto);
        }
        return myOrderDtos;
    }
    public List<OrderInfoDto> getOrderInfosByUserId(Long idUser){
        List<OrderInfo> orderInfos = orderInfoRepository.findByUserId(idUser);
        List<OrderInfoDto> orderInfoDtos = new ArrayList<OrderInfoDto>();
        for (OrderInfo orderInfo : orderInfos
        ) {
            User user = userService.getUserById(orderInfo.getUserId());
            UserDto userDto = modelMapper.map(user, UserDto.class);
            OrderInfoDto orderInfoDto = new OrderInfoDto();
            orderInfoDto.setId(orderInfo.getId());
            orderInfoDto.setUserDto(userDto);
            orderInfoDto.setAddress(orderInfo.getAddress());
            orderInfoDto.setStatus(orderInfo.getStatus());
            orderInfoDto.setTotal(orderInfo.getTotal());
            orderInfoDto.setDate(orderInfo.getDate());
            orderInfoDto.setPhoneContact(orderInfo.getPhoneContact());
            orderInfoDtos.add(orderInfoDto);
        }
        return orderInfoDtos;
    }
}
