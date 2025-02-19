package com.myApp.ecommerce.models.payment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "myOrder")
@AllArgsConstructor
@NoArgsConstructor
public class MyOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name="oderInfoId",nullable = false)
    private Long orderInfoId;
    @Column(name="productId",nullable = false)
    private Long productId;
    @Column (name ="quantity",nullable = false)
    private Long quantity;

}