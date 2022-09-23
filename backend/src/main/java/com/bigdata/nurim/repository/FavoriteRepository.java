package com.bigdata.nurim.repository;

import com.bigdata.nurim.entity.Favorite;
import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    @Query("select f from Favorite f where f.user = :#{#paramUser} and f.location=:#{#paramLocation}")
    Optional<Favorite> findFavoriteByUserAndLocation(@Param("paramUser") User user,@Param("paramLocation") Location location);
    @Query("select f from Favorite f join fetch f.location l where f.user = :#{#paramUser}")
    List<Favorite>findFavoriteFetchJoin(@Param("paramUser") User user);
}
