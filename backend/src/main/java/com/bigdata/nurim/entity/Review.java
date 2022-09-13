package com.bigdata.nurim.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int reviewId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String createdDate;

    @Column(nullable = false)
    private int type;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "locationId")
    private Location location;

}