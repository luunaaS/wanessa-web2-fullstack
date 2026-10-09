
package br.ueg.trindade.wanessa_web2_fullstack.service;

import br.ueg.trindade.wanessa_web2_fullstack.model.Permissao;
import br.ueg.trindade.wanessa_web2_fullstack.repository.PermissaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PermissaoService {

    @Autowired
    private PermissaoRepository permissaoRepository;

    public List<Permissao> listarTodos() {
        return permissaoRepository.findAll();
    }

    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permissão não encontrada"));
    }

    public Permissao criar(Permissao permissao) {
        validar(permissao);
        // Regra de negócio: o nome da permissão é único (ADMIN, USER...)
        if (permissaoRepository.existsByNomeIgnoreCase(permissao.getNome())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe uma permissão com este nome");
        }
        permissao.setId(null);
        return permissaoRepository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao permissaoAtualizada) {
        Permissao permissao = buscarPorId(id);
        validar(permissaoAtualizada);
        if (permissaoRepository.existsByNomeIgnoreCaseAndIdNot(permissaoAtualizada.getNome(), id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe outra permissão com este nome");
        }
        permissao.setNome(permissaoAtualizada.getNome());
        permissao.setDescricao(permissaoAtualizada.getDescricao());
        return permissaoRepository.save(permissao);
    }

    public void excluir(Long id) {
        Permissao permissao = buscarPorId(id);
        permissaoRepository.delete(permissao);
    }

    private void validar(Permissao permissao) {
        if (permissao.getNome() == null || permissao.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da permissão é obrigatório");
        }
    }
}
