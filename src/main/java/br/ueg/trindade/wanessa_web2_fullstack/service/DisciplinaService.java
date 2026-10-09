package br.ueg.trindade.wanessa_web2_fullstack.service;

import br.ueg.trindade.wanessa_web2_fullstack.model.Disciplina;
import br.ueg.trindade.wanessa_web2_fullstack.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    public List<Disciplina> listarTodos() {
        return disciplinaRepository.findAll();
    }

    public Disciplina buscarPorId(Long id) {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Disciplina não encontrada"));
    }

    public Disciplina criar(Disciplina disciplina) {
        validar(disciplina);
        if (disciplinaRepository.existsByNomeIgnoreCase(disciplina.getNome())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe uma disciplina com este nome");
        }
        disciplina.setId(null);
        return disciplinaRepository.save(disciplina);
    }

    public Disciplina atualizar(Long id, Disciplina disciplinaAtualizada) {
        Disciplina disciplina = buscarPorId(id);
        validar(disciplinaAtualizada);
        if (disciplinaRepository.existsByNomeIgnoreCaseAndIdNot(disciplinaAtualizada.getNome(), id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe outra disciplina com este nome");
        }
        disciplina.setNome(disciplinaAtualizada.getNome());
        disciplina.setProfessor(disciplinaAtualizada.getProfessor());
        disciplina.setCargaHoraria(disciplinaAtualizada.getCargaHoraria());
        disciplina.setSemestre(disciplinaAtualizada.getSemestre());
        return disciplinaRepository.save(disciplina);
    }

    public void excluir(Long id) {
        Disciplina disciplina = buscarPorId(id);
        disciplinaRepository.delete(disciplina);
    }

    // Regras de negócio da entidade própria
    private void validar(Disciplina disciplina) {
        if (disciplina.getNome() == null || disciplina.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da disciplina é obrigatório");
        }
        if (disciplina.getProfessor() == null || disciplina.getProfessor().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O professor é obrigatório");
        }
        if (disciplina.getCargaHoraria() == null || disciplina.getCargaHoraria() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A carga horária deve ser maior que zero");
        }
        if (disciplina.getSemestre() == null || disciplina.getSemestre() < 1 || disciplina.getSemestre() > 10) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O semestre deve estar entre 1 e 10");
        }
    }
}
