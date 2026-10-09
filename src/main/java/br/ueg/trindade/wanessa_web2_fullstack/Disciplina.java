package br.ueg.trindade.wanessa_web2_fullstack;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String professor;
    private Integer cargaHoraria;
    private Integer semestre;

    public Disciplina() {
    }

    public Disciplina(String nome, String professor, Integer cargaHoraria, Integer semestre) {
        this.nome = nome;
        this.professor = professor;
        this.cargaHoraria = cargaHoraria;
        this.semestre = semestre;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getProfessor() { return professor; }
    public void setProfessor(String professor) { this.professor = professor; }

    public Integer getCargaHoraria() { return cargaHoraria; }
    public void setCargaHoraria(Integer cargaHoraria) { this.cargaHoraria = cargaHoraria; }

    public Integer getSemestre() { return semestre; }
    public void setSemestre(Integer semestre) { this.semestre = semestre; }
}
