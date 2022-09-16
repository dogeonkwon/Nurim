package com.bigdata.nurim.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MainCategory {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int mainCategoryId;

    @Column(nullable = false)
    private String mainCategoryName;

    @OneToMany(mappedBy = "mainCategory", cascade = CascadeType.ALL)
    private List<SubCategory> subCategories = new ArrayList<>();

}
