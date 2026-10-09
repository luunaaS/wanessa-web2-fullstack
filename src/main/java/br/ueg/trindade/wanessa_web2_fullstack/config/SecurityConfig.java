package br.ueg.trindade.wanessa_web2_fullstack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

// Libera todos os endpoints enquanto a autenticação não é implementada.

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())                                  // permite POST/PUT/DELETE sem token CSRF
            .cors(Customizer.withDefaults())                               // respeita o @CrossOrigin dos controllers
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())  // tudo liberado por enquanto
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin())); // necessário para o H2 Console
        return http.build();
    }
}