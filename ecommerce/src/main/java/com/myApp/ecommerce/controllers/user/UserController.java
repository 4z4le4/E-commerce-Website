package com.myApp.ecommerce.controllers.user;

import com.myApp.ecommerce.dtos.user.UserDto;
import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.user.User;
import com.myApp.ecommerce.services.user.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        List<UserDto> userDtos = users.stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id){
        User user = userService.getUserById(id);
        if(user == null){
            throw new ResourceNotFoundException("User","id",id);
        }
        UserDto userDto = modelMapper.map(user,UserDto.class);
        return ResponseEntity.ok(userDto);

    }
    @PostMapping("/")
    public ResponseEntity<UserDto> insertUser (@RequestBody UserDto userDto){
        User user = modelMapper.map(userDto,User.class);
        User savedUser = userService.saveUser(user);
        UserDto savedUserDto = modelMapper.map(savedUser, UserDto.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserDto);
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id,@RequestBody UserDto userDto){
        User user = userService.getUserById(id);
        if(user == null){
            throw new ResourceNotFoundException("User","id",id);
        }
        user.setUserName(userDto.getUserName());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setPassword(userDto.getPassword());
        User updatedUser = userService.saveUser(user);
        UserDto updatedUserDto = modelMapper.map(updatedUser, UserDto.class);
        return ResponseEntity.ok(updatedUserDto);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/userName={userName}")
    public ResponseEntity<UserDto> getUserByUserName(@PathVariable("userName") String userName) {
        User foundUser = userService.getUserByUserName(userName);
        if(foundUser == null){
            throw new ResourceNotFoundException("User", "userName", userName);
        }
        UserDto foundUserDto = modelMapper.map(foundUser,UserDto.class);
        return ResponseEntity.ok(foundUserDto);
    }
}
