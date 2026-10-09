package br.ueg.trindade.wanessa_web2_fullstack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DisciplinaController {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @PostMapping("/disciplinas")
    public Disciplina createDisciplina(@RequestBody Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    @GetMapping("/disciplinas")
    public List<Disciplina> getAllDisciplinas() {
        return disciplinaRepository.findAll();
    }

    @GetMapping("/disciplinas/{id}")
    public Disciplina getDisciplinaById(@PathVariable Long id) {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
    }

    @PutMapping("/disciplinas/{id}")
    public Disciplina updateDisciplina(@PathVariable Long id, @RequestBody Disciplina disciplinaAtualizada) {
        Disciplina disciplina = disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
        disciplina.setNome(disciplinaAtualizada.getNome());
        disciplina.setProfessor(disciplinaAtualizada.getProfessor());
        disciplina.setCargaHoraria(disciplinaAtualizada.getCargaHoraria());
        disciplina.setSemestre(disciplinaAtualizada.getSemestre());
        return disciplinaRepository.save(disciplina);
    }

    @DeleteMapping("/disciplinas/{id}")
    public void deleteDisciplina(@PathVariable Long id) {
        disciplinaRepository.deleteById(id);
    }
}