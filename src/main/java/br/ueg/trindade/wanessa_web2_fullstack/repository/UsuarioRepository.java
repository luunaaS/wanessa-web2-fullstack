package br.ueg.trindade.wanessa_web2_fullstack.repository;

import br.ueg.trindade.wanessa_web2_fullstack.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // O Spring Data gera a consulta a partir do nome do método
    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);
}