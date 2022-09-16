package com.bigdata.nurim.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubCategory {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int subCategoryId;

    @Column(nullable = false)
    private String subCategoryName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "mainCategoryId")
    private MainCategory mainCategory;

    @OneToMany(mappedBy = "subCategory", cascade = CascadeType.ALL)
    private List<Location> locations = new ArrayList<>();
}
