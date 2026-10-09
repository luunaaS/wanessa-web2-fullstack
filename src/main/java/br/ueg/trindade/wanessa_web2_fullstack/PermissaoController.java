package br.ueg.trindade.wanessa_web2_fullstack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PermissaoController {

    @Autowired
    private PermissaoRepository permissaoRepository;

    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {
        return permissaoRepository.findAll();
    }

    @GetMapping("/permissoes/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    @PostMapping("/permissoes")
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoRepository.save(permissao);
    }
}
