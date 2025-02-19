package com.myApp.ecommerce.models.payment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "order_info")
@AllArgsConstructor
@NoArgsConstructor
public class OrderInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name="userId",nullable = false)
    private Long userId;
    @Column(name = "phoneContact",nullable = false,length = 10)
    private String phoneContact;
    @Enumerated
    @Column(name = "status",nullable = false)
    private OrderStatus status;
    @Column(name = "total",nullable = false)
    private BigDecimal total;
    @Column(name = "address",nullable = false)
    private String address;
    @Column(name = "date",nullable = false)
    private LocalDate date;

}