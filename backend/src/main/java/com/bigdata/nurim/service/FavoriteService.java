package com.bigdata.nurim.service;

import com.bigdata.nurim.dto.FavoriteDto;
import com.bigdata.nurim.entity.Favorite;
import com.bigdata.nurim.entity.Location;
import com.bigdata.nurim.entity.User;
import com.bigdata.nurim.repository.FavoriteRepository;
import com.bigdata.nurim.repository.LocationRepository;
import com.bigdata.nurim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bigdata.nurim.security.JwtFilter;
import com.bigdata.nurim.security.TokenProvider;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FavoriteService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final FavoriteRepository favoriteRepository;
    private final LocationRepository locationRepository;
    public ResponseEntity<?> getFavoritesInfo(String email) {

        User user = userRepository.findByEmail(email).get();

        List<Favorite> favoriteList = favoriteRepository.findFavoriteFetchJoin(user);

        List<FavoriteDto> FavoriteDtoList = new ArrayList<>();

        for (Favorite favorite: favoriteList) {
            FavoriteDtoList.add(favorite.toDto());
        }
        return new ResponseEntity<>(FavoriteDtoList, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<String> delete(int favoriteId) {
        favoriteRepository.deleteById(favoriteId);
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<String> add(String email, int location_id) {

        User user = userRepository.findByEmail(email).get();

        Location location = locationRepository.findById(location_id).get();
        if(favoriteRepository.findFavoriteByUserAndLocation(user, location).isPresent()) {
            return new ResponseEntity<>("이미 즐겨찾기 중입니다.", HttpStatus.NO_CONTENT);
        }
        Favorite favorite = Favorite.builder()
                            .user(user)
                            .location(location)
                            .build();
        favoriteRepository.save(favorite);

        return new ResponseEntity<>("추가완료", HttpStatus.OK);
    }
}
