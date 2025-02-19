package com.myApp.ecommerce.services.user;

import com.myApp.ecommerce.exception.ResourceNotFoundException;
import com.myApp.ecommerce.models.user.User;
import com.myApp.ecommerce.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("User","id",id));
    }
    public User saveUser(User user){
        return userRepository.save(user);
    }
    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }
    public User getUserByUserName(String userName){
        return userRepository.findByUserName(userName).orElseThrow(()-> new ResourceNotFoundException("User","userName",userName));
    }
}
