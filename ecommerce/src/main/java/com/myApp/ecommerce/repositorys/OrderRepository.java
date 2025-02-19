package com.myApp.ecommerce.repositorys;

import com.myApp.ecommerce.models.payment.MyOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<MyOrder, Long> {
    List<MyOrder> findByOrderInfoId(Long orderInfoId);

}