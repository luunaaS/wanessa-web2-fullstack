package br.ueg.trindade.wanessa_web2_fullstack.controller;


import br.ueg.trindade.wanessa_web2_fullstack.model.Disciplina;
import br.ueg.trindade.wanessa_web2_fullstack.service.DisciplinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disciplinas")
@CrossOrigin(origins = "http://localhost:5173")
public class DisciplinaController {

    @Autowired
    private DisciplinaService disciplinaService; // o controller fala apenas com o Service

    @GetMapping
    public List<Disciplina> getAllDisciplinas() {
        return disciplinaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Disciplina getDisciplinaById(@PathVariable Long id) {
        return disciplinaService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Disciplina createDisciplina(@RequestBody Disciplina disciplina) {
        return disciplinaService.criar(disciplina);
    }

    @PutMapping("/{id}")
    public Disciplina updateDisciplina(@PathVariable Long id, @RequestBody Disciplina disciplinaAtualizada) {
        return disciplinaService.atualizar(id, disciplinaAtualizada);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDisciplina(@PathVariable Long id) {
        disciplinaService.excluir(id);
    }
}