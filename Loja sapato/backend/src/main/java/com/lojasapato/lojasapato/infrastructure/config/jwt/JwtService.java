package com.lojasapato.lojasapato.infrastructure.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final static String SECRET_KEY = "U7vjAFX1jGpS2WOeUQbEjhiL6xx/D25axEzSnrfCODdC7bzYV2VsHj93Gl6Q96QZyCaVNbYr4/VEIbcMA3oUFKRR29K3QNrrN4+/3xIzV7wBxflaXtaour7fRWafvrrmxfiW1IrDodm30U268Nsrv2//j4ptzYzrC28CXWHkAnghHsImedC3M75a6P9ruTXqib7r4KW7Zp2CTbKo3a27fCdjgBXWavJHyw/OJaBS7J1uGzpjqEKoOrJEBcjfyIULMCFawRWjnlMXPABSqmlqfwrHNv09aUg6voKDuWaxpL5Lp+iaAwXROxCXZY4eptpv1GEZBd8yPO7K5P+xgEzZIewIlg8Z2qt+WDWrrfZNCzE=";

    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }
    public <T> T extractClaims(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public boolean isTokenValid(String token, UserDetails user){
        final String userName = extractUsername(token);
        return (userName.equals(user.getUsername()) && !isTokenExpired(token));
    }
    public String generateToken(UserDetails userDetails){
        return this.generateToken(new HashMap<>(),userDetails);
    }
    public String generateToken(Map<String, Object> extractClaims, UserDetails user){
        final int timeToExpiration = 1000 * 60 * 24; //24 hours
        return Jwts.builder()
                .addClaims(extractClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + timeToExpiration))
                .signWith(getSigninKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = extractClaims(token, Claims::getExpiration);
        return  expiration.before(new Date()); //verifica se a expiration é de antes da data atual
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigninKey() {
        byte[] keyBites = Decoders.BASE64.decode(SECRET_KEY);
        System.out.println(keyBites);
        return Keys.hmacShaKeyFor(keyBites);
    }
}
