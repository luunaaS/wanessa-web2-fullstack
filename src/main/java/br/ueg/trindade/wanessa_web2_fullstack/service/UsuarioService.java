package br.ueg.trindade.wanessa_web2_fullstack.service;

import br.ueg.trindade.wanessa_web2_fullstack.model.Usuario;
import br.ueg.trindade.wanessa_web2_fullstack.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    public Usuario criar(Usuario usuario) {
        validar(usuario);
        // Regra de negócio: não permitir dois usuários com o mesmo e-mail
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe um usuário com este e-mail");
        }
        usuario.setId(null); // garante INSERT, mesmo que o JSON traga um id
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);
        validar(usuarioAtualizado);
        if (usuarioRepository.existsByEmailAndIdNot(usuarioAtualizado.getEmail(), id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe outro usuário com este e-mail");
        }
        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setUsername(usuarioAtualizado.getUsername());
        usuario.setEmail(usuarioAtualizado.getEmail());
        return usuarioRepository.save(usuario);
    }

    public void excluir(Long id) {
        Usuario usuario = buscarPorId(id); // devolve 404 se o id não existir
        usuarioRepository.delete(usuario);
    }

    private void validar(Usuario usuario) {
        if (vazio(usuario.getNome())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome é obrigatório");
        }
        if (vazio(usuario.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O username é obrigatório");
        }
        if (vazio(usuario.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O e-mail é obrigatório");
        }
    }

    private boolean vazio(String valor) {
        return valor == null || valor.isBlank();
    }
}