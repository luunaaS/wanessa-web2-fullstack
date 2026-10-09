package br.ueg.trindade.wanessa_web2_fullstack;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DisciplinaController {

    @GetMapping("/disciplinas")
    public List<Disciplina> getAllDisciplinas() {
        List<Disciplina> disciplinas = new ArrayList<>();
        disciplinas.add(new Disciplina(1L, "Programação Web II", "Braully Rocha", 60, 6));
        disciplinas.add(new Disciplina(2L, "Banco de Dados", "Fulano de Tal", 60, 4));
        return disciplinas;
    }
}
