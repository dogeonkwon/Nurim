package com.bigdata.nurim.entity;

import com.bigdata.nurim.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int userId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String phone;

    @Column
    private String emergency;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Favorite> favorites = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoginType loginType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user")
    private Set<Authority> authorities;
    public void update(String emergency, String phone, String userName) {
        this.emergency = emergency;
        this.phone = phone;
        this.userName = userName;
    }

    public void changePw(String password) {
        this.password = password;
    }

    public UserDto toDto() {
        return UserDto.builder()
                .email(this.email)
                .userName(this.userName)
                .emergency(this.emergency)
                .phone(this.phone)
                .role(this.role)
                .loginType(this.loginType.toString())
                .build();
    }
}
