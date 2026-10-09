package br.ueg.trindade.wanessa_web2_fullstack.controller;

import br.ueg.trindade.wanessa_web2_fullstack.model.Permissao;
import br.ueg.trindade.wanessa_web2_fullstack.service.PermissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissoes")
@CrossOrigin(origins = "http://localhost:5173")
public class PermissaoController {

    @Autowired
    private PermissaoService permissaoService; // o controller fala apenas com o Service

    @GetMapping
    public List<Permissao> getAllPermissoes() {
        return permissaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoService.criar(permissao);
    }

    @PutMapping("/{id}")
    public Permissao updatePermissao(@PathVariable Long id, @RequestBody Permissao permissaoAtualizada) {
        return permissaoService.atualizar(id, permissaoAtualizada);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePermissao(@PathVariable Long id) {
        permissaoService.excluir(id);
    }
}