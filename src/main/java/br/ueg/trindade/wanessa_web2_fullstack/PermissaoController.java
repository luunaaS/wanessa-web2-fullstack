package br.ueg.trindade.wanessa_web2_fullstack;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PermissaoController {

    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {
        List<Permissao> permissoes = new ArrayList<>();
        permissoes.add(new Permissao(1L, "ADMIN", "Acesso total ao sistema"));
        permissoes.add(new Permissao(2L, "USER", "Acesso básico"));
        return permissoes;
    }
}
