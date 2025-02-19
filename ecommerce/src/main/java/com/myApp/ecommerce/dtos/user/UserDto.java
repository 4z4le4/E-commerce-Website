package com.myApp.ecommerce.dtos.user;

import com.myApp.ecommerce.models.user.User;
import com.myApp.ecommerce.models.user.UserType;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link User}
 */
@Data
public class UserDto implements Serializable {
    private Long id;
    private String name;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private UserType type;
}