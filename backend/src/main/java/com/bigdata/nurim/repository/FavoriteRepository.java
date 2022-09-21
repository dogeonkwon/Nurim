package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Favorite;
import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    Optional<Favorite> findFavoriteByUserAndLocation(User user, Location location);
    @Query("select f from Favorite f join fetch f.user u join fetch f.location l")
    List<Favorite>findFavoriteFetchJoin();
}
