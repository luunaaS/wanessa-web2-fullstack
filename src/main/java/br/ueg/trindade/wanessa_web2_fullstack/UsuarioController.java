package br.ueg.trindade.wanessa_web2_fullstack;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        List<Usuario> users = new ArrayList<>();
        users.add(new Usuario("João", "joao123", "senha123", "joao@example.com"));
        users.add(new Usuario("Maria", "maria456", "senha456", "maria@example.com"));
        return users;
    }
}
