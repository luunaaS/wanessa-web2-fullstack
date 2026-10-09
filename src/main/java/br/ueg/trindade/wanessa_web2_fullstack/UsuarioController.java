package br.ueg.trindade.wanessa_web2_fullstack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/usuarios/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @PostMapping("/usuarios")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/usuarios/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }
}
