package com.myApp.ecommerce.controllers.Payment;

import com.myApp.ecommerce.dtos.Payment.MyOrderDto;
import com.myApp.ecommerce.dtos.Payment.OrderInfoDto;
import com.myApp.ecommerce.models.payment.OrderInfo;
import com.myApp.ecommerce.models.payment.OrderStatus;
import com.myApp.ecommerce.services.PaymentService.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @PostMapping("/")
    public ResponseEntity<OrderInfoDto> insertOrderInfoDto (@RequestBody OrderInfo orderInfo){
        OrderInfoDto orderInfoDto = paymentService.insertOrderInfo(orderInfo);
        return ResponseEntity.ok(orderInfoDto);
    }
    @GetMapping("/")
    public ResponseEntity<List<OrderInfoDto>> getAllOrderInfo (){
        return ResponseEntity.ok(paymentService.getAllOrderInfo());
    }
    @PostMapping("/{idOrderInfo}")
    public ResponseEntity<List<MyOrderDto>> insertOrder (@PathVariable("idOrderInfo") Long idOrderInfo, @RequestBody Long[] idsCart){
        return ResponseEntity.ok(paymentService.insertOrder(idOrderInfo,idsCart));
    }
    @GetMapping("/{idOrderInfo}")
    public ResponseEntity<List<MyOrderDto>> getCartsByIdOrderInfo(@PathVariable Long idOrderInfo){
        return ResponseEntity.ok(paymentService.getCartsByIdOrderInfo(idOrderInfo));
    }
    @GetMapping("/idUser={idUser}")
    public ResponseEntity<List<OrderInfoDto>> getOrderInfosByUserId(@PathVariable("idUser") Long idUser){
        return ResponseEntity.ok(paymentService.getOrderInfosByUserId(idUser));
    }
    @PutMapping("/")
    public ResponseEntity<OrderInfoDto> setStatus (@RequestBody OrderInfo orderInfo){
        return ResponseEntity.ok(paymentService.insertOrderInfo(orderInfo));
    }
}
