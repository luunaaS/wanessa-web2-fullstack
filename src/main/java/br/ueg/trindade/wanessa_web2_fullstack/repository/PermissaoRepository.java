package br.ueg.trindade.wanessa_web2_fullstack.repository;

import br.ueg.trindade.wanessa_web2_fullstack.model.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

    boolean existsByNomeIgnoreCase(String nome);

    boolean existsByNomeIgnoreCaseAndIdNot(String nome, Long id);
}