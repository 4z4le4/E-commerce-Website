package com.myApp.ecommerce.dtos.Payment;

import com.myApp.ecommerce.dtos.user.UserDto;
import com.myApp.ecommerce.models.payment.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class OrderInfoDto {
    private Long id;
    private UserDto userDto;
    private String phoneContact;
    private OrderStatus status;
    private String address;
    private BigDecimal total;
    private LocalDate date;
}
