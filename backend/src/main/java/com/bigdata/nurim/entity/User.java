package com.bigdata.nurim.entity;

import com.bigdata.nurim.dto.ModifyUserInfoDto;
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
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
    private Boolean isFirst;

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

    public void update(ModifyUserInfoDto modifyUserInfoDto){
        this.nickname = modifyUserInfoDto.getNickname();
        this.phone = modifyUserInfoDto.getPhone();
        this.emergency = modifyUserInfoDto.getEmergency();
        this.imgUrl = modifyUserInfoDto.getImgUrl();
    }

    public void updateIsFirst(){
        this.isFirst=true;
    }

    public UserDto toDto() {
        return UserDto.builder()
                .nickname(this.getNickname())
                .imgUrl(this.getImgUrl())
                .emergency(this.getEmergency())
                .phone(this.getPhone())
                .role(this.getRole())
                .isFirst(this.getIsFirst())
                .loginType(this.loginType.toString())
                .build();
    }
}
