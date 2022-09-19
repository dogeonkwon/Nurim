package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.Review;
import com.bigdata.nurim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findByUser(User user);
    List<Review> findByReportedTrue();
    List<Review> findByLocation(Location location);

}
